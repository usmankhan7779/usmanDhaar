import { browser, by, element } from 'protractor';

<<<<<<< HEAD
export class AppPage {
=======
export class DhaarFrontPage {
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
