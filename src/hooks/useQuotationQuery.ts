import { fetchQuotation } from '@/api/fetchQuotation';
import { useQuery } from 'react-query';

export const useQuotationQuery = () =>
  useQuery({ queryKey: ['quotation'], queryFn: fetchQuotation });
