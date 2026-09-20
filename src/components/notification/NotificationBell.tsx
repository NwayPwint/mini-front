import { useNavigate } from "react-router-dom";
import {
  Bell,
  BellOff,
  CheckCheck,
  Clock,
  Award,
  Megaphone,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useGetNotifications,
  useGetUnreadCount,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
} from "@/hooks/apis/useNotificationQuery";
import type { NotificationType } from "@/types/notification";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const TYPE_META: Record<NotificationType, { icon: LucideIcon; label: string }> = {
  COURSE_REMINDER: { icon: Clock, label: "Course reminder" },
  CERTIFICATE: { icon: Award, label: "Certificate" },
  ANNOUNCEMENT: { icon: Megaphone, label: "Announcement" },
  WEEKLY_DIGEST: { icon: TrendingUp, label: "Weekly digest" },
};

function formatRelativeTime(value: string): string {
  const diffMs = new Date(value).getTime() - Date.now();
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const diffMin = Math.round(diffMs / 60000);
  if (Math.abs(diffMin) < 1) return "just now";
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute");

  const diffHours = Math.round(diffMs / 3600000);
  if (Math.abs(diffHours) < 24) return rtf.format(diffHours, "hour");

  const diffDays = Math.round(diffMs / 86400000);
  if (Math.abs(diffDays) < 7) return rtf.format(diffDays, "day");

  const diffWeeks = Math.round(diffMs / 604800000);
  if (Math.abs(diffWeeks) < 5) return rtf.format(diffWeeks, "week");

  const diffMonths = Math.round(diffMs / 2592000000);
  if (Math.abs(diffMonths) < 12) return rtf.format(diffMonths, "month");

  return rtf.format(Math.round(diffMs / 31536000000), "year");
}

interface NotificationBellProps {
  badgeClass?: string;
  buttonClass?: string;
}

export default function NotificationBell({
  badgeClass = "bg-status-error",
  buttonClass,
}: NotificationBellProps) {
  const navigate = useNavigate();
  const { data: unreadData } = useGetUnreadCount();
  const { data: notificationData } = useGetNotifications(1, 8);
  const { mutate: markRead } = useMarkNotificationRead();
  const { mutate: markAllRead } = useMarkAllNotificationsRead();

  const unreadCount = unreadData?.unreadCount ?? 0;
  const notifications = notificationData?.notifications ?? [];

  const handleItemSelect = (item: {
    id: string;
    isRead: boolean;
    link: string | null;
  }) => {
    if (!item.isRead) markRead(item.id);
    if (item.link) navigate(item.link);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("relative", buttonClass)}
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-text-muted" />
          {unreadCount > 0 && (
            <span
              className={cn(
                "absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white",
                badgeClass,
              )}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 bg-white p-0" align="end">
        <DropdownMenuGroup>
          <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
            <p className="text-sm font-semibold font-heading text-brand-navy">
              Notifications
            </p>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs text-brand-royal hover:bg-brand-royal/5"
                onClick={() => markAllRead()}
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all as read
              </Button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <BellOff className="mx-auto h-8 w-8 text-text-muted" />
                <p className="mt-2 text-sm text-text-muted">
                  You're all caught up!
                </p>
              </div>
            ) : (
              notifications.map((item) => {
                const meta = TYPE_META[item.type] ?? TYPE_META.ANNOUNCEMENT;
                const ItemIcon = meta.icon;
                return (
                  <DropdownMenuItem
                    key={item.id}
                    onSelect={() => handleItemSelect(item)}
                    className={cn(
                      "cursor-pointer gap-3 px-4 py-2.5 focus:bg-surface-institutional",
                      !item.isRead && "bg-brand-royal/[0.03]",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                        item.isRead
                          ? "bg-surface-ghost text-text-muted"
                          : "bg-brand-royal/10 text-brand-royal",
                      )}
                    >
                      <ItemIcon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-text-main">
                        {item.title}
                      </p>
                      {item.message && (
                        <p className="mt-0.5 line-clamp-2 text-[11px] text-text-muted">
                          {item.message}
                        </p>
                      )}
                      <p className="mt-0.5 text-[10px] text-text-muted">
                        {formatRelativeTime(item.createdAt)}
                      </p>
                    </div>
                    {!item.isRead && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-status-error" />
                    )}
                  </DropdownMenuItem>
                );
              })
            )}
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}