/// <reference types="cypress" />

context('Toolbar actions', () => {
  beforeEach(() => {
    cy.visit('main.html');
  })

  it('When user clicks next turn, a new player and AI unit should spawn and player gains 3 gold', () => {
    cy.get('#gold').should('have.value', 1);
    cy.get('#map')
      .find('img[src="./src/images/board/SR_del_def.png"]')
      .should('have.length', 1);
    cy.get('#map')
      .find('img[src="./src/images/board/SB_del_def.png"]')
      .should('have.length', 1);

    cy.get('#end_turn').click();

    cy.get('#gold').should('have.value', 4);
    cy.get('#map')
      .find('img[src="./src/images/board/SR_del_def.png"]')
      .should('have.length', 2);
    cy.get('#map')
      .find('img[src="./src/images/board/SB_del_def.png"]')
      .should('have.length', 2);
  })
})
