import coachDashboardPage from '../../support/pages/delphi/CoachDashboardPage';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Coach Dashboard Smoke Test', () => {
    
    beforeEach(function() {
        // Load test data from fixture if needed
        cy.fixture('coach/credentials.json').then((data) => {
            this.testData = data;
        });
    });

    it('should login and navigate through all menus step by step', function() {
       
        coachDashboardPage.visit()
            .login(this.testData.email, this.testData.password)
            .navigateAllMenus()
            .logout();
    });

    it('should verify individual menu navigation', function() {
        
        coachDashboardPage.visit()
            .login(this.testData.email, this.testData.password);

        // Test individual menu items
        coachDashboardPage.clickRecentlyAdded();
        cy.url().should('include', '/coaching/');

        coachDashboardPage.clickUnreviewedMessages();
        cy.url().should('include', '/coaching/');

        coachDashboardPage.clickFlagged();
        cy.url().should('include', '/coaching/');

        // Continue with other menu items...
        coachDashboardPage.logout();
    });

    it('should handle login functionality', function() {
     
        coachDashboardPage.visit()
            .enterEmail(this.testData.email)
            .enterPassword(this.testData.password)
            .clickSignIn();

        // Verify successful login
        cy.url().should('include', '/coaching/');
        cy.get('[data-testid="groupMenuDisplayText-RecentlyAdded"]').should('be.visible');
    });
});
