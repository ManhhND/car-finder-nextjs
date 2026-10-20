import Link from "next/link";

const NotFound = () => {
  return (
    <main className="bg-gray flex flex-col items-center justify-center gap-6 py-20">
      <h1 className="text-5xl font-black">Car not found</h1>
      <p className="text-gray-2">
        The page you are looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="text-white bg-blue py-3 px-6 rounded">
        Back to all cars
      </Link>
    </main>
  );
};

export default NotFound;
