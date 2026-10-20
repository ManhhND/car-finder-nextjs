import Logo from "@/public/logo.svg";
import { Lato } from "next/font/google";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Car } from "@/app/utils/interfaces";
import { getSession } from "@/lib/session";
import AuthSection from "./AuthSection";
import SearchBar from "./SearchBar";

const logoFont = Lato({ weight: "700", subsets: ["latin"] });

const Header = async ({ allCars }: { allCars: Car[] }) => {
  const isLoggedIn = !!(await getSession(cookies()));

  return (
    <header className="bg-white">
      <div className="menu-container flex flex-col md:flex-row items-center px-5 py-8 mobile:gap-10 mobile:py-10 mobile:px-20">
        <Link href="/" className="md:w-2/5">
          <Image src={Logo} alt="CarFinder logo" className="" />
        </Link>
        <div className="search relative md:w-2/5">
          <SearchBar data={allCars} />
        </div>
        <div className="authentication group relative mx-auto">
          <AuthSection isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </header>
  );
};

export default Header;
