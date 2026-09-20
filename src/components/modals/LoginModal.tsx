import { Link } from "react-router-dom";
import { X } from "lucide-react";
import InputField from "../ui/InputField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../../types/auth";
import { useAuth } from "../../stores/useAuthStore";
import { ShowCustomToast } from "../../utils/toast";
import { useEffect } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { login: loginUser, isLoading } = useAuth();

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: LoginFormValues) => {
    if (isLoading) return;

    const result = await loginUser(data);
    if (result) {
      ShowCustomToast.success("Login successful!");
      reset();
      onClose();
    } else {
      ShowCustomToast.error("Invalid email or password.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-transparent px-4 py-8">
      <div className="absolute inset-0 bg-brand-navy/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-custom-lg shadow-custom-lg border border-surface-border p-5 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-text-muted hover:text-text-main transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="text-center mb-5 sm:mb-6">
          <h1 className="text-lg sm:text-xl font-semibold font-heading text-brand-navy">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-0.5 sm:mt-1">
            Sign in to access your learning dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 sm:space-y-4"
        >
          <InputField
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="flex items-center justify-between pt-0.5 sm:pt-1">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-xs text-text-muted cursor-pointer">
                Remember me
              </Label>
            </div>
            <Link
              to="/forgot-password"
              onClick={onClose}
              className="text-xs font-medium text-brand-royal hover:text-brand-royal-dark transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            variant="default"
            type="submit"
            className="mt-1 sm:mt-2"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-xs sm:text-sm text-text-muted mt-4 sm:mt-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            onClick={onClose}
            className="font-medium text-brand-royal hover:text-brand-royal-dark transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
