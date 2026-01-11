import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "root@notes",
  description: "nate's personal cybersecurity knowledge base",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="crt-effect">
        <Header />
        {children}
      </body>
    </html>
  );
}