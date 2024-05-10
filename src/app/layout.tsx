import { Rubik } from "next/font/google";
import "./globals.css";

// Export the global metadata config
export { metadata } from "./metadata.config";

// Create a nextjs font instance of Rubik's font
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={rubik.variable}>
      <body className="bg-primary-100">{children}</body>
    </html>
  );
}
