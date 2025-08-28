"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Home, LogOut, Package, Package2, Settings, ShoppingCart } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "./button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/securities", label: "Securities", icon: Package },
  { href: "/trading", label: "Trading", icon: ShoppingCart },
  { href: "/settings", label: "Settings", icon: Settings },
]

interface SidebarProps {
  isCollapsed: boolean
}

export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn("hidden border-r bg-muted/40 md:block transition-all duration-300", isCollapsed ? "w-20" : "w-64")}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            {!isCollapsed && <span>VCB Admin</span>}
          </Link>
          {!isCollapsed && (
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          )}
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-4 text-sm font-medium">
            <TooltipProvider delayDuration={0}>
              {navItems.map((item) => (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                        pathname === item.href && "bg-muted text-primary",
                        isCollapsed && "justify-center"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
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
                <Button variant="ghost" size={isCollapsed ? "icon" : "default"} className="w-full justify-start gap-3">
                  <LogOut className="h-4 w-4" />
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

