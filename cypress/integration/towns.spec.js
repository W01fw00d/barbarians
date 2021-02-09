/// <reference types="cypress" />

import { start, endTurn, click } from '../utils/ui.js';

context('Towns upgrades and unit generation', () => {
  // TODO: improvement, location for new recruit should be randomized between all possible ones, currently is always the south space
  it('Player and enemy towns generate 1 unit when quantity is 1', () => {
    start(16);

    cy.get('#map')
      .find('img[src="./src/images/board/SR_del_def.png"]')
      .should('have.length', 1);
    cy.get('#map')
      .find('img[src="./src/images/board/SB_del_def.png"]')
      .should('have.length', 1);

    endTurn();

    cy.get('#map')
      .find('img[src="./src/images/board/SR_del_def.png"]')
      .should('have.length', 2);

    //AI randonmly chooses between improving quantity or quality, so 1 - 2 units can spawn in first turn.
    // We limited available space in this map to 1 to avoid this randomness.
    cy.get('#map')
      .find('img[src="./src/images/board/SR_del_def.png"]')
      .should('have.length', 2);
  })

  it('Player town generates 2 units when quantity is 2', () => {
    start(16);

    cy.get('#map')
      .find('img[src="./src/images/board/SR_del_def.png"]')
      .should('have.length', 1);

    click('#icon11A');
    cy.get('#town_info').should('be.visible');
    click('#improve_quantity');
    //TODO: check displayed text about quantity
    endTurn();

    cy.get('#map')
      .find('img[src="./src/images/board/SR_del_def.png"]')
      .should('have.length', 3);
  })

  //TODO: test quality upgrade
})
