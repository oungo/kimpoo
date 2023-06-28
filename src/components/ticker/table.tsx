import TableBody from './table-body';
import TableHeaders from './table-headers';

const Table = () => {
  return (
    <table className="w-full max-w-screen-lg mt-4 text-xs table-fixed sm:text-sm">
      <colgroup>
        <col width="25%" />
        <col />
        <col />
        <col />
        <col width="20%" />
      </colgroup>

      <thead className="text-xs">
        <tr className="text-right border-b border-b-gray-500 dark:border-b-neutral-700 [&>th]:text-neutral-500">
          <TableHeaders />
        </tr>
      </thead>

      <TableBody />
    </table>
  );
};

export default Table;
