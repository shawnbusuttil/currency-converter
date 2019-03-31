import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { CurrencyExchangeService } from './services/currency.service';
import { CURRENCIES } from './models/currency.const';
import { API_URL } from './app.const';

import { CurrencyExchangeContainer } from './components/currency-converter.container';

import { CurrencyRatesListComponent } from './components/currency-rates-list/currency-rates-list.component';
import { ConversionComponent } from './components/conversion/conversion.component';

@NgModule({
  declarations: [
    CurrencyExchangeContainer,
    CurrencyRatesListComponent,
    ConversionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    CurrencyExchangeService,
    { provide: 'currencies', useValue: CURRENCIES },
    { provide: "apiUrl", useValue: API_URL }
  ],
  bootstrap: [CurrencyExchangeContainer]
})
export class AppModule { }
