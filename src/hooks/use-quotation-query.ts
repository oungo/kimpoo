import { useQuery } from '@tanstack/react-query';
import { getQuotation } from '@/api/get-quotation';
import { tickerKeys } from '@/utils/query-keys';

export const useQuotationQuery = () =>
  useQuery({
    queryKey: tickerKeys.quotation,
    queryFn: getQuotation,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60,
  });
