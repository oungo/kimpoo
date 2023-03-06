import { fetchQuotation } from 'api/fetchQuotation';
import { useQuery } from 'react-query';
import TableTickerBody from './TableTickerBody';

const TableTicker = () => {
  const { data: quotation } = useQuery('quotation', fetchQuotation, {
    cacheTime: 0,
  });

  return (
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>현재가</th>
          <th>김프</th>
          <th>전일 대비</th>
          <th>유의 종목</th>
          <th>거래액(일)</th>
        </tr>
      </thead>
      <TableTickerBody quotation={quotation?.[0].basePrice} />
    </table>
  );
};

export default TableTicker;
