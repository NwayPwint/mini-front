import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

export default function InputField({
  label,
  error,
  type = "text",
  placeholder,
  className = "",
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-1.5 w-full">
      <label className="block text-xs font-semibold text-text-main uppercase tracking-wider">
        {label}
      </label>

      {/* Input နဲ့ Icon နှစ်ခုစလုံးကို ထိန်းချုပ်မည့် relative wrapper */}
      <div className={`relative flex items-center w-full ${className}`}>
        <input
          type={inputType}
          placeholder={placeholder}
          {...props}
          className={`w-full px-3.5 py-2.5 bg-surface-ghost border rounded-custom-md text-text-main text-sm transition-all outline-none 
            ${isPassword ? "pr-10" : ""} 
            ${
              error
                ? "border-status-error focus:ring-1 focus:ring-status-error"
                : "border-surface-border focus:border-brand-royal focus:ring-1 focus:ring-brand-royal"
            }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-text-muted hover:text-text-main transition-colors cursor-pointer flex items-center justify-center"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-status-error font-medium mt-1">{error}</p>
      )}
    </div>
  );
}
