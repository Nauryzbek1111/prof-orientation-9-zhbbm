import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Профориентация 9 ЖББМ | №9 ЖББМ",
  description: "Оқушыларға кәсіби бағдар беру платформасы"
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="kk"><body>{children}</body></html>;
}
