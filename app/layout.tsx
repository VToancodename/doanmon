import type { Metadata } from "next";
import { Inter } from "next/font/google"
import {
  ClerkProvider,
} from '@clerk/nextjs'

//From components
import { Toaster } from "@/components/ui/sonner";

//From Provider
import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provide";

//CSS design
import "./globals.css";

const inter = Inter({ subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Fintelligence",
  description: "Welcome to the Fintelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body  className={inter.className}>
          <QueryProvider>
            <SheetProvider/>
            <Toaster/>
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
