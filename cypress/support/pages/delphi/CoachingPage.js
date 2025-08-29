class CoachingPage {
    constructor() {
        this.url = 'https://www.vida.com/coaching/';
        this.emailField = '[data-testid="email_input"]';
        this.passwordField = '[data-testid="password_input"]';
        this.signInButton = '[data-testid="sign_in_button"]';
        this.recentlyAddedButton = '[data-testid="groupMenuDisplayText-RecentlyAdded"]';
        this.unreviewedMessagesButton = '[data-testid="groupMenuDisplayText-UnreviewedMessages"]';
        this.nameDisplay = '._nameDisplay_vw4r9_14';
        this.logoutButton = '[data-testid="user-menu-logout"]';
    }

    visit() {
        cy.visit(this.url);
        return this;
    }

    enterEmail(email) {
        cy.get(this.emailField).clear().type(email);
        return this;
    }

    enterPassword(password) {
        cy.get(this.passwordField).clear().type(password);
        return this;
    }

    clickSignIn() {
        cy.get(this.signInButton).click();
        cy.get('[data-testid="groupMenuDisplayText-RecentlyAdded"]', { timeout: 10000 }).should('be.visible');
        return this;
    }

    clickRecentlyAdded() {
        cy.get(this.recentlyAddedButton).click();
        return this;
    }

    clickUnreviewedMessages() {
        cy.get(this.unreviewedMessagesButton).click();
        return this;
    }



    clickNameDisplay() {
        cy.get('body').then(($body) => {
            if ($body.find(this.nameDisplay).length > 0) {
                cy.get(this.nameDisplay).click();
            } else {
                cy.log('Name display element not found, continuing...');
            }
        });
        return this;
    }

    clickLogout() {
        cy.get(this.logoutButton).click();
        return this;
    }

    fullCoachingFlow(email, password) {
        this.visit()
            .enterEmail(email)
            .enterPassword(password)
            .clickSignIn()
            .clickRecentlyAdded()
            .clickUnreviewedMessages()
            .clickNameDisplay()
            .clickLogout();
        return this;
    }
}
//export default CoachingPage
export default new CoachingPage();