"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "../lib/utils"

const Breadcrumb = () => {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

  return (
    <nav aria-label="breadcrumb" className="hidden md:flex">
      <ol className="flex items-center space-x-2 text-sm font-medium">
        <li>
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
            Dashboard
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`
          const isLast = index === pathSegments.length - 1

          return (
            <li key={href}>
              <div className="flex items-center">
                <span className="mx-2 text-muted-foreground">/</span>
                <Link
                  href={href}
                  className={cn(
                    "hover:text-foreground",
                    isLast ? "text-foreground" : "text-muted-foreground"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {capitalize(segment.replace(/-/g, ' '))}
                </Link>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { Breadcrumb }

