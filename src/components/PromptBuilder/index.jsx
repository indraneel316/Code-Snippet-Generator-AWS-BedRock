import React, { useState, useEffect } from 'react';
import { Settings, Cpu, Code2, CheckSquare } from 'lucide-react';
import TemplateSelector from './TemplateSelector.jsx';
import ComplexitySelector from './ComplexitySelector.jsx';

export default function PromptBuilder({
                                        framework,
                                        setFramework,
                                        description,
                                        setDescription,
                                        includeComments,
                                        setIncludeComments,
                                        includeBestPractices,
                                        setIncludeBestPractices,
                                        includeErrorHandling,
                                        setIncludeErrorHandling,
                                        includeBigONotation,
                                        setIncludeBigONotation,
                                        onPromptChange,
                                      }) {
  // Framework-dependent language-specific toggles
  const [languageSpecificToggles, setLanguageSpecificToggles] = useState({});

  // Rebuild prompt whenever framework, toggles, or description changes
  useEffect(() => {
    const languageSpecificRequirements = Object.entries(languageSpecificToggles)
        .filter(([_, value]) => value)
        .map(([key]) => `- ${key}`)
        .join('\n');

    const prompt = `
      Generate a ${framework} code snippet
      Description: ${description || 'N/A'}
      Please include:
      ${includeComments ? '- Comments explaining the code Line By Line' : 'Optional Comments'}
      ${includeBestPractices ? '- Best practices' : 'Best Practices'}
      ${includeErrorHandling ? '- Error handling Mandatory' : 'Optional Error handling'}
      ${includeBigONotation ? '- Time and space complexity analysis (Big-O notation) Mandatory' : 'No Time Complexity'}
      ${languageSpecificRequirements ? `Language-specific:\n${languageSpecificRequirements}` : ''}
    `.trim();

    onPromptChange(prompt); // Call the parent function to send the updated prompt
  }, [
    framework,
    description,
    includeComments,
    includeBestPractices,
    includeErrorHandling,
    includeBigONotation,
    languageSpecificToggles,
    onPromptChange,
  ]);

  // Dynamically generate language-specific toggles based on framework
  useEffect(() => {
    switch (framework) {
      case 'React':
      case 'Vue.js':
        setLanguageSpecificToggles({
          'Hooks/State Management': false,
          'Component Performance Optimization': false,
        });
        break;
      case 'Python':
      case 'Django':
      case 'Flask':
        setLanguageSpecificToggles({
          'PEP 8 Compliance': false,
          'Type Annotations': false,
        });
        break;
      case 'Java':
      case 'Spring Boot':
        setLanguageSpecificToggles({
          'JUnit Tests': false,
          'Dependency Injection': false,
        });
        break;
      default:
        setLanguageSpecificToggles({}); // Reset for generic languages
        break;
    }
  }, [framework]);

  return (
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings size={20} className="text-indigo-400" />
          Prompt Builder
        </h2>

        <div className="space-y-4">
          {/* Framework Selector */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <Code2 size={16} />
              Framework
            </label>
            <select
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
            >
              {/* Backend Frameworks */}
              <optgroup label="Backend Frameworks">
                <option value="Node.js">Node.js</option>
                <option value="Express.js">Express.js</option>
                <option value="Django">Django</option>
                <option value="Flask">Flask</option>
                <option value="Spring Boot">Spring Boot</option>
                <option value="Ruby on Rails">Ruby on Rails</option>
              </optgroup>

              {/* Frontend Frameworks */}
              <optgroup label="Frontend Frameworks">
                <option value="React">React</option>
                <option value="Vue.js">Vue.js</option>
                <option value="Angular">Angular</option>
                <option value="Next.js">Next.js</option>
                <option value="Nuxt.js">Nuxt.js</option>
                <option value="Svelte">Svelte</option>
              </optgroup>

              {/* Languages */}
              <optgroup label="Languages">
                <option value="JavaScript">JavaScript</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="C#">C#</option>
                <option value="Go">Go</option>
                <option value="Rust">Rust</option>
                <option value="Ruby">Ruby</option>
                <option value="PHP">PHP</option>
                <option value="Kotlin">Kotlin</option>
                <option value="Swift">Swift</option>
              </optgroup>

              {/* Web Technologies */}
              <optgroup label="Web Technologies">
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="Sass">Sass/SCSS</option>
              </optgroup>

              {/* DevOps and Scripting */}
              <optgroup label="DevOps / Scripting">
                <option value="Bash">Bash</option>
                <option value="PowerShell">PowerShell</option>
                <option value="Dockerfile">Dockerfile</option>
                <option value="YAML">YAML</option>
              </optgroup>
            </select>
          </div>

          {/* Complexity Selector */}
          <ComplexitySelector value={framework} onChange={(value) => setFramework(value)} />

          {/* General Prompt Toggles */}
          <div>
            <label className="text-sm text-gray-300 mb-2">General Options</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={includeComments}
                    onChange={(e) => setIncludeComments(e.target.checked)}
                />
                Include Comments
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={includeBestPractices}
                    onChange={(e) => setIncludeBestPractices(e.target.checked)}
                />
                Best Practices
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={includeErrorHandling}
                    onChange={(e) => setIncludeErrorHandling(e.target.checked)}
                />
                Error Handling
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={includeBigONotation}
                    onChange={(e) => setIncludeBigONotation(e.target.checked)}
                />
                Time Complexity (Big-O)
              </label>
            </div>
          </div>

          {/* Language-Specific Toggles */}
          {Object.keys(languageSpecificToggles).length > 0 && (
              <div>
                <label className="text-sm text-gray-300 mb-2">Language-Specific Options</label>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(languageSpecificToggles).map(([key, value]) => (
                      <label key={key} className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) =>
                                setLanguageSpecificToggles({
                                  ...languageSpecificToggles,
                                  [key]: e.target.checked,
                                })
                            }
                        />
                        {key}
                      </label>
                  ))}
                </div>
              </div>
          )}

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <Cpu size={16} />
              Description
            </label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you want to generate..."
                className="w-full bg-gray-700 text-white rounded-md px-3 py-2 h-24 resize-none"
            />
          </div>

          <TemplateSelector onSelect={(template) => setDescription(template)} />
        </div>
      </div>
  );
}
