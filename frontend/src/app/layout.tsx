import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/auth-provider";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";
import ClientLayoutWrapper from "./layoutClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio - Management System",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  description: "A portfolio management system for managing your portfolio",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
