/// <reference types="cypress" />

import { start, endTurn, click, canSeeSoldierInfo, moreStrength } from '../utils/ui.js';

context('Narrator', () => {
  beforeEach(() =>{
    start(23);
    click('#mute_narration');
  });

  it('Roman soldier kills barbarian', () => {
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

  it('Barbarian kills roman soldier', () => {
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

  it('Roman soldier kills wolves', () => {
    endTurn();

    click('#icon21a');
    canSeeSoldierInfo();
    moreStrength();
    moreStrength();

    cy.window().then(({ speechSynthesis }) => {
      expect(speechSynthesis.speaking).to.be.false;
    });
    click('#cell11').then(() => {
      cy.window().then(({ speechSynthesis }) => {
        expect(speechSynthesis.speaking).to.be.true;
      });
    });
  })
})
