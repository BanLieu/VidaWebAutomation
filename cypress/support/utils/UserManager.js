class UserManager {
    static {
        this.userData = null;
    }

    static initializeUser() {
        if (!this.userData) {
            const random = Math.random().toString(36).substring(2, 8);
            const startYear = 1940;
            const endYear = 2005;
            this.userData = {
                email: `Sparta+${random}+test@vida.com`,
                password: `Vida123#`,
                timestamp: new Date().getTime(),
                birthDate: this.getRandomDate_MMDDYYYY(startYear, endYear),
                name: `ABCSparta${random}`
            };
            cy.log('Initialized user data:', this.userData);
        }
        return this.userData;
    }
    //This one does not work
    static generateRandomBirthday() {
        const today = new Date();
        const minAge = 18;
        const maxAge = 80;
        const age = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
        const birthDate = new Date(today.getFullYear() - age, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
        return birthDate.toLocaleDateString('en-US'); // MM/DD/YYYY
    }
    
    static getRandomDate_MMDDYYYY(startYear = 1940, endYear = 2005) {
        const start = new Date(`${startYear}-01-01`);
        const end = new Date(`${endYear}-12-31`);
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      
        const month = String(randomDate.getMonth() + 1).padStart(2, '0');
        const day = String(randomDate.getDate()).padStart(2, '0');
        const year = randomDate.getFullYear();
      
        return `${month}/${day}/${year}`;
    }
    static getBirthday(){
        return this.userData.birthDate;
    }

    static getUserName(){
        return this.userData.name;
    }
    
    static getEmail() {
        return this.userData.email;
    }

    static getPassword() {
        return this.userData.password ;
    }

    static clearUser() {
        this.userData = null;
    }
}

export default UserManager;