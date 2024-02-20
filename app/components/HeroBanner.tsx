'use client'

import Banner from '@/public/banner.svg';
import mobileBanner from '@/public/hero-banner-mobile.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const HeroBanner = () => {
  const [width, setWidth] = useState<number>(768);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    
    handleResize()
    
    return () => {
      window.removeEventListener('resize', handleResize)
    };
  });

  return (
    <section className="hero-banner">
      <div className="hero-container relative">
        <picture></picture>
        <Image
          src={width > 767 ? Banner : mobileBanner}
          alt="CarFinder banner"
          sizes="100vw"
          className="w-full"
        />
        <div className="info-text text-white absolute mobile:items-center top-0 pt-10 mobile:w-screen mobile:h-full md:left-10 lg:top-20 lg:left-20 xl:top-28 flex flex-col gap-8">
          <h1 className="text-2xl lg:text-4xl font-bold">The Best Platform for Car Rental</h1>
          <div>
            <p>Ease of doing a car rental safely and</p>
            <p>reliably. Of course at a low price.</p>
          </div>
          <button className="bg-blue py-4 w-1/3 mobile:absolute bottom-8">Rent Now</button>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner