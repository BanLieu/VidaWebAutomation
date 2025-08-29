import WaitHelper from "../../utils/WaitHelper";

class SpartaSmokeTestPage {
    constructor() {
        this.url = 'https://www.vida.com/clients/';
        this.emailField = '[data-testid="email_input"]';
        this.passwordField = '[data-testid="password_input"]';
        this.signInButton = '[data-testid="sign_in_button"]';
        this.chatTab = '.css-u0jrlp > [data-testid="NavTabsContainerMenu"] > .MuiTabs-scroller > .MuiTabs-flexContainer > :nth-child(2)';
        this.teamsListTitle = '[data-testid="teams-list-title"]';
        this.avatarMedium = '.avatar-medium';
        this.logoutLink = '[href="/accounts/logout/"] > .MuiMenuItem-root';
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
        return this;
    }

    login(email, password) {
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickSignIn();
        return this;
    }

    navigateToChatTab() {
        cy.get(this.chatTab).click();
        return this;
    }

    clickTeamsListTitle() {
        cy.get(this.teamsListTitle).click();
        return this;
    }

    verifyTeamsListTitle(expectedText) {
        cy.get(this.teamsListTitle).should('have.text', expectedText);
        return this;
    }

    clickAvatar() {
        cy.get(this.avatarMedium).click();
        return this;
    }

    clickLogout() {
        cy.get(this.logoutLink).click();
        return this;
    }

    logout() {
        this.clickAvatar();
        this.clickLogout();
        return this;
    }

    // Complete smoke test flow
    performSmokeTest(email, password) {
        this.visit()
            .login(email, password)
            .navigateToChatTab()
            .clickTeamsListTitle()
            .clickTeamsListTitle()
            .verifyTeamsListTitle('My care teams')
            .logout();
        return this;
    }
}

export default new SpartaSmokeTestPage(); 