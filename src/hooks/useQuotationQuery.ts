import { fetchQuotation } from '@/api/fetchQuotation';
import * as queryKeys from '@/utils/queryKeys';
import { useQuery } from 'react-query';

export const useQuotationQuery = () =>
  useQuery({ queryKey: [queryKeys.QUOTATION], queryFn: fetchQuotation });
