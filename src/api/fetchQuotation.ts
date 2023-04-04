export interface Quatation {
  basePrice: number;
}

export const fetchQuotation = async (): Promise<Quatation> => {
  const response = await fetch(
    'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD'
  );

  if (response.ok) {
    const json: Quatation[] = await response.json();
    return json[0];
  }

  return Promise.reject(new Error('Failed fetch quotation'));
};
