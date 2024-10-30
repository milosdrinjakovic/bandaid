import React from "react";
import { Toaster } from "react-hot-toast";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="p-5 bg-zinc-200">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  )
}
