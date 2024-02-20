import { getAllCars } from "@/app/api";
import Logo from "@/public/logo.svg";
import { Lato } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

const logoFont = Lato({weight: '700', subsets: ['latin']})

const Header = async () => {
  const allCars = await getAllCars();

  return (
    <header className="bg-white">
      <div className="menu-container max-w-screen-2xl flex flex-col md:flex-row items-center px-5 py-8 mobile:gap-10 mobile:py-10 mobile:px-20">
        <Link href="/" className="md:w-2/5">
          <Image
          src={Logo}
          alt="CarFinder logo"
          className="" />
        </Link>
        <div className="search relative md:w-3/5">
          <SearchBar allCars={allCars} />
        </div>
      </div>
    </header>
  )
}

export default Header