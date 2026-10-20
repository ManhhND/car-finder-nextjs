import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { GlobalContextProvider } from "@/context/globalContext";
import { getAllCars } from "@/lib/cars";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const mainFont = Lato({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Car Finder",
  description: "Find and rent your next car",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allCars = await getAllCars();

  return (
    <html lang="en">
      <body className={`${mainFont.className} text-black`}>
        <GlobalContextProvider initialCars={allCars}>
          <Header allCars={allCars} />
          {children}
          <Footer />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
