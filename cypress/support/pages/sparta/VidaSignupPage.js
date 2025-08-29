 import Utility from "../../utils/Utility";
 import WaitHelper from "../../utils/WaitHelper";

 class VidaSignupPage {
  
  visit() {
    cy.visit('https://www.vida.com/clients/onboarding/step/account-creation');
    cy.wait(2000);
  }

  enterFirstName(name) {
    cy.get('input[name="firstName"]').type(name);
  }

  enterLastName(name) {
    cy.get('input[name="lastName"]').type(name);
  }

  enterEmail(email) {
    cy.get('input[name="email"]').type(email);
  }

  enterPassword(password) {
    cy.get('input[name="password"]').type(password);
  }

  enterBirthday(dateStr) {
    cy.get('input[name="dob"]').type(dateStr); // format: MM/DD/YYYY
  }
  checkTermsAndConditionsAccepted(){
    cy.get('input[id="termsAndConditionsAccepted"]').click();
  }

  checkInformedConsentAccepted(){
    cy.get('input[id="informedConsentAccepted"]').click();
  }
  checkTitle(myTitle){
    cy.wait(5000);
    cy.contains(myTitle).should('be.visible'); 
  }
  submit() {
    cy.get('button[type="submit"]').click();
  }

  signup (myEmail){
    const utility = new Utility();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const name = `ABCSparta${randomStr}`;
    const email = `user_${randomStr}+test@vida.com`;
    const password = `Vida123#`;
    const startYear = 1940;
    const endYear = 2005;
    const birthday = utility.getRandomDate_MMDDYYYY(startYear, endYear);
  
    this.visit();
    this.checkTitle("Let's set up your account");
    this.enterFirstName(name);
    this.enterLastName(name);
    this.enterEmail(myEmail);
    this.enterPassword(password);
    this.enterBirthday(birthday);
    this.checkTermsAndConditionsAccepted();
    this.checkInformedConsentAccepted();
    //cy.intercept('POST', '**/api/**').as('signupRequest'); 
    this.submit();
    cy.wait(15000);
    /*
    cy.wait('@signupRequest', { timeout: 50000 })
    .its('response.statusCode')
    .should('eq', 201);
    */
    return name;
  }
  
}

export default VidaSignupPage
  