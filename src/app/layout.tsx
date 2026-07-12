import type { Metadata } from "next";
import { Space_Grotesk, Inter, Poppins } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mohammad Sohail Shaikh | Futuristic Portfolio",
  description: "Portfolio of Mohammad Sohail Shaikh, a Backend-focused Software Developer & AIML Student building scalable backend systems and intelligent digital experiences.",
  keywords: [
    "Mohammad Sohail Shaikh",
    "Backend Developer",
    "MERN Stack",
    "Java Developer",
    "AIML Enthusiast",
    "Software Engineer",
    "Portfolio",
    "Terna Engineering College"
  ],
  authors: [{ name: "Mohammad Sohail Shaikh" }],
  creator: "Mohammad Sohail Shaikh",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${poppins.variable} scroll-smooth`}
    >
      <body className="bg-cyber-dark text-slate-100 font-sans antialiased min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
