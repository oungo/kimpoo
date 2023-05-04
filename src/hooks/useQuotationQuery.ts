import { useQuery } from 'react-query';
import { fetchQuotation } from '@/api/fetchQuotation';
import * as queryKeys from '@/utils/queryKeys';

export const useQuotationQuery = () =>
  useQuery({
    queryKey: [queryKeys.QUOTATION],
    queryFn: fetchQuotation,
    refetchOnWindowFocus: false,
  });
