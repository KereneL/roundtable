import localFont from "next/font/local";
import "./styles/globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { AppProvider } from "./context/AppContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "roundTable",
  // description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
        <div className="flex flex-col h-screen items-center justify-between font-[family-name:var(--font-geist-sans)]">
          <Header />
          {children}
          <Footer />
        </div>
        </AppProvider>
      </body>
    </html>
  );
}