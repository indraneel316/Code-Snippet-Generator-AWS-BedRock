import { Search, X } from 'lucide-react';
import { useSnippetStore } from '../../store/snippetStore.js';

export default function SearchBar() {
    const { searchTerm, setSearchTerm } = useSnippetStore((state) => ({
        searchTerm: state.searchTerm,
        setSearchTerm: state.setSearchTerm,
    }));

    return (
        <div className="relative mb-4">
            {/* Search Icon */}
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search snippets..."
                className="w-full bg-gray-800 text-white pl-10 pr-10 py-2 rounded-md"
                value={searchTerm} // Controlled input
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                aria-label="Search snippets"
            />

            {/* Clear Button */}
            {searchTerm && (
                <button
                    onClick={() => setSearchTerm('')} // Clear the search term
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                    aria-label="Clear search"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
}
