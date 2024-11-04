
import React from "react";
import ThemeProvider from "../ThemeProvider";
import Navbar from "../components/Nabar";
import "./globals.css";

export const metadata = {
  title: "Week 11 Concepts and Work",
  description: "A site utilizing concepts of week 11",
};

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className="antialiased font-sans min-h-screen">
          {/* Navbar with ThemeToggle and Navigation Drawer */}
          <Navbar />
          
          {/* Main Content Area */}
          <main className="flex flex-col items-center justify-center p-4 pt-20 transition-all duration-300 max-w-full">
            {children}
          </main>
        </body>
      </html>
    </ThemeProvider>
  );
}