import WaitHelper from "../../utils/WaitHelper";

class VidaPreDiabetesScreenPage {
    visit() {
      cy.visit('https://www.vida.com/clients/onboarding/step/pre-diabetes-screen');
    }
  

    selectRandomSexAssignedAtBirth() {
      const options = ['Male', 'Female'];
      const random = Math.floor(Math.random() * options.length);
      cy.contains('div, button, label', options[random]).click();
      cy.wait(1000);
    }
  
    selectRandomFamilyHistory() {
        
        const options = ['Yes', 'No'];
        const random = Math.floor(Math.random() * options.length);
        WaitHelper.waitForText(options[random], {
            timeout: 30000,
            errorMessage: "Yes or No not loading."
        });
        cy.contains('div, button, label', options[random]).click({force:true});
        
    }
    
    verifyPreDiabetesScreener(){
        WaitHelper.waitForText('What is your sex assigned at birth?', {
            timeout: 30000,
            errorMessage: "PreDiabetes screen is not loading."
        });
    }
    selectPreDiabetesScreener(){
        this.verifyPreDiabetesScreener();
        this.selectRandomSexAssignedAtBirth();
        for ( let i = 0; i <4; i++){
            this.selectRandomFamilyHistory();
        }
        cy.wait(5000);
    }
  }

  export default VidaPreDiabetesScreenPage