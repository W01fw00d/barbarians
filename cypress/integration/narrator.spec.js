/// <reference types="cypress" />

import { start, endTurn, click, canSeeSoldierInfo, moreStrength } from '../utils/ui.js';

context('Narrator', () => {
  it('Roman soldier kills barbarian', () => {
    start(23);
    click('#mute_narration');

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

  it('Roman vs wolves', () => {
    start(23);
    click('#mute_narration');

    endTurn();

    click('#icon21a');
    canSeeSoldierInfo();

    cy.window().then(({ speechSynthesis }) => {
      expect(speechSynthesis.speaking).to.be.false;
    });
    click('#cell11').then(() => {
      cy.window().then(({ speechSynthesis }) => {
        expect(speechSynthesis.speaking).to.be.true;
      });
    });
  })

  it('Barbarian kills roman soldier', () => {
    start(23);
    click('#mute_narration');

    endTurn();

    click('#icon21a');

    cy.window().then(({ speechSynthesis }) => {
      expect(speechSynthesis.speaking).to.be.false;
    });
    click('#cell23').then(() => {
      cy.window().then(({ speechSynthesis }) => {
        expect(speechSynthesis.speaking).to.be.true;
      });
    });
  })

  it('Barbarian vs wolves', () => {
    start(24);
    click('#mute_narration');

    cy.window().then(({ speechSynthesis }) => {
      expect(speechSynthesis.speaking).to.be.false;
    });
    endTurn().then(() => {
      cy.window().then(({ speechSynthesis }) => {
        expect(speechSynthesis.speaking).to.be.true;
      });
    });
  })
})
