import { DhaarFrontPage } from './app.po';

describe('dhaar-front App', () => {
  let page: DhaarFrontPage;

  beforeEach(() => {
    page = new DhaarFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
