import { RoommateAppPage } from './app.po';

describe('roommate-app App', () => {
  let page: RoommateAppPage;

  beforeEach(() => {
    page = new RoommateAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
