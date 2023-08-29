import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = localFont({
  src: "../../public/assets/fonts/Satoshi-Variable.woff2",
  variable: "--font-heading",
  weight: "700",
  display: "swap",
  style: "normal",
});

export const metadata: Metadata = {
  title: "EntApex App",
  description: "A production ready typesafe Next.js starter kit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
