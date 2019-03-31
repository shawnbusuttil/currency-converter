export interface ExchangeRateData {
    base: string,
    rates: ExchangeRates
}

export interface ExchangeRates {
    [currency: string]: number
}

export interface Currency {
    symbol: string;
    amount: number;
}

export interface Conversion {
    from: Currency;
    to: Currency;
}