import { fetchQuotation } from 'api/fetchQuotation';
import { useQuery } from 'react-query';

export const useQuotationQuery = () => {
  return useQuery('quotation', fetchQuotation);
};
