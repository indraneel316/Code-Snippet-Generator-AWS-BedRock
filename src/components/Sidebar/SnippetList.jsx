import { useSnippetStore } from '@/store/snippetStore.js';

export default function SnippetList() {
  const { snippets, setActiveSnippet } = useSnippetStore();

  return (
      <div className="flex-1 overflow-y-auto">
        {snippets.map((snippet) => (
            <div
                key={snippet.id}
                onClick={() => setActiveSnippet(snippet)}
                className="p-3 hover:bg-gray-800 rounded-md cursor-pointer mb-2"
            >
              <h3 className="text-white font-medium">{snippet.title}</h3>
              <p className="text-gray-400 text-sm">{snippet.description}</p>
            </div>
        ))}
      </div>
  );
}
