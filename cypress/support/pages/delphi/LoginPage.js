class LoginPage {
    constructor() {
      this.url = 'https://www.vida.com/accounts/login/?next=/coaching/';
      this.emailField = 'input[type="email"]';
      this.passwordField = 'input[type="password"]';
      this.submitButton = '[data-testid="sign_in_button"]';
    }
  
    visit() {
      cy.visit(this.url);
      return this;
    }
  
    typeEmail(email) {
      cy.get(this.emailField).type(email);
      return this;
    }
  
    typePassword(password) {
      cy.get(this.passwordField).type(password);
      return this;
    }
  
    submit() {
      cy.get(this.submitButton).click();
      return this;
    }
  
    login(email, password) {
      this.typeEmail(email);
      this.typePassword(password);
      this.submit();
      return this;
    }
  
    verifyLoginFailed() {
      cy.wait(10000);
      cy.contains('Please enter a correct email and password. Note that both fields may be case-sensitive.').should('be.visible');
    }
  }
  export default new LoginPage();