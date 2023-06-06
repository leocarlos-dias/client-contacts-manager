import { JetBrains_Mono } from "next/font/google"
import { AuthProvider } from "./contexts/AuthContext"
import "./globals.css"

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "Client Contacts Manager",
  description: "This is a simple client contacts manager",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <AuthProvider>
        <body className={jetBrainsMono.className}>{children}</body>
      </AuthProvider>
    </html>
  )
}
