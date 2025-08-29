class EmailGenerator {
    static {
        // Static initialization
        this.counter = 0;
        this.baseEmail = 'abcsparta';
        this.domain = 'test@vida.com';
        this.email = null;
    }

    // Generate unique email
    static generateEmail() {
        const timestamp = new Date().getTime();
        const random = Math.random().toString(36).substring(2, 8);
        this.email = `${this.baseEmail}+${random}+${this.domain}`;
        return this.email;
    }

    // Get the last generated email
    static getCurrentEmail() {
        return this.email;
        //return this.lastGeneratedEmail;
    }

    // Generate email with custom prefix
    static generateCustomEmail(prefix) {
        const timestamp = new Date().getTime();
        const random = Math.random().toString(36).substring(2, 8);
        const email = `${prefix}${timestamp}_${random}${this.domain}`;
        this.lastGeneratedEmail = email;
        return email;
    }
}

export default EmailGenerator;