import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scala Ventures ROI Calculator",
  description: "Simulador de crescimento com Google Ads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}