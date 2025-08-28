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
    <div className="relative grid min-h-screen w-full md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr]">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-secondary/30 to-background bg-[length:200%_200%] animate-background-pan" />
      <Sidebar isCollapsed={isSidebarCollapsed} onLogout={logout} />
      <div className="flex flex-col bg-transparent">
        <Header user={user} onMenuClick={toggleSidebar} onLogout={logout} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-transparent">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </div>
    </div>
  )
}

