import { useState, type FormEvent } from "react";
import { Search, Check, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAuth } from "@/stores/useAuthStore";
import { useGetUsers, useUpdateUserRole } from "@/hooks/apis/useAdminQuery";
import type { AdminRole } from "@/types/admin";

const roleOptions: Array<{ value: AdminRole | ""; label: string }> = [
  { value: "", label: "All roles" },
  { value: "ADMIN", label: "Admin" },
  { value: "STUDENT", label: "Student" },
  { value: "COLLEGE", label: "College" },
  { value: "BUSINESS", label: "Business" },
];

const roleBadgeClass: Record<AdminRole, string> = {
  ADMIN: "bg-brand-royal/10 text-brand-royal",
  STUDENT: "bg-brand-gold/10 text-brand-wealth",
  COLLEGE: "bg-brand-sky/10 text-brand-sky",
  BUSINESS: "bg-brand-wealth-light/20 text-brand-wealth",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function pageNumbers(current: number, total: number): number[] {
  const pages: number[] = [];
  for (
    let i = Math.max(1, current - 2);
    i <= Math.min(total, current + 2);
    i++
  ) {
    pages.push(i);
  }
  return pages;
}

export default function Users() {
  const { user: currentUser } = useAuth();
  const [page, setPage] = useState(1);
  const [role, setRole] = useState<AdminRole | "">("");
  const [q, setQ] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading, isError } = useGetUsers({
    page,
    limit: 10,
    role: role || undefined,
    q: q || undefined,
  });
  const updateRole = useUpdateUserRole();

  const users = data?.users ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-sm text-text-muted">
        Loading users...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-sm text-status-error">
        Failed to load users.
      </div>
    );
  }

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setQ(searchInput.trim());
    setPage(1);
  };

  const handleRoleFilter = (value: AdminRole | "") => {
    setRole(value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold font-heading text-brand-navy">
          Users
        </h1>
        <p className="text-sm text-text-muted">
          Manage user roles and view registered accounts.
        </p>
      </div>

      <Card className="bg-white rounded-custom-md">
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle className="text-brand-navy">All Users</CardTitle>
            <CardDescription className="text-text-muted">
              {pagination?.total ?? 0} registered account
              {pagination?.total === 1 ? "" : "s"}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <Input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by name or email..."
                  className="pl-9 rounded-custom-sm border-surface-border bg-surface-ghost"
                />
              </div>
            </form>
            <div className="relative">
              <select
                value={role}
                onChange={(e) =>
                  handleRoleFilter(e.target.value as AdminRole | "")
                }
                className="h-9 w-full min-w-40 cursor-pointer appearance-none rounded-custom-sm border border-surface-border bg-surface-ghost py-2 pl-3 pr-9 text-sm text-text-main outline-none"
              >
                {roleOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            </div>
          </div>

          <div className="overflow-x-auto">
            {users.length === 0 ? (
              <p className="text-sm text-text-muted py-6 text-center">
                No users match your filters.
              </p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-surface-border text-xs text-text-muted uppercase tracking-wider">
                    <th className="pb-2 font-semibold">User</th>
                    <th className="pb-2 font-semibold">Phone</th>
                    <th className="pb-2 font-semibold">Role</th>
                    <th className="pb-2 font-semibold">Joined</th>
                    <th className="pb-2 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-surface-border last:border-0"
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-brand-royal/10 text-brand-royal text-[10px] font-semibold">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-text-main font-medium leading-tight">
                              {user.name}
                            </p>
                            <p className="text-xs text-text-muted">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-xs text-text-muted">
                        {user.phone ?? "—"}
                      </td>
                      <td className="py-3">
                        <Badge
                          className={`border-transparent ${roleBadgeClass[user.role]}`}
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3 text-xs text-text-muted">
                        {new Date(user.createdAt).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </td>
                      <td className="py-3 text-right">
                        {user.id === currentUser?.id ? (
                          <span className="text-xs text-text-muted italic">
                            You
                          </span>
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="gap-2 pr-4!">
                                {user.role}
                                <ChevronDown className="h-3.5 w-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Change role</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {(["ADMIN", "STUDENT"] as const).map((r) => (
                                <DropdownMenuItem
                                  key={r}
                                  disabled={user.role === r}
                                  onClick={() =>
                                    updateRole.mutate({
                                      userId: user.id,
                                      role: r,
                                    })
                                  }
                                >
                                  {user.role === r && (
                                    <Check className="mr-2 h-3.5 w-3.5" />
                                  )}
                                  {r}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <p className="text-xs text-text-muted">
                Showing {users.length} of {pagination?.total ?? 0}
              </p>
              <Pagination className="mx-0 w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={
                        page === 1 ? "pointer-events-none opacity-50" : ""
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page - 1);
                      }}
                    />
                  </PaginationItem>
                  {pageNumbers(page, totalPages).map((n) => (
                    <PaginationItem key={n}>
                      <PaginationLink
                        isActive={n === page}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(n);
                        }}
                      >
                        {n}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      className={
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
