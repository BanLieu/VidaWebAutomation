class SpartaPage {
    visit() {
        cy.visit('https://www.vida.com/clients/home?branch_name=OOE-1458');
    }

    enterEmail(email) {
        cy.get('[data-testid="email_input"]').clear().type(email);
    }

    enterPassword(password) {
        cy.get('[data-testid="password_input"]').clear().type(password);
    }

    clickSignIn() {
        cy.get('[data-testid="sign_in_button"]').click();
    }

    navigateToHomeTab() {
        cy.get('.css-u0jrlp > [data-testid="NavTabsContainerMenu"] > .MuiTabs-scroller > .MuiTabs-flexContainer > .Mui-selected').click();
    }

    clickSeeAll() {
        cy.get('[data-testid="see-all-button"]').click();
    }

    closePage() {
        cy.get('[data-testid="page-close-action-button"] > [data-testid="CloseIcon"]').click();
    }

    clickStylosButton() {
        cy.get('.css-1cqw28c > .MuiButton-root').click();
    }

    navigateToChatTab() {
        cy.get('.css-u0jrlp > [data-testid="NavTabsContainerMenu"] > .MuiTabs-scroller > .MuiTabs-flexContainer > :nth-child(2)').click();
    }

    navigateToContentTab() {
        cy.get('.css-u0jrlp > [data-testid="NavTabsContainerMenu"] > .MuiTabs-scroller > .MuiTabs-flexContainer > :nth-child(3)').click();
    }

    navigateToJourneyTab() {
        cy.get('.css-u0jrlp > [data-testid="NavTabsContainerMenu"] > .MuiTabs-scroller > .MuiTabs-flexContainer > :nth-child(4)').click();
    }
}

export default new SpartaPage();