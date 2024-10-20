// import localFont from "next/font/local";
import { Roboto_Mono } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import Head from "next/head";

const roboto = Roboto_Mono({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
});
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "The Chess Directory",
  icons: {
    icon: "/favicon.ico", // /public path
  },
  description: "A directory of chess games",
  openGraph: {
    title: "The Chess Directory",
    // icon: "/favicon.ico",
    // apple: "/apple-touch-icon.png",
    description: "A directory of chess games",
    type: "website",
    url: "week8-project-rust.vercel.app",
    image: "https://next-comments-postgres.vercel.app/homeBackground.avif", // add an appropriate image to your public folder
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={roboto.className}
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
