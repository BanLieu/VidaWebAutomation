import WaitHelper from "../../utils/WaitHelper";

class CoachingHomePage {
    constructor() {
      this.url = 'https://www.vida.com/coaching/home';
      this.recentlyAddedTab = 'button:contains("Recently Added")';
      this.unreviewedMessage = '[data-testid="groupMenuDisplayText-UnreviewedMessages"]';
      this.searchField = '#userGroupSearch';
      this.searchResults = '.search-results';
      this.textMessage ='[data-testid="message-text-inner-wrapper"] div p';
      this.avatar = '.css-19o1dzz > .avatar-small';
    }
  
    visit() {
      cy.visit(this.url);
      cy.get('body').should('be.visible');
      return this;
    }
    
    clickUnreviewedMessage(){
      WaitHelper.waitForText('Unreviewed Messages',{
        timeout: 30000,
        errorMessage: 'Not found Unreviewed Messages'
      })
      cy.contains('Unreviewed Messages').click();
    }

    clickRecentlyAdded() {
      WaitHelper.waitForText('Recently Added', {
        timeout: 30000,
        errorMessage: 'Not found Recently Added'
      })
      cy.contains('Recently Added').click();
      return this;
    }
  
    searchForName(firstName) {
      cy.get(this.searchField).type(firstName);
      return this;
    }
  
    verifySearchResults(firstName) {
      cy.contains(firstName).should('be.visible');
      return this;
    }

    tapAvatarIcon(){
      cy.get('body').then(($body) => {
        if ($body.find(this.avatar).length > 0) {
          cy.get(this.avatar).click({ force: true });
          cy.log('Avatar icon found and clicked');
        } else {
          cy.log('Avatar icon not found, skipping click');
        }
      });
      return this;
    }
    verifyTextareaContent(expectedText) {
      WaitHelper.waitForElement(this.textMessage, {
        timeout: 10000,
        errorMessage: "Text message not found."
      })
      cy.get(this.textMessage)
          .should('be.visible')
          .and('have.text', expectedText);
      return this;
    }
    getChatMessage() {
      cy.wait(10000);
      return cy.get('[data-testid="message-text-inner-wrapper"] div p')
        .find('.str-chat__message')
        .should('be.visible');
    }
    verifyMessageContent(expectedText) {
      this.getChatMessage()
        .invoke('text')
        .should('include', expectedText);
    }

    verifyText(name){
      WaitHelper.waitForText(name, {
        timeout: 30000,
        errorMessage:  name + 'Not found'
      })
      cy.contains(name).should('be.visible');
      return this;
    }

  }
  export default new CoachingHomePage();