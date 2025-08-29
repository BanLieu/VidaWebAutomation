class VidaHealthGoalsPage {
    visit() {
      cy.visit('https://www.vida.com/clients/onboarding/step/health-goals');
    }
  
    selectGoal(goal) {
      cy.contains('p[data-testid="primary-typography"]', goal)
      .closest('[data-testid="select-option"]')
      .click();
    }
  
    submit() {
        cy.contains('button', 'Continue')
        .should('be.visible')
        .and('not.be.disabled')
        .click();
    }

    selectHealthGoal(goal){
        this.selectGoal(goal);
        this.submit();
    
    }
  }
  export default VidaHealthGoalsPage