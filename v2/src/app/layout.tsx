import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { LenisProvider } from "@/components/lenis-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kaveesh Bhat — Software Engineer",
  description:
    "Java Engineer specializing in cloud-native microservices, Apache Kafka, Spring Boot, and Generative AI.",
  keywords: ["Software Engineer", "Java", "Kafka", "Spring Boot", "Next.js", "Gen AI"],
  authors: [{ name: "Kaveesh Bhat" }],
  openGraph: {
    title: "Kaveesh Bhat — Software Engineer",
    description: "Cloud-native engineer exploring distributed systems and Generative AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* LenisProvider is a client component — GradientMesh dynamic import lives there */}
          <LenisProvider>
            <CustomCursor />
            <Navbar />
            <main className="flex-1 w-full relative z-10">
              {children}
            </main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
