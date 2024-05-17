import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/assets/css/md.scss'
import 'highlight.js/styles/default.min.css'
import "./globals.css"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "迁徙博客",
  description: "博客文章",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-slate-100 dark:bg-black h-full dark:text-white">{children}</div>
      </body>
    </html>
  );
}
