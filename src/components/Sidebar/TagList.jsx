import { Tag } from 'lucide-react';

const TAGS = ['JavaScript', 'Python', 'React', 'API'];

export default function TagList() {
  return (
      <div className="flex flex-wrap gap-2 mb-4">
        {TAGS.map((tag) => (
            <div
                key={tag}
                className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded-md text-sm text-gray-300"
            >
              <Tag size={12} />
              {tag}
            </div>
        ))}
      </div>
  );
}
