import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Providers } from '@/contexts/Providers'

export const metadata: Metadata = {
  title: '3Dify',
  description: '3Dify is a 3D printing and modeling startup in Mexico, Querétaro.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="light">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
