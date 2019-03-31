import { Component, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Conversion } from '../../models/currency.model';

@Component({
  selector: 'cc-conversion',
  templateUrl: './conversion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversionComponent {
  @Input() conversion: Conversion;
}
