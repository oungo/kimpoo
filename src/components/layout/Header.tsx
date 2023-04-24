import { useQuotationQuery } from '@/hooks/useQuotationQuery';

const Header = () => {
  const { data: quotation } = useQuotationQuery();

  return (
    <header className="p-2 border-b dark:border-neutral-700">
      <div className="w-full max-w-screen-lg m-auto text-xs">
        <span>
          환율 <b>{quotation?.basePrice}</b>
        </span>
      </div>
    </header>
  );
};

export default Header;
