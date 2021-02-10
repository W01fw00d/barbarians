/// <reference types="cypress" />

import { start, click, endTurn, moreStrength } from '../utils/ui.js';

context('Different ways to finish a map or the whole game', () => {
  it('When user clicks reset map, units and golds gets reset', () => {
    start();

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
    start();

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

  it('User completes a map and visits the next one with reset gold', () => {
    start(19);

    cy.get('#icon71a').should('not.exist');
    cy.get('#gold').should('have.value', 1);

    endTurn();

    click('#icon64a');
    moreStrength();
    moreStrength();

    cy.get('#gold').should('have.value', 1);

    const stub = cy.stub()
    cy.on('window:alert', stub);
    click('#cell54').then(() => {
      expect(stub.getCall(0)).to.be.calledWith("Victory! The area is safe again.");
      cy.get('#icon71a').should('exist');
      //cy.get('#gold').should('have.value', 1); //This is a bug, gold is not being reset

      endTurn();
      //cy.get('#icon54a').should('not.exist');// and if you click on endTurn, old map units appear
    });
  })

  //TODO: finish map 10 or last map in list, game over: player victory, go back to map 1
})
