import WaitHelper from "../../utils/WaitHelper";

class CoachDashboardPage {
    constructor() {
        this.url = 'https://www.vida.com/accounts/login/?next=/coaching/';
        this.emailField = '[data-testid="email_input"]';
        this.passwordField = '[data-testid="password_input"]';
        this.signInButton = '[data-testid="sign_in_button"]';
        
        // Menu navigation selectors
        this.recentlyAddedMenu = '[data-testid="groupMenuDisplayText-RecentlyAdded"]';
        this.unreviewedMessagesMenu = '[data-testid="groupMenuDisplayText-UnreviewedMessages"]';
        this.flaggedMenu = '[data-testid="groupMenuDisplayText-Flagged"]';
        this.providerEngagedMenu = '[data-testid="groupMenuDisplayText-ProviderEngaged"]';
        this.appEngagedMenu = '[data-testid="groupMenuDisplayText-AppEngaged"]';
        this.recentlyConsultedMenu = '[data-testid="groupMenuDisplayText-RecentlyConsulted"]';
        this.engagementMenu = '[data-testid="groupMenuDisplayText-Engagement"]';
        this.submenuActive = '.ant-menu-submenu-active > .ant-menu-submenu-title > .ant-menu-title-content';
        this.banGroupOldChatMenu = '[data-testid="groupMenuDisplayText-BanGroupwitholdChat"]';
        this.streamSocialGroupMenu = '[data-testid="groupMenuDisplayText-StreamSocialGroup"]';
        this.banGroupMenu = '[data-testid="groupMenuDisplayText-BanGroup"]';
        this.banGroupTestStreamMenu = '[data-testid="groupMenuDisplayText-BanGroupTestStream"]';
        
        // User actions
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
        // Wait for dashboard to load
        cy.get(this.recentlyAddedMenu, { timeout: 10000 }).should('be.visible');
        return this;
    }

    login(email, password) {
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickSignIn();
        return this;
    }

    // Navigation methods
    clickRecentlyAdded() {
        cy.get(this.recentlyAddedMenu, { timeout: 10000 }).scrollIntoView().should('be.visible').click();
        cy.wait(5000);
        return this;
    }

    clickUnreviewedMessages() {
        cy.get(this.unreviewedMessagesMenu, { timeout: 10000 }).scrollIntoView().should('be.visible').click();
        cy.wait(5000);
        return this;
    }

    clickFlagged() {
        cy.get(this.flaggedMenu, { timeout: 10000 }).scrollIntoView().should('be.visible').click();
        cy.wait(5000);
        return this;
    }

    clickProviderEngaged() {
        cy.get(this.providerEngagedMenu, { timeout: 10000 }).scrollIntoView().should('be.visible').click();
        cy.wait(5000);
        return this;
    }

    clickAppEngaged() {
        cy.get(this.appEngagedMenu, { timeout: 10000 }).scrollIntoView().should('be.visible').click();
        cy.wait(5000);
        return this;
    }

    clickRecentlyConsulted() {
        cy.get(this.recentlyConsultedMenu, { timeout: 10000 }).scrollIntoView().should('be.visible').click();
        cy.wait(5000);
        return this;
    }

    clickEngagement() {
        cy.get(this.engagementMenu, { timeout: 10000 }).scrollIntoView().should('be.visible').click();
        cy.wait(5000);
        return this;
    }

    clickSubmenuActive() {
        cy.get(this.submenuActive, { timeout: 10000 }).scrollIntoView().should('be.visible').click();
        return this;
    }

    clickBanGroupOldChat() {
        cy.get(this.banGroupOldChatMenu, { timeout: 10000 }).scrollIntoView().should('be.visible').click();
        return this;
    }

    clickStreamSocialGroup() {  
        cy.get(this.streamSocialGroupMenu, { timeout: 10000 }).scrollIntoView().should('be.visible').click();
        return this;
    }

    clickBanGroup() {
        cy.get(this.banGroupMenu, { timeout: 10000 }).scrollIntoView().should('be.visible').click();
        return this;
    }

    clickBanGroupTestStream() {
        cy.get(this.banGroupTestStreamMenu, { timeout: 10000 }).scrollIntoView().should('be.visible').click();
        return this;
    }

    clickNameDisplay() {
        cy.get('body').then(($body) => {
            if ($body.find(this.nameDisplay).length > 0) {
                cy.get(this.nameDisplay).click();
                cy.log('Name display clicked');
            } else {
                cy.log('Name display not found, skipping click');
            }
        });
        return this;
    }

    clickLogout() {
        cy.get(this.logoutButton).click();
        return this;
    }

    logout() {
        this.clickNameDisplay();
        this.clickLogout();
        return this;
    }

    scrollLeftPanelToBottom(){
        // Try multiple possible selectors for the left panel scroll container
        cy.get('body').then(($body) => {
            // Log what we find for debugging
            cy.log('Looking for left panel scroll container...');
            
            // Try the selector from template file (missing 's')
            if ($body.find('._scrollContainer_150h5_40').length > 0) {
                cy.get('._scrollContainer_150h5_40').scrollTo('bottom');
                cy.log('Found and scrolled _scrollContainer_150h5_40');
                return;
            }
        });
        
        // Add a small wait to ensure scrolling completes
        cy.wait(1000);
        return this;
    }
    // Complete dashboard navigation flow
    navigateAllMenus() {
        this.clickRecentlyAdded()
            .clickUnreviewedMessages()
            .clickFlagged()
            .clickProviderEngaged()
            .clickAppEngaged()
            .clickRecentlyConsulted()
            .clickEngagement()
            .scrollLeftPanelToBottom()
            .clickBanGroupOldChat()
            .clickStreamSocialGroup()
            .clickBanGroup()
            .clickBanGroupTestStream();
        return this;
    }

    // Complete test flow
    performCompleteTest(email, password) {
        this.visit()
            .login(email, password)
            .navigateAllMenus()
            .logout();
        return this;
    }
}

export default new CoachDashboardPage();
