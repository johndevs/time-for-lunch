import { TimeForLunchPage } from './app.po';

describe('time-for-lunch App', function() {
  let page: TimeForLunchPage;

  beforeEach(() => {
    page = new TimeForLunchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
