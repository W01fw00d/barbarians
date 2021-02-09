/// <reference types="cypress" />

import { start, endTurn, click, moreStrength, canSeeSoldierInfo } from '../utils/ui.js';

context('Combat', () => {
  it('Player soldier always defeats AI soldier if it has more than 1 strength that it', () => {
    start(13);

    endTurn();
    
    click('#icon64a');
    canSeeSoldierInfo();
    moreStrength();
    moreStrength();
    cy.get('#strength').should('contain', "Combat strength: [4].");

    cy.get('#icon44e').should('exist');

    click('#cell54');

    cy.get('#icon44e').should('not.exist');
  })
})
