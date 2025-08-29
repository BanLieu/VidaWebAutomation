export class VidaStateSelectionPage {
    visit() {
      cy.visit('https://www.vida.com/clients/onboarding/step/assigned-screeners');
    }
  
    selectRandomState(state) {
        cy.contains('div, label, button', state).click();
    }
      
    checkTitle(myTitle){
        cy.contains(myTitle, { timeout: 50000 }).should('be.visible'); 
    }
     
    selectState(state){
        this.checkTitle('In which state do you currently reside?')
        this.selectRandomState(state);
    }
  }
  export default VidaStateSelectionPage