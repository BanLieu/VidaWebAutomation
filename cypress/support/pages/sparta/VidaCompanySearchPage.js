import WaitHelper from "../../utils/WaitHelper";

class VidaCompanySearchPage {
    visit() {
      cy.visit('https://www.vida.com/clients/onboarding/step/company-search');
    }
  
    search(employerName) {
      cy.get('input[name="partnerOrg"]').type(employerName);
      // Wait for dropdown/autocomplete to populate and select match
      cy.get('li').contains(employerName).click();
    }
    enterInviteCode(code) {
        cy.get('input[name="value"]').type(code);
      }
    
     
    submit() {
        cy.contains('button', 'Continue', { timeout: 5000 })
        .should('be.visible')
        .and('not.be.disabled')
        .click();
    }

    verifySearchOrgPage(){
        WaitHelper.waitForText("Please enter the name of the company providing Vida for you");
    }
    searchCompany(company, inviteCode){
        this.verifySearchOrgPage();
        this.search(company);
        this.submit();
        this.enterInviteCode(inviteCode); //need to handle this
        this.submit();
        this.submit();
        cy.wait(10000);
    }
  }
  export default VidaCompanySearchPage