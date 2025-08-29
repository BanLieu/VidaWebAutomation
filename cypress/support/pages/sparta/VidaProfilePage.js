import WaitHelper from "../../utils/WaitHelper";

class VidaProfilePage {

    visit() {
      cy.visit('https://www.vida.com/clients/onboarding/step/create-profile');
    }
  
    enterHeightFeet(feet) {
      cy.get('input[name="feet"]').parent().click();
      cy.get('.MuiMenu-paper').contains(feet.toString()).click();
    }
  
    enterHeightInches(inches) {
      cy.get('input[name="inches"]').parent().click();
      cy.get('.MuiMenu-paper').contains(inches.toString()).click();
    }
  
    enterWeight(weight) {
      cy.get('input[name="weight"]').clear().type(weight);
    }
  
    selectGender(gender) {
      cy.get('#gender').click();
      cy.get('.MuiMenu-paper')
            .should('be.visible')
            .contains(gender)
            .click();
    }
  
    selectEthnicity(ethnicity) {
      cy.get('#ethnicity').click(); // assuming ethnicity dropdown has id="ethnicity"
      cy.get('.MuiMenu-paper')
            .should('be.visible')
            .contains(ethnicity)
            .click();
    }

    checkTitle(myTitle){
      cy.wait(5000);
      cy.contains(myTitle).should('be.visible'); 
    }
    
    submit() {
      cy.get('button[type="submit"]').click();
    }

    
     verifyProfilePage(){
       return WaitHelper.waitForText("Let's create your profile", {timeout: 30000, errMessage: "Profile page not load"});
     }
    createProfile(){
      //Fill up the profile details
      this.verifyProfilePage();
      this.enterHeightFeet(5);
      this.enterHeightInches(2);
      this.enterWeight(100);
      this.selectGender('Male');
      this.selectEthnicity('Asian American');
      this.submit();
    }
  }
  export default VidaProfilePage
  