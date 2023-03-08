import { fetchQuotation } from 'api/fetchQuotation';
import { useQuery } from 'react-query';
import TableTickerBody from './TableTickerBody';

const TableTicker = () => {
  const { data: quotation } = useQuery('quotation', fetchQuotation, {
    cacheTime: 0,
  });

  return (
    <table className="table-fixed text-sm w-full max-w-screen-lg">
      <thead>
        <tr className="text-right border-b border-b-gray-500">
          <th className="w-20 text-left">이름</th>
          <th className="w-20">현재가</th>
          <th className="w-16">김프</th>
          <th className="w-16">전일 대비</th>
          <th className="w-16">거래액(일)</th>
        </tr>
      </thead>
      <TableTickerBody quotation={quotation?.[0].basePrice} />
    </table>
  );
};

export default TableTicker;
