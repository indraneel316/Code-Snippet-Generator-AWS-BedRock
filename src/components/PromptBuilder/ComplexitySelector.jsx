import React from 'react';
import { Brain } from 'lucide-react';

export default function ComplexitySelector({ value, onChange }) {
    return (
        <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                <Brain size={16} />
                Complexity Level
            </label>
            <div className="flex gap-2">
                {['basic', 'intermediate', 'advanced'].map((level) => (
                    <button
                        key={level}
                        onClick={() => onChange(level)}
                        className={`px-4 py-2 rounded-md text-sm ${
                            value === level
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
}
