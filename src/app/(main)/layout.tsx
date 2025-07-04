"use client";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import StoreProvider from "@/providers/store-provider";
import { Toaster } from "sonner";
import Header from "@/components/skeleton/header";
import SideNavbar from "@/components/skeleton/sidenav";
import AuthLayout from "@/providers/auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased over overflow-hidden bg-black`}
      >
        <StoreProvider>
          <AuthLayout>
            <Toaster position="top-center" richColors />
            <div className="flex flex-col h-screen">
              <Header setIsCollapsed={setIsCollapsed} />
              <div className="flex flex-1 overflow-hidden">
                <SideNavbar isCollapsed={isCollapsed} />
                <div className="overflow-auto w-full">{children}</div>
              </div>
            </div>
          </AuthLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
