import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const font = Raleway({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UWDP",
  description: "A degree planner for University of Waterloo students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
