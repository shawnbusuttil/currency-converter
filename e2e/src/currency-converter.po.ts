import { browser, by, element } from 'protractor';

export class CurrencyConverterPage {
  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  getCurrencyExchangeForm() {
    return element(by.css("form"))
  }

  getBaseCurrency() {
    return element(by.name('base'));
  }

  getTargetCurrency() {
    return element(by.name("target"));
  }

  getCurrencyAmount() {
    return element(by.name("amount"));
  }

  getExchangeRateList() {
    return element(by.css("cc-rates-list"));
  }

  getConversion() {
    return element(by.css("cc-conversion"));
  }

  getSubmitButton() {
    return element(by.css("button"));
  }
}
