import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeToggle } from "@/components/ThemeToggle";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EntApex App",
  description: "Fullstack typesafe Next.js 13 Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="absolute bottom-0 right-0 p-4">
              <ModeToggle />
            </div>
            {children}
          </ThemeProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
