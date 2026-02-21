import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "JumboHack Schedule",
    description: "JumboHack live event schedule",
    icons: {
        icon: [
            {
                media: "(prefers-color-scheme: light)",
                url: "/icon/Main_Logo_BlueYellow.svg",
                href: "/icon/Main_Logo_BlueYellow.svg",
            },
            {
                media: "(prefers-color-scheme: dark)",
                url: "/icon/Main_Logo_YellowBlue.svg",
                href: "/icon/Main_Logo_YellowBlue.svg",
            },
        ],
    },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
