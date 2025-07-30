describe("form tests", () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    it("should login with valid credentials", () => {
        // assert that we are in the login page
        cy.contains(/login/i).should('be.visible')
        //Get the email input 
        cy.getDataTest('login-email-input').as('login-emailInput')

        cy.get('@login-emailInput')
            .should('be.visible')
            .should('have.attr', 'type', 'email')
            .type('jean.smith123@example.com')

        // Get the password input
        cy.getDataTest('login-password-input').as('login-passwordInput')

        cy.get('@login-passwordInput')
            .should('be.visible')
            .should('have.attr', 'type', 'password')
            .type('hashed_password_1')

        // Submit the form
        cy.getDataTest('login-submit-button').as('login-submitButton')
        cy.get('@login-submitButton')
            .should('contain.text', 'Sign In')
            .should('not.be.disabled')
            .click()

        cy.contains(/Login successful/i).should('be.visible')
        cy.wait(1000)
        cy.contains(/Login successful/i).should('not.exist')

        cy.url().should('include', '/admin/dashboard')
    })

    // Netgative test case for login form with wrong password
    it("should not login with invalid credentials", () => {
        cy.contains(/Login/i).should('be.visible')

        // Get the email input
        cy.getDataTest('login-email-input').as('login-emailInput')
        cy.get('@login-emailInput')
            .type('jean.smith123@example.com')

        // Get the password input
        cy.getDataTest('login-password-input').as('login-passwordInput')
        cy.get('@login-passwordInput')
            .type('wrongpassword123')

        // Submit the form
        cy.getDataTest('login-submit-button').as('login-submitButton')
        cy.get('@login-submitButton')
            .should('contain.text', 'Sign In')
            .click()

        // Assert that the error message is displayed
        cy.contains(/Login failed. Please check your credentials and try again./i).should('be.visible')
        cy.wait(1000)
        cy.contains(/Login failed. Please check your credentials and try again./i).should('not.exist')
    })

     // Netgative test case for login with wrong email
    it("should not login with invalid credentials", () => {
        cy.contains(/Login/i).should('be.visible')

        // Get the email input
        cy.getDataTest('login-email-input').as('login-emailInput')
        cy.get('@login-emailInput')
            .type('kansy841@gmail.com')

        // Get the password input
        cy.getDataTest('login-password-input').as('login-passwordInput')
        cy.get('@login-passwordInput')
            .type('hashed_password_1')

        // Submit the form
        cy.getDataTest('login-submit-button').as('login-submitButton')
        cy.get('@login-submitButton')
            .should('contain.text', 'Sign In')
            .click()

        // Assert that the error message is displayed
        cy.contains(/Login failed. Please check your credentials and try again./i).should('be.visible')
        cy.wait(1000)
        cy.contains(/Login failed. Please check your credentials and try again./i).should('not.exist')
    })
})