import { Sparkles, Copy, Save, Download } from 'lucide-react';

export default function CodeActions({
                                        onGenerate,
                                        onSave,
                                        onCopy,
                                        onDownload,
                                        isGenerating,
                                    }) {
    return (
        <div className="flex gap-2">
            <button
                onClick={onGenerate}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
                <Sparkles size={16} />
                Generate
            </button>
            <button
                onClick={onSave}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
                <Save size={16} />
                Save
            </button>
            <button
                onClick={onCopy}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md"
            >
                <Copy size={16} />
                Copy
            </button>
            <button
                onClick={onDownload}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md"
            >
                <Download size={16} />
                Download
            </button>
        </div>
    );
}
