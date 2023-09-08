import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({ subsets: ['latin'] })

import AuthProvider from './context/AuthProvider'

export const metadata: Metadata = {
  title: 'Project Zion',
  description: 'FullStack Practice App, using NextJS and an MSSQL backend.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <AuthProvider>
          <div className={'container'}>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
