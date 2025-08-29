import WaitHelper from "../../utils/WaitHelper";

class VidaCoachAvailabilityPage {
    visit() {
      cy.visit('https://www.vida.com/clients/onboarding/step/coach-availability');
    }
  
    selectTomorrow() {
      cy.contains('button, div', 'Tomorrow').click();
    }
    skipForNow() {
        WaitHelper.waitForText('Skip for now',{
            timeout: 30000,
            ErrorMessage: 'Not Found Skip for now'
        });
        cy.contains('button, div', 'Skip for now').click();
    }

    selectAnyTimeSlot() {
      cy.get('[role="button"], div')
        .contains(/(am|pm)/i) // match time-like text
        .first()
        .click();
    }
  
    clickContinue() {
        WaitHelper.waitForText('Continue',{
            timeout: 30000,
            ErrorMessage: 'Not found continue button'
        });
        cy.contains('button, a, div', 'Continue').click();
      }

    selectAnyTimeTomorrow(){
        this.selectTomorrow();
        this.selectAnyTimeSlot();
    }
    skipSchedulingAndIntroduction(){
        this.skipForNow();
        this.clickContinue();
        this.skipForNow();
        
    }
  }
  export default VidaCoachAvailabilityPage