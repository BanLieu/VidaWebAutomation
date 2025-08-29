import WaitHelper from "../../utils/WaitHelper";

export class VidaCoachMatchingPage {
    visit() {
      cy.visit('https://www.vida.com/clients/onboarding/step/coach-matching');
    }
  
    checkTitle(myTitle){
        cy.wait(5000);
        cy.contains(myTitle).should('be.visible'); 
      }
      submit() {
        cy.contains('button', 'Continue', { timeout: 5000 })
        .should('be.visible')
        .and('not.be.disabled')
        .click();
    }

    selectCoach(coach) {
      WaitHelper.waitForText("Select your Health Expert");
      //this.checkTitle('Select your Health Expert');
      cy.contains('div, label, button', coach).click();
      this.submit();
    }
  }
  export default VidaCoachMatchingPage