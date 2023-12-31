"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { store } from "@/store/index";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-[var(--background-body)] ${inter.className}`}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
