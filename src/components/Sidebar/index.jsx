import { useState } from 'react';
import { Code } from 'lucide-react';
import SearchBar from './SearchBar.jsx';
import TagList from './TagList.jsx';
import SnippetList from './SnippetList.jsx';

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-64 bg-gray-900 h-screen p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Code className="text-indigo-500" />
        <h1 className="text-xl font-bold text-white">Snippet Gen</h1>
      </div>
      
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <TagList />
      <SnippetList />
    </div>
  );
}