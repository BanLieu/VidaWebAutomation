import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { Before, After } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from '../../../support/pages/delphi/LoginPage';
import coachingHomePage from '../../../support/pages/delphi/CoachingHomePage';

Before(function() {
  cy.fixture('coach/credentials.json').then((data) => {
    this.testData = data;
  });
});

Given('I navigate to the login page', function () {
  LoginPage.visit();
});

When('I enter a valid username and password', function () {
  LoginPage.login(this.testData.email, this.testData.password);
});

When('I enter invalid username and password', function () {
  LoginPage.login(this.testData.invalidEmail, this.testData.invalidPassword);
});

When('I tap on Recently Added', function(){
  coachingHomePage.clickRecentlyAdded();

});

Then('I should see Key Information', function(){
  coachingHomePage.verifyText('Key Information');
})

Then('I should be logged in', function () {
  coachingHomePage.verifyText('Dashboard');
});

Then('I should not be able to log in successfully', function () {
  LoginPage.verifyLoginFailed();
});