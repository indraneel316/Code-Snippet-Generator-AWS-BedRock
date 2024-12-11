import { Editor as MonacoEditor } from '@monaco-editor/react';

export default function CodeEditor({ code, language, onChange }) {
    return (
        <MonacoEditor
            height="70vh"
            language={language}
            value={code}
            onChange={(value) => onChange(value || '')}
            theme="vs-dark"
            options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                suggest: {
                    showMethods: true,
                    showFunctions: true,
                    showConstructors: true,
                    showDeprecated: false,
                    showFields: true,
                    showVariables: true,
                    showClasses: true,
                    showStructs: true,
                    showInterfaces: true,
                    showModules: true,
                    showProperties: true,
                    showEvents: true,
                    showOperators: true,
                    showUnits: true,
                    showValues: true,
                    showConstants: true,
                    showEnums: true,
                    showEnumMembers: true,
                    showKeywords: true,
                    showWords: true,
                    showColors: true,
                    showFiles: true,
                    showReferences: true,
                    showFolders: true,
                    showTypeParameters: true,
                    showSnippets: true,
                },
            }}
        />
    );
}
