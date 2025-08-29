import WaitHelper from "../../utils/WaitHelper";

class VidaProgramReviewPage {
    visit() {
      cy.visit('https://www.vida.com/clients/onboarding/step/full-choice-program-review-screen');
    }
    verifyProgramReviewPage(){
        WaitHelper.waitForText("Review your program details below", {
            timeout: 30000,
            errorMessage: "Program review page is not loading."
        });
    }
    joinProgram() {
      this.verifyProgramReviewPage();
      //cy.get('[data-testid="StylosButton"]').click();
      cy.contains('Join Program').click();
     
      cy.wait(5000);
    }
  }
  export default VidaProgramReviewPage