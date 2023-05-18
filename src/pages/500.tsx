import Link from 'next/link';

const Custom500 = () => {
  return (
    <div className="px-2 mt-40 text-center sm:mt-80">
      <h1 className="text-9xl">500</h1>
      <h2 className="text-xl">Internal Server Error</h2>
      <h2 className="mb-20 text-xl">잠시 후 다시 시도해주세요.</h2>
      <Link href="/" className="px-4 py-2 border rounded-md">
        GO TO HOMEPAGE
      </Link>
    </div>
  );
};

export default Custom500;
