import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useSearchParams } from "react-router-dom";
import InputField from "../../components/ui/InputField";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../stores/useAuthStore";
import { ShowCustomToast } from "../../utils/toast";
import { resetPasswordSchema } from "../../types/auth";
import type { ResetPasswordFormValues } from "../../types/auth";
import { KeyRound, ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { resetPassword, isLoading, error } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) return;

    const success = await resetPassword(token, data.password);

    if (success) {
      setIsSubmitted(true);
      ShowCustomToast.success("Password has been reset successfully!");
    } else {
      ShowCustomToast.error(error || "Failed to reset password.");
    }
  };

  if (!token) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center relative px-4 py-6">
        <div className="auth-background absolute inset-0 z-0"></div>
        
        <div className="w-full max-w-md relative z-10">
          <div className="bg-white rounded-custom-lg shadow-custom-lg border border-surface-border overflow-hidden auth-card">
            <div className="h-1.5 bg-gradient-to-r from-status-error via-status-warning to-brand-gold" />
            <div className="p-5 sm:p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-status-error/10 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle size={24} className="text-status-error" />
              </div>
              <h1 className="text-lg font-semibold font-heading text-brand-navy mb-1">
                Invalid Reset Link
              </h1>
              <p className="text-xs text-text-muted leading-relaxed mb-4">
                This password reset link is invalid or has expired. Please
                request a new one.
              </p>
              <Link
                to="/forgot-password"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-royal hover:text-brand-royal-dark transition-colors"
              >
                <ArrowLeft size={14} />
                Request New Reset Link
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center relative px-4 py-6">
      <div className="auth-background absolute inset-0 z-0"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-custom-lg shadow-custom-lg border border-surface-border overflow-hidden auth-card">
          <div className="h-1.5 auth-gradient" />

          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-9 h-9 rounded-full auth-icon flex items-center justify-center">
                <KeyRound size={18} className="text-brand-royal" />
              </div>
              <h1 className="text-lg font-semibold font-heading text-brand-navy">
                Reset Password
              </h1>
            </div>
            <p className="text-center text-xs text-text-muted mb-5">
              Enter your new password below
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <InputField
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                  error={errors.password?.message}
                  {...register("password")}
                />

                <InputField
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm new password"
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />

                <Button
                  variant="default"
                  type="submit"
                  className="mt-1"
                >
                  Reset Password
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-status-success/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} className="text-status-success" />
                </div>
                <p className="text-sm text-text-main font-medium">
                  Password Reset Complete
                </p>
                <p className="text-xs text-text-muted leading-relaxed">
                  Your password has been reset successfully. You can now log in
                  with your new password.
                </p>
              </div>
            )}

            <div className="text-center mt-5">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-royal hover:text-brand-royal-dark transition-colors"
              >
                <ArrowLeft size={14} />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
