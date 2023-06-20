import { useState } from 'react';

const IconCaution = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <i
        className="text-yellow-400 fa-solid fa-circle-exclamation sm:hover:cursor-pointer"
        onClick={() => setShowTooltip(!showTooltip)}
      />
      {showTooltip && (
        <span className="absolute -top-0.5 sm:top-0 block py-0.5 px-1 text-xs rounded-md py -right-20 dark:bg-neutral-700 bg-gray-200">
          투자 유의 종목
        </span>
      )}
    </div>
  );
};

export default IconCaution;
