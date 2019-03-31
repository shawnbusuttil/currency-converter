import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

import { ExchangeRateData, ExchangeRates } from '../models/currency.model';

@Injectable({
    providedIn: "root"
})
export class CurrencyExchangeService {
    constructor(
        @Inject("currencies") private currencies: string[],
        @Inject("apiUrl") private apiUrl: string,
        private http: HttpClient
    ) {
    }

    public getCurrencies(): string[] {
        return this.currencies;
    }

    public getExchangeData$(base: string = "EUR"): Observable<ExchangeRates> {
        return this.http.get<ExchangeRateData>(this.apiUrl, {
            params: { base }
        }).pipe(map(res => res.rates));
    }

    public exchangeCurrency(amount: number, rate: number = 1): number {
        return amount * rate;
    }
}