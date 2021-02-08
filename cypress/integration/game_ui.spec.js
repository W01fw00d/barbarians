/// <reference types="cypress" />

context('Game UI', () => {
  beforeEach(() => {
    cy.visit('main.html');
  })

  it('Improve soldier strength if enough gold', () => {
    cy.get('#info').should('not.be.visible');
    cy.get('#icon32a').click();
    cy.get('#info').should('be.visible');

    cy.get('#strength').should('contain', "Combat strength: [1].");
    cy.get('#improve_strength').click();
    cy.get('#strength').should('contain', "Combat strength: [2].");
  })

  it('Do NOT improve soldier strength if NOT enough gold', () => {
    cy.get('#info').should('not.be.visible');
    cy.get('#icon32a').click();
    cy.get('#info').should('be.visible');

    cy.get('#strength').should('contain', "Combat strength: [1].");
    cy.get('#improve_strength').click();
    cy.get('#strength').should('contain', "Combat strength: [2].");
    cy.get('#improve_strength').click();
    cy.get('#strength').should('contain', "Combat strength: [2].");
  })
})
