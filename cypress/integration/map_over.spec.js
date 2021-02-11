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
      .should('have.length.at.least', 2); // AI randomly upgrades quantity, resulting in +2 barbarians instead of +1

    click('#reset_map');

    cy.get('#gold').should('have.value', 1);
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
      cy.get('#gold').should('have.value', 1);
      cy.get('#icon32a').should('exist');
    });
  })

  it('User completes a map and visits the next one with reset units and gold, and can move units', () => {
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
      cy.get('#gold').should('have.value', 1);

      //TODO test: that units can be selected and moved after reset

      endTurn();
      //cy.get('#icon54a').should('not.exist');// and if you click on endTurn, old map units appear
    });
  })

  it('User completes a map and completes the whole game, reseting to map 1 with reset gold', () => {
    start(21);

    cy.get('#icon03n').should('not.exist'); // wolf in map 1
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
      expect(stub.getCall(1)).to.be.calledWith('Congratulations, you completed the game! Those Barbarians won\'t be a threat for our beloved Rome anymore... right?');

      cy.location().should((location) => {
        expect(location.search).to.eq('');
      });
      cy.get('#icon03n').should('exist'); // wolf in map 1
      cy.get('#gold').should('have.value', 1);
    });
  })
})
