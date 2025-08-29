class VidaProgramMatchingPage {
    visit() {
      cy.visit('https://www.vida.com/clients/onboarding/step/program-matching');
    }
  
    selectFirstProgramCard() {
      // Select the first visible card or button-like element
      //cy.get('div[role="button"], button, label').first().click();
      cy.get('[data-testid="stacked-typography"]').first().click();
    }
    
    selectProgramRandomly(program){
        cy.contains('button, div, label', program).click();
    }

    selectProgram(program){
        cy.get('[data-testid="page-title"]', { timeout: 10000 }).
        contains("We found a program that is a great fit for you!")
          .should('be.visible');
        this.selectProgramRandomly(program);
    }

    joinProgram(){
      cy.get('[data-testid="page-title"]', { timeout: 10000 }).
      contains("We found a program that is a great fit for you!")
        .should('be.visible');
      cy.get('[data-testid="join-program"]').click();
    }

  }

export default VidaProgramMatchingPage