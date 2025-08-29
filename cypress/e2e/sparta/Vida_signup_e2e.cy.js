//#region import

import VidaSignupPage from '../../support/pages/sparta/VidaSignupPage';
import VidaProfilePage from '../../support/pages/sparta/VidaProfilePage';
import VidaCompanySearchPage from '../../support/pages/sparta/VidaCompanySearchPage';
import VidaHealthConditionsPage from '../../support/pages/sparta/VidaHealthConditionsPage';
import VidaHealthGoalsPage  from '../../support/pages/sparta/VidaHealthGoalsPage';
import VidaAOMScreenersPage from '../../support/pages/sparta/VidaAOMScreenerPage';
import VidaStateSelectionPage from '../../support/pages/sparta/VidaStateSelectionPage';
import VidaPreDiabetesScreenPage from '../../support/pages/sparta/VidaPreDiabetesScreenPage';
import VidaPhqGadQuestionnairePage  from '../../support/pages/sparta/VidaPhqQuestionnairePage';
import VidaProgramMatchingPage from '../../support/pages/sparta/VidaProgramMatchingPage';
import VidaCoachingMethodPage from '../../support/pages/sparta/VidaCoachingMethodPage';
import VidaProgramReviewPage from '../../support/pages/sparta/VidaProgramReviewPage';
import VidaCoachMatchingPage  from '../../support/pages/sparta/VidaCoachMatchingPage';
import VidaCoachAvailabilityPage from '../../support/pages/sparta/VidaCoachAvailability';
import LoginPage from '../../support/pages/delphi/LoginPage';
import DashboardPage from '../../support/pages/delphi/DashboardPage';
import CoachingHomePage from '../../support/pages/delphi/CoachingHomePage';
import ClientLoginPage from '../../support/pages/sparta/ClientLoginPage';


import Utility from '../../support/utils/Utility';
import EmailGenerator from '../../support/utils/EmailGenerator';
import UserManager from '../../support/utils/UserManager';

//#endregion

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


describe('End to End Testing - Page Object Model', () => {
  //#region object pages
   const signupPage = new VidaSignupPage();
   const utility = new Utility();
   const profilePage = new VidaProfilePage();
   const companySearchPage = new VidaCompanySearchPage();
   const healthConditionsPage = new VidaHealthConditionsPage();
   const healthGoalsPage = new VidaHealthGoalsPage();
   const aomScreenersPage = new VidaAOMScreenersPage();
   const stateSelectionPage = new VidaStateSelectionPage();
   const preDiabetesScreenPage = new VidaPreDiabetesScreenPage();
   const phqPage = new VidaPhqGadQuestionnairePage();
   const programPage = new VidaProgramMatchingPage();
   const coachingPage = new VidaCoachingMethodPage();
   const reviewPage = new VidaProgramReviewPage();
   const coachPage = new VidaCoachMatchingPage();
   const availabilityPage = new VidaCoachAvailabilityPage();
   //const loginPage = new LoginPage();
   const dashboardPage = new DashboardPage();
   //const coachingHomePage = new CoachingHomePage();
   const clientLoginPage = new ClientLoginPage(); 
 
   //#endregion

   let testData;
   //const randomEmail = emailGenerator.generateEmail();
   const random = Math.random().toString(36).substring(2, 8);
   const randomEmail = `Sparta+${random}+test@vida.com`;
   EmailGenerator.generateEmail();
   var nemberName;
   var testEmail = EmailGenerator.getCurrentEmail();
   let message;

   before(() => {
    // Generate email once before all tests
    //EmailGenerator.generateEmail();
    //testEmail = EmailGenerator.getCurrentEmail();
    //cy.log(`Email from before: ${testEmail}`);
    UserManager.initializeUser();
    cy.log(`Test suite will use email: ${UserManager.getEmail()}`);
    });

   beforeEach(function() {
      cy.fixture('sparta/onboarding').then(function (data) {
        this.data = data;
        //this.testEmail = EmailGenerator.getCurrentEmail();
        //cy.log(`Generated email: ${this.testEmail}`);
      });
    });

    after(() => {
      //clean up after all tests
      UserManager.clearUser();
    })
  
  it('should create an account from Web', function() {
    this.data = {
      ...this.data.common
    }
    const email = UserManager.getEmail();
    cy.log(`Sparta with email: ${email}`);
    //fill up the first page
    //const spartaEmail = EmailGenerator.getCurrentEmail();
    //cy.log(`Sparta email: ${randomEmail}`);
    //let testEmail = EmailGenerator.getCurrentEmail();
    
    nemberName=signupPage.signup(email);
    //create a profile 
    profilePage.createProfile();
    //search company
    companySearchPage.searchCompany(this.data.organization, this.data.inviteCode);
    //select health conditions
    healthConditionsPage.selectCondition(this.data.physicalConditions[1]);
    //select goals
    healthGoalsPage.selectHealthGoal(this.data.healthGoals);
    //select AOM screener
    aomScreenersPage.selectAOMScreenersNo();
    //select state
    stateSelectionPage.selectState(this.data.state);
    //prediabetes screener
    preDiabetesScreenPage.selectPreDiabetesScreener();
    //phq questionnaire
    phqPage.completeAllQuestions();
    //select program
    //programPage.selectProgram(this.data.selectProgram);
    programPage.selectFirstProgramCard();
    //programPage.joinProgram();
    //select personal coach
    //coachingPage.selectPersonalCoaching();
    //join program
    reviewPage.joinProgram();
    //select coach
    coachPage.selectCoach(this.data.coach);
    //skip scheduling and instroduction
    availabilityPage.skipSchedulingAndIntroduction();
    //verify successfully onboarding.
    signupPage.checkTitle('Access your care team and plan in the app');
    
  });

  it('log onto Sparta and send a message to coach', function(){
    //log onto Sparta with this new account and send a message to coach
    const email = UserManager.getEmail();
    cy.log(`Login with email: ${email}`);
    message = `This is a testing message from ${nemberName}`
    clientLoginPage.signIn(email, 'Vida123#', message);
    
  });

  it('log onto Provider dash and search for this new message', function(){
    testData = {
      ...this.data.delphi
    }
    
    //login provider dashboard
    LoginPage.visit();
    LoginPage.login(testData.delphiEmail, testData.delphiPassword);
    //tap on recently added
    CoachingHomePage.clickUnreviewedMessage();

    cy.log("Member message: " + message);
    CoachingHomePage.tapAvatarIcon();
    CoachingHomePage.verifyTextareaContent(message);
    //to remove Unreviewed message
    CoachingHomePage.clickRecentlyAdded();
     //search for new account
    //coachingHomePage.searchForName(nemberName);
    
  });
});
