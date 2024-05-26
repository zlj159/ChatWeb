import "./styles/globals.scss";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false })

export const metadata = {
  title: 'ChatWeb',
  description: 'ChatWeb - Chat with your AI friends!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
