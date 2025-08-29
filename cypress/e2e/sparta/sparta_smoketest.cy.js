import SpartaSmokeTestPage from '../../support/pages/sparta/SpartaSmokeTestPage';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Sparta Smoke Test with Page Object', () => {
    const spartaPage = new SpartaSmokeTestPage();
    const testEmail = 'mwl_prod_10test@vida.com';
    const testPassword = 'Vida123#';

    it('should perform complete smoke test using page object', () => {
        spartaPage.performSmokeTest(testEmail, testPassword);
    });

    it('should login, navigate tabs, and logout step by step', () => {
        // Step-by-step approach for better debugging
        spartaPage.visit();
        spartaPage.login(testEmail, testPassword);
        spartaPage.navigateToChatTab();
        spartaPage.clickTeamsListTitle();
        spartaPage.clickTeamsListTitle();
        spartaPage.verifyTeamsListTitle('My care teams');
        spartaPage.logout();
    });

    it('should verify login functionality', () => {
        spartaPage.visit()
            .enterEmail(testEmail)
            .enterPassword(testPassword)
            .clickSignIn();
        
        // Add verification that login was successful
        cy.url().should('include', '/clients/');
    });

    it('should verify chat tab navigation', () => {
        spartaPage.visit()
            .login(testEmail, testPassword)
            .navigateToChatTab();
        
        // Add verification that chat tab is active
        cy.get('[data-testid="teams-list-title"]').should('be.visible');
    });
}); 