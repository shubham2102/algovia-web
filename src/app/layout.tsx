import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ClientLayout from "@/providers/ClientLayout";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Algovia | AI-Native Engineering & Consulting",
  description:
    "Build what's next with AI at scale. Algovia helps enterprises design, build, and scale AI-native products, agents, and cloud platforms.",
  openGraph: {
    title: "Algovia | AI-Native Engineering",
    description:
      "Your AI partner from idea to deployment. Strategy, agents, cloud, and enterprise delivery.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)] antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
