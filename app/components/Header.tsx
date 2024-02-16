import { Lato } from "next/font/google";
import Link from "next/link";
import { getAllCars } from "../api";
import SearchBar from "./SearchBar";

const logoFont = Lato({weight: '700', subsets: ['latin']})

const Header = async () => {
  const allCars = await getAllCars();

  return (
    <header className="bg-white">
      <div
        className={`menu-container flex max-w-screen-2xl items-center justify-between px-5 py-5 md:px-20`}
      >
        <Link
          href={"/"}
          className={`${logoFont.className} text-blue-600 text-4xl`}
        >
          CarFinder
        </Link>
        <SearchBar allCars={allCars} />
      </div>
    </header>
  )
}

export default Header