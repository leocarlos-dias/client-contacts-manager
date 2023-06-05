import { JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { ClientContextProvider } from './contexts/ClientContext'
import './globals.css'

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "Client Manager",
  description: "Client Manager",
}

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <ClientContextProvider>
        <body className={jetBrainsMono.className}>
          {children}
          <Toaster />
        </body>
      </ClientContextProvider>
    </html>
  )
}