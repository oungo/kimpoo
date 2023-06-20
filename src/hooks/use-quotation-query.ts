import { useQuery } from '@tanstack/react-query';
import { getQuotation } from '@/api/get-quotation';
import * as queryKeys from '@/utils/query-keys';

export const useQuotationQuery = () =>
  useQuery({
    queryKey: [queryKeys.QUOTATION],
    queryFn: getQuotation,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60,
  });
