import { CurrencyConverterPage } from './currency-converter.po';

describe('CurrencyConverterPageTests', () => {
  let page: CurrencyConverterPage;

  beforeEach(() => {
    page = new CurrencyConverterPage();
    page.navigateTo();
  });

  it("should prefill the base currency form control", () => {
    const baseVal = page.getBaseCurrency().getAttribute("value");
    expect(baseVal).not.toBeNull();
  });

  it("should prefill the target currency form control", () => {
    const targetVal = page.getTargetCurrency().getAttribute("value");
    expect(targetVal).not.toBeNull();
  });

  it("should not prefill the amount form control", () => {
    const amountVal = page.getCurrencyAmount().getAttribute("value");
    expect(amountVal).toBe("");
  });

  it("should render a list of exchange rates", () => {
    const rates = page.getExchangeRateList();
    expect(rates.isPresent()).toBeTruthy();
  });

  it("should not render any conversion yet", () => {
    const conversion = page.getConversion();
    expect(conversion.isPresent()).toBeFalsy();
  });

  it("should have the submit button disabled", () => {
    const btn = page.getSubmitButton();
    expect(btn.isEnabled()).toBeFalsy();
  });

  describe("when there is valid input inside the amount control", () => {
    beforeEach(() => {
      page.getCurrencyAmount().sendKeys(5);
    });

    it("should mark the form as valid", () => {
      const formClass = page.getCurrencyExchangeForm().getAttribute("class");
      expect(formClass).toContain("ng-valid");
    });

    it("should enable the button", () => {
      const button = page.getSubmitButton();
      expect(button.isEnabled).toBeTruthy();
    });

    describe("and the form is submitted", () => {
      beforeEach(() => {
        page.getSubmitButton().click();
      });

      it("should render a conversion", () => {
        const conversion = page.getConversion();
        expect(conversion.isPresent()).toBeTruthy();
      });
    });
  });
});
