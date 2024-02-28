import Logo from "@/public/logo.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className="mobile:p-4 p-16 bg-white w-full">
        <div className="row-1 min-h-60 mb-8 flex border-b border-gray-3 text-gray-2 mobile:flex-col mobile:pb-8 mobile:gap-8">
          <div className="left-col flex-auto md:w-3/4">
            <Image src={Logo} alt="CarFinder logo" className="mb-6" />
            <p>Our vision is to provide convenience and</p>
            <p>help increase your sales business.</p>
          </div>
          <div className="right-col flex flex-col gap-4 flex-auto md:w-1/4">
            <h3 className="font-semibold text-xl text-black">About</h3>
            <p>How it works?</p>
            <p>Created By KopM</p>
          </div>
        </div>
        <div className="row-2 flex mobile:flex-col-reverse mobile:gap-8">
          <div className="left-col md:w-3/4">
            <p className="w-3/4">©2024 CarFinder. All rights reserved</p>
          </div>
          <div className="right-col flex flex-col xl:flex-row gap-4 xl:gap-0 md:w-1/4 mobile:flex-row mobile:gap-8">
            <p className="xl:w-1/2">Privacy & Policy</p>
            <p className="xl:w-1/2">Terms & Condition</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
