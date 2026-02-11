"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UploadCloud,
  Database,
  UserCheck,
  Settings,
  LogOut,
  Zap,
  BarChart3,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminArea = pathname.startsWith("/admin");
  const settingsHref = isAdminArea ? "/admin/settings" : "/staff/settings";

  const staffMenus = [
    { name: "My Dashboard", href: "/staff", icon: LayoutDashboard },
    { name: "Upload Adidas", href: "/staff/upload", icon: UploadCloud },
    { name: "History Upload", href: "/staff/history", icon: Database },
  ];

  const adminMenus = [
    { name: "Executive Dashboard", href: "/admin", icon: BarChart3 },
    { name: "Approval Queue", href: "/admin/approval", icon: UserCheck },
    { name: "Staff Management", href: "/admin/management", icon: Users },
  ];

  const activeMenus = isAdminArea ? adminMenus : staffMenus;

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-slate-200">
      <aside className="w-72 border-r border-slate-800 bg-slate-900/50 fixed h-full z-50">
        <div className="p-8 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <Zap className="text-white fill-white" />
          </div>
          <span className="text-xl font-black text-white italic">
            DATAVORTEX
          </span>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <div className="px-4 py-2">
            <span
              className={cn(
                "text-[10px] font-black uppercase tracking-[3px] px-2 py-1 rounded border",
                isAdminArea
                  ? "text-red-400 border-red-500/20 bg-red-500/5"
                  : "text-blue-400 border-blue-500/20 bg-blue-500/5"
              )}
            >
              {isAdminArea ? "Director Mode" : "Staff Mode"}
            </span>
          </div>
          {activeMenus.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                pathname === item.href
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-400 hover:bg-slate-800"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-semibold text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href={settingsHref}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl",
              pathname === settingsHref
                ? "bg-slate-800 text-white"
                : "text-slate-400"
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-400"
          >
            <LogOut />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>
      <main className="flex-1 ml-72 p-10">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
