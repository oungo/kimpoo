import { getQuotation } from '@/api/get-quotation';

const Header = async () => {
  const quotation = await getQuotation();

  return (
    <header className="p-2 border-b dark:border-neutral-700">
      <div className="w-full max-w-screen-lg m-auto text-xs">
        <span>
          환율(USD/KRW) <b>{quotation?.basePrice}</b>
        </span>
      </div>
    </header>
  );
};

export default Header;
