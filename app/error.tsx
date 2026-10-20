"use client";

const ErrorPage = ({ reset }: { error: Error; reset: () => void }) => {
  return (
    <main className="bg-gray flex flex-col items-center justify-center gap-6 py-20">
      <h1 className="text-5xl font-black">Something went wrong</h1>
      <button
        type="button"
        onClick={reset}
        className="text-white bg-blue py-3 px-6 rounded"
      >
        Try again
      </button>
    </main>
  );
};

export default ErrorPage;
