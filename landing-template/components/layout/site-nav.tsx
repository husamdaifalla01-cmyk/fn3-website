"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, Menu, Settings, User } from "lucide-react";

import Navbar from "@/components/sections/navbar/default";
import MardiiLogo from "@/components/logos/mardii";
import { useAuth } from "@/lib/auth-context";
import { useSidebar } from "@/lib/sidebar-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Must match GlobalAuthShell's APP_PUBLIC_PREFIXES
const APP_PUBLIC_PREFIXES = ["/change-monitor", "/providers", "/risk", "/blog", "/financial-tools", "/api-access"];

type NavLink = {
  text: string;
  href: string;
};

const primaryLinks: NavLink[] = [
  { text: "Change Monitor", href: "/change-monitor" },
  { text: "Risk Scores", href: "/risk" },
  { text: "Financial Tools", href: "/financial-tools" },
  { text: "API Access", href: "/api-access" },
  { text: "About", href: "/about" },
  { text: "Blog", href: "/blog" },
  { text: "Changelog", href: "/changelog" },
];

interface SiteNavProps {
  className?: string;
}

function UserMenu() {
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium truncate">{user.email}</p>
          <p className="text-xs text-muted-foreground capitalize">
            {user.tier} plan
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/account" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/alerts" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Alert Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function SiteNav({ className }: SiteNavProps) {
  const { user, isLoading } = useAuth();
  const { openSidebar } = useSidebar();
  const pathname = usePathname();

  const isAppPublicPage = APP_PUBLIC_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  // When logged in on an app-facing public page, the GlobalAuthShell provides
  // the full desktop sidebar. On mobile/tablet show a minimal header with a
  // hamburger that opens that sidebar.
  if (!isLoading && user && isAppPublicPage) {
    return (
      <header className="flex h-14 items-center border-b border-border/50 bg-transparent backdrop-blur-sm px-4 lg:hidden">
        <button
          onClick={openSidebar}
          aria-label="Open sidebar"
          className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/" className="flex items-center gap-2 text-sm font-bold">
          <MardiiLogo className="h-5 w-5" />
          <span className="text-orange-500">mardii.com</span>
        </Link>
      </header>
    );
  }

  const actions = user
    ? []
    : [
        {
          text: "Sign in",
          href: "/login",
          isButton: true as const,
          variant: "default" as const,
        },
      ];

  return (
    <Navbar
      logo={<MardiiLogo className="h-6 w-6" />}
      name="mardii.com"
      homeUrl="/"
      className={className}
      showNavigation
      customNavigation={
        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {primaryLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] transition-all hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            >
              {link.text}
            </a>
          ))}
        </nav>
      }
      mobileLinks={primaryLinks}
      actions={isLoading ? [] : actions}
      customRight={!isLoading && user ? <UserMenu /> : undefined}
    />
  );
}
