import React from 'react';
import { FileCode } from 'lucide-react';

const TEMPLATES = [
  {
    id: 'aws-lambda',
    name: 'AWS Lambda Function',
    template: 'Create an AWS Lambda function that processes events from SQS queue and stores data in DynamoDB',
  },
  {
    id: 'api-gateway',
    name: 'API Gateway Integration',
    template: 'Set up an API Gateway with Lambda integration including authentication and rate limiting',
  },
  {
    id: 's3-operations',
    name: 'S3 Operations',
    template: 'Create functions to handle S3 bucket operations including upload, download, and listing objects',
  },
];

export default function TemplateSelector({ onSelect }) {
  return (
      <div>
        <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
          <FileCode size={16} />
          Quick Templates
        </label>
        <div className="grid grid-cols-1 gap-2">
          {TEMPLATES.map((template) => (
              <button
                  key={template.id}
                  onClick={() => onSelect(template.template)}
                  className="text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md"
              >
                <span className="text-sm font-medium text-white">{template.name}</span>
              </button>
          ))}
        </div>
      </div>
  );
}
