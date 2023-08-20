import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the Cypress home page", () => {
    cy.visit("https://cypress.io");
});

When("I click on documentation link", () => {
    cy.get("a[href=\"https://on.cypress.io\"]").eq(0).click();
});

Then("the documentation page show up", () => {
    cy.url().should("contain", "https://docs.cypress.io");
});

