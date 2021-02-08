/// <reference types="cypress" />

context('Toolbar actions', () => {
  beforeEach(() => {
    cy.visit('main.html');
  })

  it('When user clicks next turn, a new player and AI unit should spawn', () => {
    cy.get('#map')
      .find('img[src="./src/images/board/SR_del_def.png"]')
      .should('have.length', 1);
    cy.get('#map')
      .find('img[src="./src/images/board/SB_del_def.png"]')
      .should('have.length', 1);

    cy.get('#end_turn').click();

    cy.get('#map')
      .find('img[src="./src/images/board/SR_del_def.png"]')
      .should('have.length', 2);
    cy.get('#map')
      .find('img[src="./src/images/board/SB_del_def.png"]')
      .should('have.length', 2);
  })
})
