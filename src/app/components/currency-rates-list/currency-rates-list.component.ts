import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ExchangeRates } from '../../models/currency.model';

@Component({
  selector: 'cc-rates-list',
  templateUrl: './currency-rates-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyRatesListComponent {
  @Input() rates: ExchangeRates;
}
