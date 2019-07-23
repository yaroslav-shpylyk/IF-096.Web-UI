import { browser, by, element, ElementFinder } from 'protractor';

export interface Credentials {
  login: string;
  password: string;
}

export class LoginPage {
  navigateTo() {
    return browser.get('#/login');
  }

  getLoginForm() {
    return element(by.tagName('form'));
  }

  getLoginTextbox() {
    return element(by.css('input[formControlName=username]'));
  }
  getPasswordTextbox() {
    return element(by.css('input[formControlName=password]'));
  }

  getSubmitButton(): ElementFinder {
    return element(by.css('button[type="submit"]'));
  }

  fillCredential(credentials: Credentials) {
    this.getLoginTextbox().sendKeys(credentials.login);
    this.getPasswordTextbox().sendKeys(credentials.password);
  }

  loginAsAdmin() {
    this.fillCredential({ login: browser.params.login.email, password: browser.params.login.password });
    this.getSubmitButton().click();
  }
}
