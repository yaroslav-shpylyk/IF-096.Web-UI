import { NewYearPage } from './new-year.po';
import { browser, element, by } from 'protractor';

describe('New Education Year Page', () => {
  let page: NewYearPage;

  beforeEach(() => {
    page = new NewYearPage();
    page.navigateTo();
    browser.waitForAngular();

  });

  it('after navigating the page should have the correct title and active link in the menu', () => {
    const pageTitle = page.getElementText('app-new-year h2');
    const activeLinkText = page.getElementText('.mat-list-item.active .mat-list-item-content');
    expect(pageTitle).toEqual('Перехід на новий навчальний рік');
    expect(activeLinkText).toContain('Новий');
  });

  it('a message should be displayed when there are no classes to display', () => {
    page.waitForPage( isDataReceived => {
     if (isDataReceived) {
      const classCards = page.getAllClassCards();
      if ( classCards.all.length === 0 ) {
       const message = element(by.css('.container p'));
       expect(message.isPresent()).toBeTruthy();
       expect(message.getText()).toContain('Немає класів, що відповідають критеріям фільтру');
      }
     }
    });
  });

  describe('popup windows', () => {
    it('should display modal with statistic after click if data are recived from back or should display spiner', () => {
      page.waitForPage( dataRecived => {
        if (dataRecived) {
          page.showStatistic();
          const statisticWindow = page.getElement('app-statistics');
          expect(statisticWindow.isPresent()).toBeTruthy();
        } else {
          expect(page.getElement('mat-spinner').isPresent()).toBeTruthy();
        }
      });
    });

    it('should display popup window with class list', () => {
      page.waitForPage( isDataReceived => {
        if (isDataReceived) {
          const emptyClassFilter = element.all(by.css('div.checkbox-group input')).get(0);
          if (!emptyClassFilter.isSelected()) {
            page.checkNonEmptyClassesFilter();
          }
          page.showClassList();
          browser.sleep(1000);
          expect(page.getElement('app-list-popup').isPresent()).toBeTruthy();
        }
      });
    });
  });

  describe('validation', () => {
    it('sumbit button should be disabled when some card has invalid title', () => {
      page.waitForPage( isDataReceived => {
        if (isDataReceived) {
          const submitButton = element(by.css('button.submit'));
          page.setNewClassTitle('invalidValue');
          expect(submitButton.isEnabled()).toBeFalsy();
        }
      });
    });

    it('sumbit button should be disabled when all class cards are locked', () => {
      page.waitForPage( isDataReceived => {
        if (isDataReceived) {
          page.getAllClassCards().map(
            card => page.lockClassCard(card));
          const submitButton = element(by.css('button.submit'));
          expect(submitButton.isEnabled()).toBeFalsy();
         }
      });
    });
  });

});
