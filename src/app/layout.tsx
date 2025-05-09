"use client"
import React from "react";
import { Toaster } from "react-hot-toast";
import { UserProvider } from '@auth0/nextjs-auth0/client';

import "./globals.css";
import { Providers } from "@/lib/Providers";
import Sidebar from "./navigation/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <UserProvider>
        <body className="bg-zinc-200 overflow-hidden flex">
          <Providers>
            <Toaster position="top-center" />
              <Sidebar />
              {children}
          </Providers>
        </body>
      </UserProvider>
    </html>
  )
}
