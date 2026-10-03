import { Footer } from "@/components/layout/public/footer";
import { Navbar } from "@/components/layout/public/navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "LifeDrop",
    template: "%s | LifeDrop",
  },
  description:
    "LifeDrop connects blood donors with people who urgently need blood.",
  openGraph: {
    title: "LifeDrop | Blood Donation & Emergency Platform",
    description:
      "Find blood donors and respond to emergency blood requests.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>

          <Navbar />

        <main>{children}</main>

        <Footer />

      </body>
    </html>
  );
}