import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { WORLD_CURRENCIES } from '../utils/currencies';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('INR');
  const [liveRates, setLiveRates] = useState({});

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(r => r.json())
      .then(d => { if (d && d.rates) setLiveRates(d.rates); })
      .catch(e => console.log('Failed to fetch live rates', e));
  }, []);

  const formatPrice = useCallback((usdBase, options = {}) => {
    const { decimalsOverride, pdfMode } = options;
    const curr = WORLD_CURRENCIES.find(c => c.code === currency) || WORLD_CURRENCIES[0];
    const rate = liveRates[curr.code] || curr.rate;
    const val = usdBase * rate;
    
    const isLarge = ['IDR', 'NGN', 'INR', 'JPY', 'PKR', 'KRW', 'VND', 'COP', 'CLP'].includes(curr.code);
    let decimals = isLarge ? 0 : val < 10 ? 2 : (val < 1000 ? 1 : 0);
    
    if (decimalsOverride !== undefined) {
      decimals = decimalsOverride;
    }

    const formattedVal = val.toLocaleString(undefined, { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    });
    
    if (pdfMode) {
      return `${curr.code} ${formattedVal}`;
    }
    
    const needsCode = !['₹','$','€','£','¥','₦','₱','฿','R$','৳'].includes(curr.sym);
    
    return `${curr.sym}${formattedVal}${needsCode ? ` ${curr.code}` : ''}`;
  }, [currency, liveRates]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, liveRates }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
