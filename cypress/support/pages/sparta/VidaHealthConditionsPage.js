class VidaHealthConditionsPage {
    visit() {
      cy.visit('https://www.vida.com/clients/onboarding/step/health-conditions');
    }
  
    selectRandomCondition(condition) {
      cy.contains('div, label, button', condition).click();
    }

    submit() {
        cy.contains('button', 'Continue')
        .should('be.visible')
        .and('not.be.disabled')
        .click();
    }

    selectCondition(condition){
        this.selectRandomCondition(condition);
        this.submit();
    }
    


}
export default VidaHealthConditionsPage