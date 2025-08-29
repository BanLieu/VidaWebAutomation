import HomeTabPage from '../../support/pages/sparta/HomeTabPage';
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  
describe('Home Tab Test', () => {
    it('should log in and navigate through the home tab', () => {
        HomeTabPage.visit();
        HomeTabPage.enterEmail('mwl_prod_10test@vida.com');
        HomeTabPage.enterPassword('Vida123#');
        HomeTabPage.clickSignIn();
        
        // Navigate through the home tab
        HomeTabPage.navigateToHomeTab();
        HomeTabPage.clickStylosButton();
        HomeTabPage.clickScheduleAppointment();
        HomeTabPage.closeStylosDialog();
        HomeTabPage.clickSeeAll();
        HomeTabPage.verifyPageHeader('To-Do List');
        HomeTabPage.closePage();
        HomeTabPage.clickAvatar();
        HomeTabPage.clickAssignmentIcon();
        HomeTabPage.closeModal();
    });
});