// C:\Users\Admin\Desktop\The Jitu\Eventor-Frontend\cypress\e2e\homepage.cy.js

describe("navigating the navigation bar", () => {
    beforeEach(() => {
        cy.visit('/');
        // Set viewport to desktop size to ensure desktop nav is visible
        cy.viewport(1280, 720);
    });

    it("should visit multiple pages", () => {
        // Verify we're on the home page
        cy.location("pathname").should("equal", "/");
        // cy.getDataTest("All the flexibility your events need")
        // .should("be.visible");

        // cy.getDataTest("desktop-nav-about").as("aboutLink");
        // cy.get("@aboutLink").click();
        // cy.location("pathname").should("equal", "/about");
        // cy.contains("About CareConnect").should("be.visible");

        cy.getDataTest("desktop-nav-register").as("registerLink");
        cy.get("@registerLink").click();
        cy.location("pathname").should("equal", "/register");

        cy.visit('/');
        cy.getDataTest("desktop-nav-login").click();
        cy.location("pathname").should("equal", "/login");

    })

    it("Should find ", () =>{
        cy.location("pathname").should("equal", "/");
        cy.getDataTest("flexibility-heading").should("contain.text", "All the flexibility your");
        cy.getDataTest("event-card-in person").should("exist");
        cy.getDataTest("event-card-virtual").should("exist");
        cy.getDataTest("event-card-hybrid").should("exist");
    })


});