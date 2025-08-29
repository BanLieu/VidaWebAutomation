class DashboardPage {
    constructor() {
      this.userDashboard = '[data-testid="user-dashboard"]';
      this.coachingSection = '.coaching-section';
    }
  
    verifySuccessfulLogin() {
      cy.url().should('include', '/coaching/');
      cy.get(this.userDashboard).should('be.visible');
      return this;
    }
  }
  export default DashboardPage