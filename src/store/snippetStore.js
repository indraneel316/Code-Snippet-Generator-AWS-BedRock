import create from 'zustand';

export const useSnippetStore = create((set, get) => ({
    snippets: [], // List of saved snippets
    searchTerm: '', // Current search term
    activeSnippet: null, // Currently selected snippet (if any)
    setActiveSnippet: (snippet) => set({ activeSnippet: snippet }),
    setSearchTerm: (term) => set({ searchTerm: term }),
    addSnippet: (snippet) => set((state) => ({ snippets: [...state.snippets, snippet] })),
    filteredSnippets: () => {
        const { snippets, searchTerm } = get();
        if (!searchTerm.trim()) return snippets; // Return all snippets if no search term
        return snippets.filter((snippet) =>
            snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    },
}));