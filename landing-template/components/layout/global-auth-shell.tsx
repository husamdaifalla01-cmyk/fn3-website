"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { SidebarContext } from "@/lib/sidebar-context";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

const SIDEBAR_COLLAPSED_KEY = "verdict_sidebar_collapsed";
const SIDEBAR_PINNED_KEY = "verdict_sidebar_pinned";

// App-facing public pages where logged-in users get the sidebar shell
const APP_PUBLIC_PREFIXES = ["/change-monitor", "/providers", "/risk", "/blog", "/financial-tools", "/api-access"];

export default function GlobalAuthShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    const savedCollapsed = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    const savedPinned = localStorage.getItem(SIDEBAR_PINNED_KEY);
    if (savedCollapsed !== null) setCollapsed(savedCollapsed === "true");
    if (savedPinned !== null) setPinned(savedPinned === "true");
  }, []);

  const isAppPublicPage = APP_PUBLIC_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  // Only activate shell on app-facing public pages for logged-in users.
  // Dashboard pages have their own sidebar via (dashboard)/layout.tsx.
  if (isLoading || !user || !isAppPublicPage) {
    return <>{children}</>;
  }

  return (
    <SidebarContext.Provider value={{ openSidebar: () => setSidebarOpen(true) }}>
      <div className="flex h-dvh overflow-hidden">
        <DashboardSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={collapsed}
          onCollapsedChange={(v) => {
            setCollapsed(v);
            localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(v));
          }}
          pinned={pinned}
          onPinnedChange={(v) => {
            setPinned(v);
            localStorage.setItem(SIDEBAR_PINNED_KEY, String(v));
            if (v && collapsed) {
              setCollapsed(false);
              localStorage.setItem(SIDEBAR_COLLAPSED_KEY, "false");
            }
          }}
        />
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
