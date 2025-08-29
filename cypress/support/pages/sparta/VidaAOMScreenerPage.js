import WaitHelper from "../../utils/WaitHelper";

class VidaAOMScreenersPage{
    visit() {
    cy.visit('https://www.vida.com/clients/onboarding/step/assigned-screeners');
  }

  selectNo() {
    // "No" is likely a button or label with visible text
    cy.contains('button, div, label', /^No$/).click();
  }
  checkTitle(myTitle){
    cy.wait(5000);
    cy.contains(myTitle).should('be.visible'); 
  }

  selectAOMScreenersNo(){
    WaitHelper.waitForText("Do you currently take weight loss medicine?")
    this.selectNo();
  }
}
export default VidaAOMScreenersPage