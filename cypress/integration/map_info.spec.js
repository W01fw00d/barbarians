/// <reference types="cypress" />

import { start, click, canSeeSoldierInfo } from '../utils/ui.js';

context('User can display more info about map units', () => {
  beforeEach(() => start());

  //TODO: repeat this test for all faction/types units on game
  it('Open and close player/roman soldier UI', () => {
    cy.get('#info').should('not.be.visible');
    cy.get('#soldier_info').should('not.be.visible');

    click('#icon32a');

    cy.get('#info').should('be.visible');
    canSeeSoldierInfo();
    cy.get('#player').should('have.value', 'Roman');
    cy.get('#type').should('have.value', 'Soldier');

    click('#close');
  
    cy.get('#info').should('not.be.visible');
    cy.get('#soldier_info').should('not.be.visible');
  })

  //TODO: test tooltips when hovering units
})
