import Banner from '@/public/banner.png'
import Image from 'next/image'

const HeroBanner = () => {
  return (
    <section className="">
      <div>
        <Image
          src={Banner}
          alt="CarFinder banner"
          className="w-full"
        />

        <h1 className="text-4xl font-bold">The Best Platform for Car Rental</h1>
        <p>
          Ease of doing a car rental safely and reliably. Of course at a low price.
        </p>
      </div>
    </section>
  )
}

export default HeroBanner