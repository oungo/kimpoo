'use client';

import { useEffect } from 'react';
import logError from '@/api/logError';

interface Props {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: Props) => {
  useEffect(() => {
    logError(error);
  }, [error]);

  return (
    <div className="px-2 mt-40 text-center sm:mt-80">
      <h1 className="text-xl">에러가 발생했습니다.</h1>
      <button className="px-4 py-2 mt-10 mb-24 border rounded-md" onClick={() => reset()}>
        다시시도
      </button>
    </div>
  );
};

export default Error;
