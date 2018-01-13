<<<<<<< HEAD
import { AppPage } from './app.po';

describe('universal-demo-v5 App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
=======
import { DhaarFrontPage } from './app.po';

describe('dhaar-front App', () => {
  let page: DhaarFrontPage;

  beforeEach(() => {
    page = new DhaarFrontPage();
>>>>>>> e99eebff4fb93b30118a716514b7c1e302e551ef
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
