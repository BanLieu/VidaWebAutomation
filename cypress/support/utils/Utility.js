class Utility{

  visit(url) {
    let releaseBranch = Cypress.env('RELEASE_BRANCH');
    cy.log('Release Branch Name ->',Cypress.env('RELEASE_BRANCH'));
    cy.wait(1000)
    cy.window().then((win) => {
        win.sessionStorage.clear()
    });
    cy.clearCookies()
    cy.clearLocalStorage()
    if(releaseBranch) {
        url = url + "?branch_name=" + releaseBranch;
    } 
    cy.visit(url);
}
    generateRandomBirthday() {
        const today = new Date();
        const minAge = 18;
        const maxAge = 80;
        const age = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
        const birthDate = new Date(today.getFullYear() - age, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
        return birthDate.toLocaleDateString('en-US'); // MM/DD/YYYY
      }

      getRandomDate_MMDDYYYY(startYear = 1940, endYear = 2005) {
        const start = new Date(`${startYear}-01-01`);
        const end = new Date(`${endYear}-12-31`);
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      
        const month = String(randomDate.getMonth() + 1).padStart(2, '0');
        const day = String(randomDate.getDate()).padStart(2, '0');
        const year = randomDate.getFullYear();
      
        return `${month}/${day}/${year}`;
      }
} export default Utility