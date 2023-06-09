import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="px-2 mt-40 text-center sm:mt-80">
      <h1 className="text-9xl">404</h1>
      <h2 className="mb-20 text-xl">존재하지 않는 페이지입니다.</h2>
      <Link href="/" className="px-4 py-2 border rounded-md">
        GO TO HOMEPAGE
      </Link>
    </div>
  );
};

export default NotFound;
