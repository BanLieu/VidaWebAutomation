import WaitHelper from "../../utils/WaitHelper";

export class VidaPhqGadQuestionnairePage {
    visit() {
      cy.visit('https://www.vida.com/clients/onboarding/step/phq-gad-questionnaire');
    }
  
    answerNotAtAll() {
      cy.contains('button, div, label', 'Not at all').click({force:true});
      cy.wait(2000);
    }
  
    checkTitle(myTitle){
        cy.wait(5000);
        cy.contains(myTitle).should('be.visible'); 
      }

    completeAllQuestions() {
        WaitHelper.waitForText("Wellness Survey");
        //this.checkTitle("Wellness Survey");
      // Do 6 iterations: answer + next
      for (let i = 0; i < 6; i++) {
        this.answerNotAtAll();
      }
      cy.wait(10000);
    }
  }
  export default VidaPhqGadQuestionnairePage