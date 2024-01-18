import type { Metadata } from 'next'
import './globals.scss'


export const metadata: Metadata = {
  title: 'English learning games',
  description: 'Created by Damian Tulacz',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
