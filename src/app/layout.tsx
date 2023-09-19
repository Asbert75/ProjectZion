import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({ subsets: ['latin'] })

import AuthProvider from './context/AuthProvider'
import { Suspense } from 'react'
import Loading from './loading'


export const metadata: Metadata = {
  title: 'EternalLabs',
  description: 'CSGO Gambling',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <Suspense fallback={<Loading />}>
          <AuthProvider>
            <div className={'container'}>
              {children}
            </div>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  )
}
