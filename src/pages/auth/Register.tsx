import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import InputField from "../../components/ui/InputField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "../../types/auth";
import { useAuth } from "../../stores/useAuthStore";
import { ShowCustomToast } from "../../utils/toast";
import { UserPlus } from "lucide-react";
import AuthLayout from "../../components/layout/AuthLayout";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    control,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const isTermChecked = watch("terms");

  const onSubmit = async (data: RegisterFormValues) => {
    if (isLoading) return;

    const result = await registerUser(data);

    if (result) {
      ShowCustomToast.success("Account created successfully!");
      reset();
      navigate("/login");
    } else {
      ShowCustomToast.error("Registration failed. Please try again.");
    }
  };

  return (
    <AuthLayout
      icon={UserPlus}
      title="Create Account"
      subtitle="Start your learning journey today"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <InputField
          label="Full Name"
          type="text"
          placeholder="John Doe"
          error={errors.name?.message}
          {...register("name")}
        />

        <InputField
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register("password")}
        />

        <InputField
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label
              htmlFor="terms"
              className="text-xs text-text-muted cursor-pointer"
            >
              I agree to the Terms of Service and Privacy Policy
            </Label>
          </div>
          {errors.terms?.message && (
            <p className="text-xs text-status-error">{errors.terms.message}</p>
          )}
        </div>

        <Button
          variant="default"
          type="submit"
          className="mt-1"
          disabled={!isTermChecked || isLoading}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-xs text-text-muted mt-4">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-brand-royal hover:text-brand-royal-dark transition-colors"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
