import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
//import NavBar from "../features/dashboard/DashboardNavbar";
import { Providers } from "./Providers";
// import Button from "./components/ButtonC";

// const recoverGreen = "#4ade80";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        {/**<NavBar /> */}
        <main>
        {children}
        </main>
        </Providers>
      </body>
    </html>
  );
}
