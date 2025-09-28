import { QueryProvider } from "@/components/providers/query-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Vazir Persian font
const vazir = {
  variable: "--font-vazir",
  className: "font-vazir",
  style: {
    fontFamily:
      "Vazir, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
};

export const metadata: Metadata = {
  title: "Zeytoon App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vazir.variable} antialiased bg-background`}
        style={vazir.style}
      >
        <QueryProvider>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
