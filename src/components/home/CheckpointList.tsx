import { Check } from "lucide-react";

interface CheckpointListProps {
  points?: string[];
}

export default function CheckpointList({ points }: CheckpointListProps) {
  return (
    <div className="space-y-4">
      {points?.map((point) => (
        <div key={point} className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-status-success/10 text-status-success flex items-center justify-center flex-shrink-0">
            <Check size={12} strokeWidth={2.5} />
          </div>
          <span className="text-sm text-text-main">{point}</span>
        </div>
      ))}
    </div>
  );
}
