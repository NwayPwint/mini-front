import { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import InputField from "@/components/ui/InputField";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import { ShowCustomToast } from "@/utils/toast";
import { useForm } from "react-hook-form";
import { useGetMe, useUpdateProfile } from "@/hooks/apis/useAuthQuery";
import {
  type UpdateProfileFormValues,
  updateProfileSchema,
} from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { getApiErrorMessage } from "@/services/api";
import {
  useGetPreferences,
  useUpdatePreferences,
} from "@/hooks/apis/useNotificationQuery";

type BooleanPreferenceKey =
  | "weeklyDigest"
  | "courseReminders"
  | "announcements"
  | "certificateAlerts";

const notificationPrefs: Array<{
  id: BooleanPreferenceKey;
  label: string;
  description: string;
}> = [
  {
    id: "weeklyDigest",
    label: "Weekly learning digest",
    description: "A summary of your activity and progress every week.",
  },
  {
    id: "courseReminders",
    label: "Course reminders",
    description: "Reminders for upcoming live sessions and deadlines.",
  },
  {
    id: "announcements",
    label: "Platform announcements",
    description: "News and updates from the LMS platform.",
  },
  {
    id: "certificateAlerts",
    label: "Certificate notifications",
    description: "Get notified when you earn a new certificate.",
  },
];

const formatChangeDate = (value?: string | null) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Never changed";

export default function Settings() {
  const { data: prefData, isLoading: isPrefLoading } = useGetPreferences();
  const { mutate: updatePreferences } = useUpdatePreferences();

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  const { data: user, isLoading: isUserLoading, isError } = useGetMe();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",
    values: user
      ? {
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
          bio: user.bio || "",
          weeklyTargetHours: user.weeklyTargetHours ?? 5,
        }
      : undefined,
  });

  const onSubmit = (data: UpdateProfileFormValues) => {
    updateProfile(data, {
      onSuccess: (updatedUser) => {
        reset(updatedUser);
        ShowCustomToast.success("Settings updated successfully!");
      },
      onError: (error) => {
        ShowCustomToast.error(getApiErrorMessage(error, "Failed to update profile"));
      },
    });
  };

  const handlePrefChange = (key: BooleanPreferenceKey, checked: boolean) => {
    updatePreferences({ [key]: checked });
  };

  if (isUserLoading || isPrefLoading) {
    return (
      <div className="p-6 text-center text-text-muted">
        Loading profile data...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-status-error">
        Failed to load user profile. Please login again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-custom-md bg-brand-royal/10 text-brand-royal flex items-center justify-center">
          <SettingsIcon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-heading text-brand-navy">
            Settings
          </h1>
          <p className="text-sm text-text-muted">
            Manage your account, preferences, and security.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white rounded-custom-md lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brand-navy">
              <User className="h-4 w-4 text-brand-royal" />
              Personal Information
            </CardTitle>
            <CardDescription className="text-text-muted">
              Update your basic profile details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  label="Phone Number"
                  type="text"
                  placeholder="+1 234 567 890"
                  error={errors.phone?.message}
                  {...register("phone")}
                />

                <InputField
                  label="Location"
                  type="text"
                  placeholder="New York, USA"
                  error={errors.address?.message}
                  {...register("address")}
                />

                <InputField
                  label="Weekly Learning Goal (hrs)"
                  type="number"
                  placeholder="5"
                  min={1}
                  max={168}
                  error={errors.weeklyTargetHours?.message}
                  {...register("weeklyTargetHours", {
                    setValueAs: (v) => (v === "" ? undefined : Number(v)),
                  })}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="bio" className="text-text-muted">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  rows={3}
                  placeholder="Tell us about yourself..."
                  {...register("bio")}
                />
                {errors.bio?.message && (
                  <p className="text-xs text-status-error">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  disabled={isPending}
                  onClick={() => reset()}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-white rounded-custom-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-navy">
                <Bell className="h-4 w-4 text-brand-royal" />
                Notifications
              </CardTitle>
              <CardDescription className="text-text-muted">
                Choose what you want to hear about.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationPrefs.map((pref) => (
                <div
                  key={pref.id}
                  className="flex items-start justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <Label className="text-text-main">{pref.label}</Label>
                    <p className="text-xs text-text-muted">
                      {pref.description}
                    </p>
                  </div>
                  <Checkbox
                    checked={prefData?.[pref.id] ?? true}
                    onCheckedChange={(checked) =>
                      handlePrefChange(pref.id, Boolean(checked))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white rounded-custom-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-navy">
                <Shield className="h-4 w-4 text-brand-royal" />
                Security
              </CardTitle>
              <CardDescription className="text-text-muted">
                Keep your account protected.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-custom-md bg-surface-ghost border border-surface-border px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <Lock className="h-4 w-4 text-brand-royal" />
                  <div>
                    <p className="text-xs font-semibold text-text-main">
                      Password
                    </p>
                    <p className="text-[11px] text-text-muted">
                      Last changed {formatChangeDate(user?.passwordChangedAt)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsChangePasswordModalOpen(true)}
                >
                  Change
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </div>
  );
}
