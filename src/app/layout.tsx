import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Providers } from '@/contexts/Providers'
import NextImage from '@/components/NextImage'
import NextLink from '@/components/NextLink'
import { Button, Divider, Link } from '@nextui-org/react'

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
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>

      <body className="light text-foreground bg-background">
        <Providers>
          <div className='flex flex-col h-screen'>
            <header className='bg-primary text-primary-foreground h-16 flex items-center justify-between px-8 py-2'>
              <NextLink href='/'>
                <NextImage alt='logo' priority src='/logo.png' width={140} height={48} className='h-12 w-auto' />
              </NextLink>

              <div className='text-base'>Dashboard de <span className='font-bold'>3Dify</span></div>
            </header>

            <div className='flex flex-grow overflow-hidden'>
              <div className='w-56 bg-content2 border-r border-content3 text-content2-foreground flex flex-col items-center'>
                <h2 className='text-xl font-bold mt-6 mr-auto ml-4'>Menu</h2>

                {/* Links */}
                <nav className='w-full flex flex-col gap-2 p-4'>
                  <Link isBlock className="py-2 px-4 gap-2" color='foreground' href='/projects'>
                    <span className="material-symbols-outlined">folder_open</span>
                    Proyectos
                  </Link>
                  <Divider />
                  <Link isBlock className="py-2 px-4 gap-2" color='foreground' href='/providers'>
                    <span className="material-symbols-outlined">local_shipping</span>
                    Proveedores
                  </Link>
                  <Divider />
                  <Link isBlock className="py-2 px-4 gap-2" color='foreground' href='/materials'>
                    <span className="material-symbols-outlined">layers</span>
                    Materiales
                  </Link>
                </nav>

                <Divider className='mt-auto' />
                <Button color='danger' variant='light' size='lg' startContent={<span className="material-symbols-outlined">logout</span>} className='w-full rounded-none'>Cerrar Sesion</Button>
              </div>

              <main className='p-4 flex-grow overflow-auto'>
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
