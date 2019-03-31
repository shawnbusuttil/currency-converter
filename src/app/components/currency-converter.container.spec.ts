import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

import { of } from 'rxjs/internal/observable/of';

import { CurrencyExchangeContainer } from './currency-converter.container';
import { CurrencyExchangeService } from '../services/currency.service';
import { CURRENCIES } from "../models/currency.const";

class MockCurrencyExchangeService {
    getCurrencies = () => CURRENCIES;
    exchangeCurrency = () => undefined;
    getExchangeData$ = () => of({ a: 0.5, b: 0.25 });
}

describe("CurrecyConverterSpecs", () => {
    let fixture: ComponentFixture<CurrencyExchangeContainer>;
    let component: CurrencyExchangeContainer;
    let service: MockCurrencyExchangeService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CurrencyExchangeContainer],
            imports: [ReactiveFormsModule],
            providers: [
                { provide: CurrencyExchangeService, useClass: MockCurrencyExchangeService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CurrencyExchangeContainer);
        service = TestBed.get(CurrencyExchangeService);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    describe("given the container is initialized", () => {
        it("should have the form initialized", () => {
            expect(component.ccForm).toBeDefined();
        });

        it("should set a predefined value to the base control", () => {
            expect(component.ccForm.get("base").value).toEqual(CURRENCIES[0]);
        });

        it("should set a predefined value to the target control", () => {
            expect(component.ccForm.get("target").value).toEqual(CURRENCIES[1]);
        });

        it("should already have some predefined exchange rate data", () => {
            expect(component.exchangeRates).toEqual({ a: 0.5, b: 0.25 });
        });

        describe("when the form is submitted", () => {
            beforeEach(() => {
                component.ccForm.get("base").setValue("EUR");
                component.ccForm.get("target").setValue("GBP");
                
                component.ccForm.get("amount").setValue(3.0);
                
                component.exchangeRates = {
                    ["GBP"]: 2.0
                };

                spyOn(service, "exchangeCurrency").and.returnValue(
                    component.ccForm.get("amount").value * component.exchangeRates["GBP"]
                );
                component.onSubmit();
            });
            
            it("should convert the currency", () => {
                expect(component.activeConversion).toEqual({
                    from: { symbol: "EUR", amount: 3.0 },
                    to: { symbol: "GBP", amount: 6.0 }
                });
            });

            it("should call exchangeCurrecny", () => {
                expect(service.exchangeCurrency).toHaveBeenCalled();
            });
        });
    });
});