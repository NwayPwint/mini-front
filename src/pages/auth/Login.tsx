import { Link } from "react-router-dom";
import InputField from "../../components/ui/InputField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../stores/useAuthStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../../types/auth";
import { ShowCustomToast } from "../../utils/toast";
import { useNavigate, useLocation } from "react-router-dom";
import { LogIn } from "lucide-react";
import AuthLayout from "../../components/layout/AuthLayout";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { login: loginUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data: LoginFormValues) => {
    if (isLoading) return;

    const result = await loginUser(data);

    if (result) {
      ShowCustomToast.success("Login successful!");
      reset();
      const from = (location.state as { from?: string })?.from;
      if (from && from !== "/login") {
        navigate(from, { replace: true });
        return;
      }
      const state = useAuth.getState();
      const role = state.user?.role;
      if (role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/student/dashboard", { replace: true });
      }
    } else {
      ShowCustomToast.error("Invalid email or password.");
    }
  };

  return (
    <AuthLayout
      icon={LogIn}
      title="Welcome Back"
      subtitle="Sign in to access your learning dashboard"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label
              htmlFor="remember"
              className="text-xs text-text-muted cursor-pointer"
            >
              Remember me
            </Label>
          </div>
          <Link
            to="/forgot-password"
            className="text-xs font-medium text-brand-royal hover:text-brand-royal-dark transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          variant="default"
          type="submit"
          className="mt-1"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="text-center text-xs text-text-muted mt-4">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-brand-royal hover:text-brand-royal-dark transition-colors"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}
