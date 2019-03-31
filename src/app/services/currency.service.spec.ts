import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";

import { CurrencyExchangeService } from "./currency.service";
import { API_URL } from '../app.const';
import { CURRENCIES } from '../models/currency.const';

describe("CurrencyExchangeServiceSpecs", () => {
    let service: CurrencyExchangeService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CurrencyExchangeService,
                { provide: 'currencies', useValue: CURRENCIES },
                { provide: "apiUrl", useValue: API_URL }
            ]
        });

        service = TestBed.get(CurrencyExchangeService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it("should return the currencies", () => {
        expect(service.getCurrencies()).toEqual(CURRENCIES);
    });

    describe("when the currency is exchanged", () => {
        it("should return the correct result", () => {
            expect(service.exchangeCurrency(1.0, 2.0)).toEqual(2);
        });
    });

    describe("when the currency rates are fetched", () => {
        it("should return the currency rates as an observable", () => {
            const mockedRates = {
                "a": 1,
                "b": 2
            };

            const mockedParams = new HttpParams().set("base", CURRENCIES[0]);
            
            service.getExchangeData$().subscribe(rates => {
                expect(rates).not.toBeNull();
            });
            
            const req = httpMock.expectOne({ method: "GET", url: `${API_URL}?base=${CURRENCIES[0]}` });
            expect(req.request.params.get("base")).toEqual(CURRENCIES[0]);

            req.flush(mockedRates);
            httpMock.verify();
        });
    });
});