//import CoachLoginPage from '../../support/pages/CoachLoginPage';
import coachingHomePage from '../../support/pages/delphi/CoachingHomePage';
import loginPage from '../../support/pages/delphi/LoginPage';

describe('Coach Login and Chat Verification', () => {
   // const loginPage = new LoginPage();
   // const coachingHomePage = new CoachingHomePage();

    beforeEach(function() {
        // Load test data
        cy.fixture('coach/credentials.json').then((data) => {
            this.testData = data;
        });
    });

    it('should login and verify chat message', function() {
        // Login
        loginPage.visit()
            .login(this.testData.email, this.testData.password);

        // Navigate to chat and verify message
        coachingHomePage.clickUnreviewedMessage();
        cy.wait(1000); // Wait for chat to load
        
        coachingHomePage.tapAvatarIcon();
        cy.wait(3000); // Wait for messages to load

        
    });

    it('should login with invalid credentials', function() {
        loginPage.visit()
            .login('invalid@email.com', 'wrongpassword');
        // Add error validation here
        cy.get(':nth-child(3) > .errorlist', { timeout: 10000 }).should('have.text', 'Please enter a correct email and password. Note that both fields may be case-sensitive.');
    });
});