import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sampa Vision AI",
  description: "Criado com Claude e Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
