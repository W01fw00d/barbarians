/// <reference types="cypress" />

import { start, endTurn, click, canSeeSoldierInfo, moreStrength } from '../utils/ui.js';

context('Narrator', () => {
  it('Roman soldier kills barbarian', () => {
    start(23);
    
    endTurn();

    click('#icon21a');
    canSeeSoldierInfo();
    moreStrength();
    moreStrength();

    cy.window().then(({ speechSynthesis }) => {
      expect(speechSynthesis.speaking).to.be.false;
    });
    click('#cell23').then(() => {
      cy.window().then(({ speechSynthesis }) => {
        expect(speechSynthesis.speaking).to.be.true;
      });
    });
  })
})
