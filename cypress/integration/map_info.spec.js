/// <reference types="cypress" />

context('Soldiers actions', () => {
  beforeEach(() => {
    cy.visit('main.html');
  })

  //TODO: repeat this test for all faction/types units on game
  it('Open and close player/roman soldier UI', () => {
    cy.get('#info').should('not.be.visible');
    cy.get('#soldier_info').should('not.be.visible');

    cy.get('#icon32a').click();

    cy.get('#info').should('be.visible');
    cy.get('#soldier_info').should('be.visible');
    cy.get('#player').should('have.value', 'Roman');
    cy.get('#type').should('have.value', 'Soldier');

    cy.get('#close').click();
  
    cy.get('#info').should('not.be.visible');
    cy.get('#soldier_info').should('not.be.visible');
  })
})
