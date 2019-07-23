import { LoginPage } from './login.po';
import { browser } from 'protractor';

describe('Login Page', () => {
  let page: LoginPage;

  const wrongCreds = { login: 'wrongName', password: 'wrongPassword' };

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });
  describe('Form validation', () => {
    it('empty login form should be invalid and submit button is disabled', () => {
      const formClasses = page.getLoginForm().getAttribute('class');
      expect(formClasses).toContain('ng-invalid');
      expect(page.getSubmitButton().isEnabled()).toBeFalsy();
    });

    it('the login form must be valid when fields are filled', () => {
      page.fillCredential(wrongCreds);
      const formClasses = page.getLoginForm().getAttribute('class');
      expect(formClasses).toContain('ng-valid');
    });
  });

  describe('Authentication', () => {
    it('when user trying to login with wrong credentials he should stay on “login” page', () => {
      page.fillCredential(wrongCreds);
      page.getSubmitButton().click();
      const formClasses = page.getLoginForm().getAttribute('class');
      expect(formClasses).toContain('ng-valid');
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/login');
    });

    it('when login is successful - browser should redirect to default "admin-panel" page', () => {
      page.loginAsAdmin();
      browser.ignoreSynchronization = true;
      browser.sleep(1000).then(
        () => expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/admin-panel')
      );
    });
  });
});

