import { FrontedPage } from './app.po';

describe('fronted App', () => {
  let page: FrontedPage;

  beforeEach(() => {
    page = new FrontedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
