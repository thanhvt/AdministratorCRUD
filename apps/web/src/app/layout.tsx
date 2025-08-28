import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionTimeoutProvider } from '../components/providers/session-timeout-provider'
import { QueryProvider } from '../components/providers/query-provider'
import { ThemeProvider } from '../components/providers/theme-provider'
import { Toaster } from '@banking/ui'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Banking Administration System',
  description: 'Secure banking administration and custody services platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <SessionTimeoutProvider>
              {children}
              <Toaster />
            </SessionTimeoutProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
