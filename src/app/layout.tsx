"use client"
import React from "react";
import { Toaster } from "react-hot-toast";
import { UserProvider } from '@auth0/nextjs-auth0/client';

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <UserProvider>
        <body className="bg-zinc-200">
        
          <Toaster position="top-center" />
            {children}
        </body>
      </UserProvider>
    </html>
  )
}
