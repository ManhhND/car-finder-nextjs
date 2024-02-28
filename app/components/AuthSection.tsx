"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiUserCircle } from "react-icons/pi";
import Cookies from "universal-cookie";

const AuthSection = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const cookies = new Cookies();
  const handleLogout = () => {
    cookies.remove("csrf-token");
    router.push("/login");
    router.refresh();
  };

  const toggleAuthSection = () => {
    setOpen(!open);
  };

  return (
    <>
      <PiUserCircle size={24} onClick={toggleAuthSection} className="user" />
      <div className="action hidden group-hover:block absolute z-10 bg-white md:border border-gray shadow-md shadow-gray-3">
        {isLoggedIn ? (
          <div
            className="cursor-pointer py-2 px-4 hover:underline"
            onClick={handleLogout}
          >
            Logout
          </div>
        ) : (
          <div className="link-action flex flex-col">
            <Link href="/login" className="py-2 px-4 hover:underline">
              Login
            </Link>
            <Link href="/register" className="py-2 px-4 hover:underline">
              Register
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default AuthSection;
