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
  title: "Algovia AI | AI Transformation & Execution",
  description:
    "Algovia AI is a leading AI Transformation and Execution firm helping organizations move from strategy to execution, adoption, and measurable value.",
  openGraph: {
    title: "Algovia AI | AI Transformation & Execution",
    description:
      "The partner that connects strategy and execution — accountable until AI becomes business as usual.",
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
