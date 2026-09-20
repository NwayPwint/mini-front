import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { studentNavigation } from "@/config/studentNavigation";
import { Loader2 } from "lucide-react";
import { useGetStudentDashboard } from "@/hooks/apis/useStudentQuery";

export default function StudentSidebar() {
  const { data: dashboardData, isLoading } = useGetStudentDashboard();
  const targetHours = dashboardData?.stats?.weeklyTargetHours ?? 5;
  const loggedHours = dashboardData?.stats?.hoursLearned ?? 0;
  const progressPercent = Math.min(
    Math.round((loggedHours / targetHours) * 100),
    100,
  );
  return (
    <aside className="w-64 bg-background border-r border-surface-border h-full hidden md:flex flex-col p-4">
      <div className="flex flex-col min-h-0 flex-1 gap-6">
        <p className="px-3 text-xs font-semibold text-text-muted tracking-wider uppercase">
          Student Menu
        </p>
        <nav className="space-y-2 overflow-y-auto">
          {studentNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.path} to={item.path}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start gap-3 rounded-custom-md py-2 ${
                      isActive
                        ? "bg-brand-royal/10 text-brand-royal font-semibold"
                        : "text-text-muted hover:text-text-main"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Button>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Weekly Goal Progress Widget */}
      <Card className="bg-white shadow-none rounded-custom-sm ring-foreground/5">
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-text-main">Weekly Goal</span>
            {isLoading ? (
              <Loader2 className="h-3 w-3 animate-spin text-brand-royal" />
            ) : (
              <span className="text-brand-royal font-bold">
                {loggedHours} / {targetHours} hrs
              </span>
            )}
          </div>
          <Progress value={isLoading ? 0 : progressPercent} className="h-2" />
        </CardContent>
      </Card>
    </aside>
  );
}
