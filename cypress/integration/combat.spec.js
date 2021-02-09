/// <reference types="cypress" />

context('Soldiers actions', () => {
  it('Player soldier defeats AI soldier if it has more than 1 strength that it', () => {
    cy.visit('main.html?level=13');

    cy.get('#end_turn').click();
    
    cy.get('#icon64a').click();
    cy.get('#soldier_info').should('be.visible');
    cy.get('#improve_strength').click();
    cy.get('#improve_strength').click();
    cy.get('#strength').should('contain', "Combat strength: [4].");

    cy.get('#icon44e').should('exist')

    cy.get('#cell54').click();

    cy.get('#icon44e').should('not.exist')
  })
})
