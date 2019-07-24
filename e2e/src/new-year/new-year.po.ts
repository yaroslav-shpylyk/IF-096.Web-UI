import { browser, element, by, ElementFinder, protractor, ElementArrayFinder } from 'protractor';
import { LoginPage } from '../login/login.po';

export class NewYearPage {
  loginPage = new LoginPage();

  navigateTo() {
    return browser.get('#/admin-panel/new-year-transition') as Promise<string>;
  }

  getElement(selector: string): ElementFinder {
    return element(by.css(selector));
  }

  getElementText(selector: string) {
    return this.getElement(selector).getText() as Promise<string>;
  }

  showStatistic(): void {
    this.getElement('div.statistic').click();
  }

  showClassList(): void {
    element.all(by.css('div.class-info')).get(0).click();
  }

  getAllClassCards(): ElementArrayFinder {
    return element.all(by.css('app-class-card'));
  }

  lockClassCard(card: ElementFinder): void {
    card.element(by.css('div.class-lock')).click();
  }

  setNewClassTitle(title: string) {
    const editLocker = element.all(by.css('div.class-edit-title label')).get(0);
    editLocker.click();
    const inputField = element.all(by.css('input.new-class-name')).get(0);
    inputField.sendKeys(title);
    editLocker.click();
  }

  checkNonEmptyClassesFilter() {
    element(by.css('label[for=toggle-1]')).click();
    browser.sleep(1000);
    element(by.css('mat-checkbox')).click();
  }

  waitForPage(callback) {
    const EC = protractor.ExpectedConditions;
    return browser.wait(EC.presenceOf(this.getElement('div.statistic')), 1000).then(
      result => {
        callback(result);
      }
    );
  }
}
