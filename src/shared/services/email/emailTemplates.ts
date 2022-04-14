interface BaseEmail {
    subject: string
    body: string
}

export class WelcomeUserEmail implements BaseEmail {
    subject: string;
    body: string

    constructor(usernameOrEmail: string) {
        this.subject = `Welcome to Foodify!`
        this.body = 
        `
            Hi ${usernameOrEmail} 👋 Thanks for signing up. \b
            Now you have access to the best restaurants in your location.

            Don't sleep on it! Start ordering your favorite dishes <a href="#">now</a>
        `
    }
}

export class WelcomeVendorEmail implements BaseEmail {
    subject: string;
    body: string;

    constructor(firstname: string, lastname: string) {
        this.subject = `Congratulations on your approval to join Foodify as a vendor!`
        this.body = 
        `
            Hi ${firstname} ${lastname},\b
            Your request to be a vendor on Foodify was approved! Now you can create a restaurant account. Please complete the steps below to set things up.

            <ol>
                <li>

                </li>
            <ol>

        `
    }
}

export class VendorApprovedEmail implements BaseEmail {
    subject: string;
    body: string;

    constructor(firstname: string) {
        this.subject = 'You are now a Foodify vendor!'
        this.body = `
            Congratulations ${firstname}, your request to join Foodify as a vendor has been approved.
            You can login to your account to start setting things up from there!
        `
    }
}

export class VendorApprovedButSignupRequiredEmail implements BaseEmail {
    subject: string;
    body: string;

    constructor(firstname: string) {
        this.subject = 'One more step to become a Foodify vendor!'
        this.body = `
            Congratulations ${firstname}, your request to join Foodify as a vendor has been approved.
            However, we noticed that you haven't created an account yet. Please do so by using this <a href="#">link</a>
            
            Once you sign up, you can begin setting things up from there!
        `
    }
}