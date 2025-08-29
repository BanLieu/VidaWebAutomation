import coachingPage from '../../support/pages/delphi/CoachingPage';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Sparta Coaching Smoke Test', () => {
    
    beforeEach(function() {
        // Load test data
        cy.fixture('coach/credentials.json').then((data) => {
            this.testData = data;
        });
    });

    it('should login, navigate coaching tabs, and logout', function() {
        coachingPage.fullCoachingFlow(this.testData.email, this.testData.password);
    });

    it('should login and logout step by step', function() {
        coachingPage.visit();
        coachingPage.enterEmail(this.testData.email);
        coachingPage.enterPassword(this.testData.password);
        coachingPage.clickSignIn();
        coachingPage.clickRecentlyAdded();
        coachingPage.clickUnreviewedMessages();
        coachingPage.clickNameDisplay();
        coachingPage.clickLogout();
    });
}); 