"use client"

import * as React from "react"
import { Sidebar, Header, Footer } from "@banking/ui"
import { useAuthStore } from "@banking/services"
import { PageTransition } from './page-transition'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)
  const { user, logout } = useAuthStore()

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr]">
      <Sidebar isCollapsed={isSidebarCollapsed} onLogout={logout} />
      <div className="flex flex-col">
        <Header user={user} onMenuClick={toggleSidebar} onLogout={logout} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </div>
    </div>
  )
}

