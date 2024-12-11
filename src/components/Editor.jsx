import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';
import { generateSnippet } from '../services/api.js';
import { useSnippetStore } from '../store/snippetStore.js';
import PromptBuilder from '../components/PromptBuilder/index.jsx';
import CodeActions from '../components/Editor/CodeActions.jsx';
import LanguageSelector from '../components/Editor/LanguageSelector.jsx';
import CodeEditor from '../components/Editor/CodeEditor.jsx';

export default function Editor() {
  // Fetch global state for snippets
  const { activeSnippet, setActiveSnippet, addSnippet } = useSnippetStore((state) => ({
    activeSnippet: state.activeSnippet,
    setActiveSnippet: state.setActiveSnippet,
    addSnippet: state.addSnippet,
  }));

  // State for editor, code, and language
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [framework, setFramework] = useState('');
  const [description, setDescription] = useState('');
  const [includeComments, setIncludeComments] = useState(false);
  const [includeBestPractices, setIncludeBestPractices] = useState(false);
  const [includeErrorHandling, setIncludeErrorHandling] = useState(false);
  const [includeBigONotation, setIncludeBigONotation] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');

  // Effect: Load the active snippet into the editor when it changes
  useEffect(() => {
    if (activeSnippet) {
      setCode(activeSnippet.code || ''); // Load the snippet's code
      setLanguage(activeSnippet.language || 'javascript'); // Load the snippet's language (default fallback)
      setFramework(activeSnippet.framework || ''); // Load framework
      setDescription(activeSnippet.description || ''); // Load the description

      // Set checkbox states from the active snippet's preferences
      setIncludeComments(activeSnippet.checkboxStates?.includeComments || false);
      setIncludeBestPractices(activeSnippet.checkboxStates?.includeBestPractices || false);
      setIncludeErrorHandling(activeSnippet.checkboxStates?.includeErrorHandling || false);
      setIncludeBigONotation(activeSnippet.checkboxStates?.includeBigONotation || false);

      // Generate prompt dynamically based on the framework and description
      const newPrompt = activeSnippet.description
          ? `Generate a ${activeSnippet.framework || 'javascript'} code snippet
        Description: ${activeSnippet.description}
        Please include:
        ${activeSnippet.checkboxStates?.includeComments ? '- Comments explaining the code\n' : ''}
        ${activeSnippet.checkboxStates?.includeBestPractices ? '- Best practices\n' : ''}
        ${activeSnippet.checkboxStates?.includeErrorHandling ? '- Error handling\n' : ''}
        ${activeSnippet.checkboxStates?.includeBigONotation ? '- Time and space complexity analysis (Big-O notation)\n' : ''}`
          : '';

      setPrompt(newPrompt);
    }
  }, [activeSnippet]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please provide a prompt');
      return;
    }

    try {
      setIsGenerating(true);



      // Map framework to supported languages
      const framework = (() => {
        const match = prompt.match(/Generate a (.+?)\s+code snippet/i);
        return match ? match[1].trim() : null;
      })();

      if (!framework) {
        toast.error("Couldn't determine the framework from the prompt");
        setIsGenerating(false);
        return;
      }

// Map framework to supported languages
      const frameworkToLanguageMap = {
        // Backend Frameworks (fallback to their primary languages)
        'Node.js': 'javascript',
        'Express.js': 'javascript',
        'Django': 'python', // Django uses Python
        'Flask': 'python',  // Flask uses Python
        'Spring Boot': 'java', // Spring Boot uses Java
        'Ruby on Rails': 'ruby', // Rails uses Ruby

        // Frontend Frameworks (all fallback to JavaScript)
        'React': 'javascript',
        'Vue.js': 'javascript',
        'Angular': 'javascript',
        'Next.js': 'javascript',
        'Nuxt.js': 'javascript',
        'Svelte': 'javascript',

        // Programming Languages
        'JavaScript': 'javascript',
        'TypeScript': 'typescript',
        'Python': 'python',
        'Java': 'java',
        'C++': 'c++',  // Monaco uses 'cpp' for C++
        'C#': 'csharp', // Monaco uses 'csharp' for C#
        'Go': 'go',
        'Rust': 'rust',
        'Ruby': 'ruby',
        'PHP': 'php',
        'Kotlin': 'kotlin',
        'Swift': 'swift',

        // Web Technologies
        'HTML': 'html',
        'CSS': 'css',
        'Sass': 'scss',           // Monaco supports SCSS
        'Sass/SCSS': 'scss',    // Treat Sass or SCSS as Monaco's recognized 'scss'

        // DevOps and Scripting
        'Bash': 'bash',
        'PowerShell': 'powershell',
        'Dockerfile': 'dockerfile', // For Docker configuration files
        'YAML': 'yaml',             // Configuration files like CI/CD pipelines
      };

      // Find the appropriate language for the framework
      const selectedLanguage = frameworkToLanguageMap[framework] || 'javascript';

      // Set the language dynamically
      setLanguage(selectedLanguage);

      // Generate the code snippet with the prompt
      const response = await generateSnippet(prompt);

      if (response) {
        setCode(response);
        toast.success(`Code for ${framework} generated successfully!`);
      }
    } catch (error) {
      toast.error('Failed to generate code');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (!code.trim()) {
      toast.error('No code to save');
      return;
    }

    const newSnippet = {
      id: activeSnippet ? activeSnippet.id : nanoid(),
      title: description.slice(0, 50) || 'Untitled Snippet',
      code,
      language,
      framework,
      description,
      checkboxStates: {
        includeComments,
        includeBestPractices,
        includeErrorHandling,
        includeBigONotation,
      },
      createdAt: activeSnippet ? activeSnippet.createdAt : new Date(),
    };

    if (activeSnippet) {
      useSnippetStore.setState((state) => ({
        snippets: state.snippets.map((snippet) =>
            snippet.id === activeSnippet.id ? newSnippet : snippet
        ),
      }));
      toast.success('Snippet updated successfully!');
    } else {
      useSnippetStore.setState((state) => ({
        snippets: [...state.snippets, newSnippet],
      }));
      toast.success('Snippet saved successfully!');
    }

    setActiveSnippet(newSnippet);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success('Copied to clipboard!');
  };

  const handleDownload = (code, language) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const fileExtensionMapping = { javascript: 'js', python: 'py', java: 'java', 'c++': 'cpp', csharp: 'cs' };
    const fileExtension = fileExtensionMapping[language.toLowerCase()] || 'txt';
    const filename = `snippet.${fileExtension}`;
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success('Code downloaded successfully!');
  };

  return (
      <div className="w-full h-full flex flex-col gap-4">
        <PromptBuilder
            framework={framework}
            setFramework={setFramework}
            description={description}
            setDescription={setDescription}
            includeComments={includeComments}
            setIncludeComments={setIncludeComments}
            includeBestPractices={includeBestPractices}
            setIncludeBestPractices={setIncludeBestPractices}
            includeErrorHandling={includeErrorHandling}
            setIncludeErrorHandling={setIncludeErrorHandling}
            includeBigONotation={includeBigONotation}
            setIncludeBigONotation={setIncludeBigONotation}
            onPromptChange={setPrompt} // Pass the Editor's `setPrompt` to handle updates
        />

        <div className="flex items-center justify-between">
          <LanguageSelector value={language} onChange={setLanguage} />
          <CodeActions
              onGenerate={handleGenerate}
              onSave={handleSave}
              onCopy={handleCopy}
              onDownload={() => handleDownload(code, language)}
              isGenerating={isGenerating}
          />
        </div>

        <CodeEditor code={code} language={language} onChange={(newCode) => setCode(newCode)} />
      </div>
  );
}
