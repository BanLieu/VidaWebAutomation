import WaitHelper from "../../utils/WaitHelper";


class VidaCoachingMethodPage {
    visit() {
      cy.visit('https://www.vida.com/clients/onboarding/step/coaching-method-screen');
    }
  
    selectPersonalCoaching() {
        WaitHelper.waitForText("What type of coaching do you prefer?", {
            timeout: 30000,
            errorMessage: 'Coaching method page is not loading'
        })
      cy.contains('div, button, label', 'Personal Coaching').click();
    }
  
  }
  export default VidaCoachingMethodPage