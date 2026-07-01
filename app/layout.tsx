import type { Metadata } from "next"
import { Lora } from "next/font/google"
import "./globals.css"
import { SidebarNav } from "@/components/sidebar-nav"

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
})

export const metadata: Metadata = {
  title: "Daily Grace — Walk with Jesus",
  description: "Your daily companion for devotionals, Christian music, and reflective journaling",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${lora.variable} antialiased`}>
        <div className="flex min-h-screen bg-stone-50">
          <SidebarNav />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
