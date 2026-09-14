import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import InputField from "../../components/ui/InputField";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../stores/useAuthStore";
import { ShowCustomToast } from "../../utils/toast";
import { MailCheck, ArrowLeft, CheckCircle2 } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const { forgot, isLoading, error } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    const success = await forgot(data.email);

    if (success) {
      setIsSubmitted(true);
      ShowCustomToast.success("Password reset link sent to your email!");
    } else {
      ShowCustomToast.error(error || "Failed to send reset link.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center relative px-4 py-6">
      <div className="auth-background absolute inset-0 z-0"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-custom-lg shadow-custom-lg border border-surface-border overflow-hidden auth-card">
          <div className="h-1.5 auth-gradient" />

          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-9 h-9 rounded-full auth-icon flex items-center justify-center">
                <MailCheck size={18} className="text-brand-royal" />
              </div>
              <h1 className="text-lg font-semibold font-heading text-brand-navy">
                Forgot Password
              </h1>
            </div>
            <p className="text-center text-xs text-text-muted mb-5">
              Enter your email and we'll send you a reset link
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <Button
                  variant="default"
                  type="submit"
                  className="mt-1"
                >
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-status-success/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} className="text-status-success" />
                </div>
                <p className="text-sm text-text-main font-medium">
                  Check your email
                </p>
                <p className="text-xs text-text-muted leading-relaxed">
                  If an account exists with that email, we've sent password
                  reset instructions to it.
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
