import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],         
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable}`}> 
        {children} 
        <Toaster position="top-center"/>
      </body>
    </html>
  );
}
