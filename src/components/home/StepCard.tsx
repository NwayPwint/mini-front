import DynamicIcon from "../ui/DynamicIcon";

interface StepItem {
  num?: string;
  icon?: string;
  title?: string;
  description?: string;
}

interface StepCardProps {
  step: StepItem;
}

export default function StepCard({ step }: StepCardProps) {
  return (
    <div className="relative">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-3xl font-bold font-heading text-brand-gold/40 leading-none">
          {step.num}
        </span>
        <div className="w-10 h-10 rounded-custom-md bg-brand-royal/5 text-brand-royal flex items-center justify-center">
          <DynamicIcon name={step.icon} size={20} />
        </div>
      </div>
      <h3 className="text-base font-semibold text-brand-navy mb-2">
        {step.title}
      </h3>
      <p className="text-sm text-text-muted leading-relaxed">
        {step.description}
      </p>
    </div>
  );
}
