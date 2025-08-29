import WaitHelper from "../../utils/WaitHelper";    

class ClientLoginPage {
    constructor() {
      //this.url = 'https://vida.com/accounts/login/?next=/clients/';
      this.url = 'https://vida.com/';
      
      this.emailField = '[data-testid="email_input"]';
      this.passwordField = '[data-testid="password_input"]';
      this.signInButton = '[data-testid="sign_in_button"]';
      this.vidaPersonIcon = '[data-testid="PersonIcon"]';
      this.messageInput = 'textarea[placeholder="Type a message..."]';
      this.sendButton = '[data-testid="StylesButton"]';
    }
  
    visit() {
      cy.visit(this.url);
      return this;
    }
    

    request(){
      cy.request(this.url);
      return this;
    }
    typeEmail(email) {
        WaitHelper.waitForText('Welcome back', {
            timeout: 30000,
            errorMessage: 'Sparta is not loading'
        })
      cy.get(this.emailField).clear().type(email);
      return this;
    }
  
    typePassword(password) {
      cy.get(this.passwordField).clear().type(password);
      return this;
    }
    
    tapVidaPersonIcon(){
        cy.get(this.vidaPersonIcon).click();
    }

    clickSignIn() {
      cy.get(this.signInButton).click();
      WaitHelper.waitForText('Featured',{
        timeout: 30000,
        errorMessage: 'Sparta home page not found'
      })
      return this;
    }
  /*
    signIn(myEmail, password) {
      cy.origin('https://vida.com/', () => {
        cy.visit('accounts/login/?next=/clients/');
        return this;
      })
      
      this.typeEmail(myEmail);
      this.typePassword(password);
      this.clickSignIn();
      return this;
    }
    */
    signIn(myEmail, password, message) {
      // Log the values for debugging
      cy.log(`Attempting to sign in with email: ${myEmail}`);
      
      cy.origin('https://vida.com', { args: { myEmail, password, message } }, 
          ({ myEmail, password, message }) => {
              // Visit the login page
              cy.visit('/accounts/login/?next=/clients/');
              
              // Type email
              cy.get('input[type="email"]')
                  .should('be.visible')
                  .clear()
                  .type(myEmail);

              // Type password
              cy.get('input[type="password"]')
                  .should('be.visible')
                  .clear()
                  .type(password);

              // Click sign in button
              cy.get('[data-testid="sign_in_button"]')
                  .should('be.visible')
                  .click();
              cy.wait(10000);
              //tap on Chat button
              cy.contains('button', 'Chat').click();
              
              //select coach
              cy.contains('Coach Ban').click();
              //send a message to coach
              cy.get('textarea[placeholder="Type a message..."]')
                  .clear()
                  .type(message);
              
                  //hit send button
              cy.contains('button', 'Send').click();
              cy.wait(5000);

          }


      );
      

      return this;
  }
    typeMessage(message) {
        cy.get(this.messageInput).clear().type(message);
        return this;
      }
    
      sendMessage() {
        cy.get(this.sendButton).click();
        return this;
      }
    
      verifyMessageSent(message) {
        // Adjust selector based on how sent messages appear in the UI
        cy.contains(message).should('be.visible');
        return this;
      }

    sendMessageTocoach(message){
      cy.wait(5000);
        this.typeMessage(message);
        this.sendMessage();
        return this;
    }
} export default ClientLoginPage