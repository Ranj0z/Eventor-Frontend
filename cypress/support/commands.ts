// C:\Users\Admin\Desktop\The Jitu\Eventor-Frontend\cypress\support\commands.ts

/// <reference types="cypress" />

Cypress.Commands.add('getDataTest', (dataTestSelector) => {
    return cy.get(`[data-test="${dataTestSelector}"]`)
})


//login Admin user
Cypress.Commands.add('loginAsAdmin', (email = 'jean.smith@example.com', password = 'hashed_password_1') => {
    cy.visit('/login')
    cy.getDataTest('login-email-input').type(email)
    cy.getDataTest('login-password-input').type(password)
    cy.getDataTest('login-submit-button').click()
    cy.url().should('include', '/admin/dashboard/events').as('AdminDashboardUrl')
    // Welcome to your Admin dashboard - contains
    cy.get('body').should('contain.text', 'Welcome to your Admin Dashboard') //body is the root element of the page

})

//login Host
Cypress.Commands.add('loginAsHost', (email = 'monica.green@example.com', password = 'hashed_password_3') => {
    cy.visit('/login')
    cy.getDataTest('login-email-input').type(email)
    cy.getDataTest('login-password-input').type(password)
    cy.getDataTest('login-submit-button').click()
    cy.url().should('include', '/host/dashboard/my-events').as('HostDashboardUrl')
    cy.get('body').should('contain.text', 'Welcome to your Host dashboard')

})

//login User
Cypress.Commands.add('loginAsUser', (email = 'david.k.mwangi11101@gmail.com', password = 'RyDXw9LnQa3rwZ5') => {
    cy.visit('/login')
    cy.getDataTest('login-email-input').type(email)
    cy.getDataTest('login-password-input').type(password)
    cy.getDataTest('login-submit-button').click()
    cy.url().should('include', '/user/dashboard/events').as('UserDashboardUrl')
    cy.get('body').should('contain.text', 'Welcome to your User Dashboard')

})



/* eslint-disable @typescript-eslint/no-namespace */
export { } // means this file is a module, so we can augment the Cypress namespace
declare global {
    namespace Cypress {
        interface Chainable { //means we are extending the Cypress namespace with our own custom commands
            getDataTest(value: string): Chainable<JQuery<HTMLElement>>;
            loginAsAdmin(email?: string, password?: string): Chainable<void>;
            loginAsHost(email?: string, password?: string): Chainable<void>;
            loginAsUser(email?: string, password?: string): Chainable<void>;
        }
    }
} 