class HomeTabPage {
    visit() {
        cy.visit('https://www.vida.com/clients/');
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

    clickStylosButton() {
        cy.get(':nth-child(1) > .MuiCardActions-root > [data-testid="StylosButton"]').click();
    }

    clickScheduleAppointment() {
        cy.get('[data-testid="schedule-appointment-button"]').click();
    }

    closeStylosDialog() {
        cy.get('[data-testid="StylosButton"] > [data-testid="CloseIcon"] > path').click();
    }

    clickSeeAll() {
        cy.get('[data-testid="see-all-button"]').click();
    }

    verifyPageHeader(title) {
        cy.get('.MuiContainer-root > [data-testid="page-header-title"]').should('have.text', title);
    }

    closePage() {
        cy.get('[data-testid="page-close-action-button"] > [data-testid="CloseIcon"]').click();
    }

    clickAvatar() {
        cy.get('.MuiAvatar-img').click();
    }

    clickAssignmentIcon() {
        cy.get('[data-testid="AssignmentOutlinedIcon"]').click();
    }

    closeModal() {
        cy.get('.ant-modal-close-x > .anticon > svg').click();
    }
}

export default new HomeTabPage();