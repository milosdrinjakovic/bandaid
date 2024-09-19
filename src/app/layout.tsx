import React from "react";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="p-5 bg-zinc-400">{children}</body>
    </html>
  )
}
