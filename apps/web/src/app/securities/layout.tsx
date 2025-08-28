import { DashboardLayout } from "../../components/layout/dashboard-layout";
import * as React from 'react'

interface ModuleLayoutProps {
  children: React.ReactNode
}

export default function ModuleLayout({ children }: ModuleLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>
}

