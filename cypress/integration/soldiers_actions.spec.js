/// <reference types="cypress" />

import { start, click, canSeeSoldierInfo, moreStrength, endTurn } from '../utils/ui.js';

context('Soldiers actions', () => {
  beforeEach(() => start());

  it('Improve soldier strength if enough gold', () => {
    cy.get('#soldier_info').should('not.be.visible');
    click('#icon32a');
    canSeeSoldierInfo();

    cy.get('#strength').should('contain', "Combat strength: [1].");
    moreStrength();
    cy.get('#strength').should('contain', "Combat strength: [2].");
  })

  it('Do NOT improve soldier strength if NOT enough gold', () => {
    cy.get('#soldier_info').should('not.be.visible');
    click('#icon32a');
    canSeeSoldierInfo();

    cy.get('#strength').should('contain', "Combat strength: [1].");
    moreStrength();
    cy.get('#strength').should('contain', "Combat strength: [2].");
    moreStrength();

    const stub = cy.stub()
    cy.on('window:alert', stub);
    click('#improve_strength')
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith("You don't have enough gold!");
    });

    cy.get('#strength').should('contain', "Combat strength: [2].");
  })

  it('Destroy one of the soldiers after confirmation', () => {
    endTurn();

    click('#icon32a');
    canSeeSoldierInfo();

    cy.on("window:confirm", () => true);
    click('#destroy');

    cy.get('#icon32a').should('not.exist');
  })

  it('Do not destroy one of the soldiers after confirmation', () => {
    endTurn();

    click('#icon32a');
    canSeeSoldierInfo();

    cy.on("window:confirm", () => false);
    click('#destroy');

    cy.get('#icon32a').should('exist');
  })
})
