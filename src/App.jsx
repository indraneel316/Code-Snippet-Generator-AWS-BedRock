import Editor from './components/Editor.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-950">
        <Editor />
      </main>
      <Toaster position="top-right" />
    </div>
  );
}