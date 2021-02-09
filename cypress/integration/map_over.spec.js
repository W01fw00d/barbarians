/// <reference types="cypress" />

import { start, click, endTurn, moreStrength } from '../utils/ui.js';

context('Different ways to finish a map or the whole game', () => {
  beforeEach(() => start());

  it('When user clicks reset map, units and golds gets reset', () => {
    cy.get('#gold').should('have.value', 1);
    cy.get('#map')
      .find('img[src="./src/images/board/SR_del_def.png"]')
      .should('have.length', 1);
    cy.get('#map')
      .find('img[src="./src/images/board/SB_del_def.png"]')
      .should('have.length', 1);

    endTurn();

    cy.get('#gold').should('have.value', 4);
    cy.get('#map')
      .find('img[src="./src/images/board/SR_del_def.png"]')
      .should('have.length', 2);
    cy.get('#map')
      .find('img[src="./src/images/board/SB_del_def.png"]')
      .should('have.length', 2);

    click('#reset_map');

    //cy.get('#gold').should('have.value', 1); //TODO: (github issue #12) This is a bug, currently game is not reseting gold or units (after first turn, dead units appear again)
    cy.get('#map')
      .find('img[src="./src/images/board/SR_del_def.png"]')
      .should('have.length', 1);
    cy.get('#map')
      .find('img[src="./src/images/board/SB_del_def.png"]')
      .should('have.length', 1);
  })

  it('Destroy all player soldiers and it\'s game over, after that games resets units and gold', () => {
    click('#icon32a');
    cy.get('#info').should('be.visible');

    moreStrength();
    cy.get('#gold').should('have.value', 0);

    click('#destroy');

    const stub = cy.stub()
    cy.on('window:alert', stub);
    cy.on("window:confirm", () => true).then(() => {
      expect(stub.getCall(0)).to.be.calledWith("The Barbarians are everywhere! Rome will fall...");
      //cy.get('#gold').should('have.value', 1); //TODO: (github issue #12) This is a bug, currently game is not reseting gold or units (after first turn, dead units appear again)
      cy.get('#icon32a').should('exist');
    });
  })

  //TODO: go to next map

  //TODO: finish last map, game over: player victory
})
