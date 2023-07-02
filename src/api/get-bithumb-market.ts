interface JSONResponse {
  code: string;
  data: {
    coinsOnMarketList: {
      C0100: BithumbMarket[];
    };
  };
  message: string;
  status: number;
}

interface BithumbMarket {
  canTrade: boolean;
  coinName: string;
  coinSymbol: string;
  isListedNew: boolean;
  isInvestment: boolean;
}

export const getBithumbMarket = async (): Promise<BithumbMarket[]> => {
  const response = await fetch('https://gw.bithumb.com/exchange/v1/comn/intro');

  if (response.ok) {
    const { data }: JSONResponse = await response.json();
    return data.coinsOnMarketList.C0100;
  }

  return Promise.reject(new Error('Failed fetch bithumb market'));
};
