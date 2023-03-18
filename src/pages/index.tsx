import { Select, Option } from '@/components/select';
import TableTicker from '@/components/ticker/TableTicker';

const index = () => {
  return (
    <div className="p-3">
      <Select defaultValue="업비트">
        <Option value="빗썸">빗썸</Option>
        <Option value="코인원">코인원</Option>
      </Select>
      <TableTicker />
    </div>
  );
};

export default index;
