import './globals.css';
import { DM_Sans } from 'next/font/google';
const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Project Zion',
  description: 'FullStack Practice App, using NextJS and an MSSQL backend.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <div className={'container'}>
          {children}
        </div>
      </body>
    </html>
  )
}
