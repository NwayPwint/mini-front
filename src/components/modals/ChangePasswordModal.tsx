import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useChangePassword } from "@/hooks/apis/useAuthQuery";

import InputField from "../ui/InputField";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/services/api";
import { ShowCustomToast } from "@/utils/toast";

import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "../../types/auth";

interface ChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordProps) {
  const { mutate: changePassword, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (data: ChangePasswordFormValues) => {
    changePassword(data, {
      onSuccess: () => {
        ShowCustomToast.success("Password changed successfully!");
        reset();
        onClose();
      },
      onError: (error) => {
        ShowCustomToast.error(getApiErrorMessage(error, "Failed to change password"));
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-transparent px-4 py-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-brand-navy/40" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-custom-lg shadow-custom-lg border border-surface-border p-5 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-text-muted hover:text-text-main transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="text-center mb-5 sm:mb-6">
          <h1 className="text-lg sm:text-xl font-semibold font-heading text-brand-navy">
            Change Password
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-0.5 sm:mt-1">
            Manage and update your account password here.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 sm:space-y-4"
        >
          <InputField
            label="Old Password"
            type="password"
            placeholder="Enter your old password"
            error={errors.currentPassword?.message}
            {...register("currentPassword")}
          />

          <InputField
            label="New Password"
            type="password"
            placeholder="Enter new password"
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />

          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Re-enter new password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <div className="flex justify-end mt-1 sm:mt-2">
            <Button variant="default" type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
