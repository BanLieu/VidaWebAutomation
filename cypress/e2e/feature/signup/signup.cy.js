import { Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import { Before, After } from "@badeball/cypress-cucumber-preprocessor";
import VidaSignupPage from "../../../support/pages/sparta/VidaSignupPage";
import VidaProfilePage from '../../../support/pages/sparta/VidaProfilePage';
import UserManager from '../../../support/utils/UserManager';

var memberName;
var email;
var birthday;
var ssessionId;
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

Before(function() {
    cy.fixture('sparta/onboarding.json').then((data) => {
      this.testData = data;
    });
    UserManager.initializeUser();
    this.email = UserManager.getEmail();
    this.memberName = UserManager.getUserName();
    this.birthday = UserManager.getBirthday();
    cy.log(`Member name: ${this.memberName}`);
    cy.log(`Member email: ${this.email}`);
    cy.log(`Member birthday: ${this.birthday}`);
});

Given('I navigate to the signup page', function () {
    //VidaSignupPage.visit();
    cy.visit('/account-creation')
});

When('I enter random name, email address, birthday, password', function () {
    VidaSignupPage.enterFirstName(this.memberName);
    VidaSignupPage.enterLastName(this.memberName);
    VidaSignupPage.enterEmail(this.email);
    VidaSignupPage.enterPassword(UserManager.getPassword());
    VidaSignupPage.enterBirthday(this.birthday);
});

When('I check Terms of use', function(){
    VidaSignupPage.checkTermsAndConditionsAccepted();
});

When('I check Policies Agreement', function(){
    VidaSignupPage.checkInformedConsentAccepted();
});

When('I hit Continue button', function() {
    cy.get('body').then($body => {
      if ($body.find('button[type="submit"]').length > 0) {
        cy.get('button[type="submit"]:visible').first().click().debug();
        cy.wait(10000);
      }
      // Add more else ifs for other page objects as needed
      else {
        throw new Error('No Continue button found on the current page');
      }
    });
    
  });

Then('I should see {string}', function (expectedText) {
    cy.url().then(url => {
        cy.log(`Current URL: ${url}`);
      });
    cy.contains(expectedText, { timeout: 100000 }).should('be.visible');
    
     // Store session id after successful signup
  cy.getCookie('session_id').then((cookie) => {
    if (cookie) {
      this.sessionId = cookie.value;
    }
  });
  cy.wait(10000);
});


Given('I navigate to create your profile page', function(){
    if (this.sessionId) {
        cy.setCookie('session_id', this.sessionId);
      }
      //cy.visit('/clients/onboarding/step/create-profile');
    //VidaProfilePage.visit();
    
    cy.visit('/clients/onboarding/step/create-profile', {timeout: 30000});
    cy.get('body').should('not.be.empty');
    
});

When('I enter Height, Weight, Gender, Ethnicity',function(){
    VidaProfilePage.enterHeightFeet(5);
    VidaProfilePage.enterHeightInches(2);
    VidaProfilePage.enterWeight(100);
    VidaProfilePage.selectGender('Male');
    VidaProfilePage.selectEthnicity('Asian American');
    VidaProfilePage.submit();
});



