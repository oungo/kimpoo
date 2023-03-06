import TableTickerBody from './TableTickerBody';

const TableTicker = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>현재가</th>
          <th>김프</th>
          <th>전일 대비 값</th>
          <th>누적 거래 대금</th>
          <th>유의 종목 여부</th>
          <th>거래액(일)</th>
        </tr>
      </thead>
      <TableTickerBody />
    </table>
  );
};

export default TableTicker;
