"use client"

import * as React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background px-4 md:px-6 py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} VCB Administration. All rights reserved.</p>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <Link href="/terms-of-service" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}

