import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionTimeoutProvider } from '../components/providers/session-timeout-provider'

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
        <SessionTimeoutProvider>
          {children}
        </SessionTimeoutProvider>
      </body>
    </html>
  )
}
