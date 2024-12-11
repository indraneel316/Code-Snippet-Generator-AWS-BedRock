import React from 'react';
import { useSnippetStore } from '../store/snippetStore.js'; // Import Zustand store
import SearchBar from '../components/Sidebar/SearchBar.jsx';
import { Code, Plus } from 'lucide-react'; // Lucide icons

export default function Sidebar() {
    const { filteredSnippets, setActiveSnippet, addSnippet } = useSnippetStore((state) => ({
        filteredSnippets: state.filteredSnippets(), // Access filtered snippets dynamically
        setActiveSnippet: state.setActiveSnippet, // Function to set the active snippet
        addSnippet: state.addSnippet, // Function to add a new snippet to the store
    }));

    const handleNewSnippet = () => {
        // Create a new snippet with default properties
        const newSnippet = {
            id: Date.now().toString(), // Unique ID using timestamp (nanoid alternative)
            title: 'Untitled Snippet',
            code: '',
            language: 'javascript',
            description: '',
            framework: '',
            checkboxStates: {
                includeComments: false,
                includeBestPractices: false,
                includeErrorHandling: false,
                includeBigONotation: false,
            },
            createdAt: new Date(),
        };

        // Add the new snippet to the store
        addSnippet(newSnippet);

        // Set the new snippet as the active snippet
        setActiveSnippet(newSnippet);
    };

    return (
        <div className="w-64 bg-gray-900 h-screen p-4 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Code className="text-indigo-500" />
                    <h1 className="text-xl font-bold text-white">Snippet Gen</h1>
                </div>

                {/* "+" Icon to add a new snippet */}
                <button
                    onClick={handleNewSnippet}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md"
                    title="Create New Snippet"
                >
                    <Plus size={16} />
                </button>
            </div>

            {/* Search Bar */}
            <SearchBar />

            {/* Snippet List */}
            <div className="flex-1 overflow-y-auto mt-4">
                {filteredSnippets.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center mt-4">
                        No snippets found.
                    </p>
                ) : (
                    filteredSnippets.map((snippet) => (
                        <div
                            key={snippet.id}
                            onClick={() => setActiveSnippet(snippet)} // Set this snippet as active
                            className="p-3 hover:bg-gray-800 rounded-md cursor-pointer mb-2"
                        >
                            <h3 className="text-white font-medium">{snippet.title || "Untitled Snippet"}</h3>
                            <p className="text-gray-400 text-sm line-clamp-2">
                                {snippet.description || "No description"}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
