import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CURRENCIES } from '../models/currency.const';
import { ExchangeRates, Conversion } from '../models/currency.model';
import { CurrencyExchangeService } from '../services/currency.service';

@Component({
  selector: 'cc-currency-converter',
  templateUrl: './currency-converter.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyExchangeContainer implements OnInit, OnDestroy {
  ccForm: FormGroup;
  exchangeRates: ExchangeRates;
  activeConversion: Conversion;

  private data$$: Subscription;
  
  constructor(private service: CurrencyExchangeService, private changeDetector: ChangeDetectorRef) {
    this.ccForm = new FormGroup({
      base: new FormControl("", [Validators.required]),
      target: new FormControl("", [Validators.required]),
      amount: new FormControl("", [Validators.required])
    });
  }
  
  ngOnInit() {
    this.data$$ = this.ccForm.controls.base.valueChanges.pipe(
      switchMap(val => this.service.getExchangeData$(val))
    ).subscribe(rates => {
      this.exchangeRates = rates;
      this.changeDetector.markForCheck();
    });

    this.ccForm.get("base").setValue(this.getCurrencies()[0]);
    this.ccForm.get("target").setValue(this.getCurrencies()[1]);
  }

  ngOnDestroy() {
    this.data$$.unsubscribe();
  }

  getCurrencies(): string[] {
    return this.service.getCurrencies();
  }

  onSubmit() {
    const base = this.ccForm.get("base").value as string;
    const target = this.ccForm.get("target").value as string;
    const amount = this.ccForm.get("amount").value as number;

    const convertedAmount = this.service.exchangeCurrency(amount, this.exchangeRates[target]);

    this.activeConversion = { 
      from: { 
        symbol: base,
        amount
      },
      to: {
        symbol: target, 
        amount: convertedAmount 
      }
    };
  }
}
