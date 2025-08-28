"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Landmark, LogOut, Settings, TrendingUp, UserCog } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "./button"
import { Logo } from "./logo"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/securities", label: "Securities", icon: Landmark },
  { href: "/trading", label: "Trading", icon: TrendingUp },
  { href: "/user-settings", label: "User Settings", icon: UserCog },
  { href: "/settings", label: "System Settings", icon: Settings },
]

interface SidebarProps {
  isCollapsed: boolean
  onLogout: () => void
}

export function Sidebar({ isCollapsed, onLogout }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn("hidden border-r bg-background md:block transition-all duration-300", isCollapsed ? "w-20" : "w-64")}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-4">
          <Link href="/dashboard">
            <Logo isCollapsed={isCollapsed} />
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <TooltipProvider delayDuration={0}>
              {navItems.map((item) => (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                        pathname === item.href && "bg-primary text-primary-foreground hover:text-primary/90",
                        isCollapsed && "justify-center"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </TooltipProvider>
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={onLogout} variant="ghost" size={isCollapsed ? "icon" : "default"} className="w-full justify-start gap-3">
                  <LogOut className="h-5 w-5" />
                  {!isCollapsed && <span>Logout</span>}
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  <p>Logout</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </aside>
  )
}

