/// <reference types="cypress" />

import { start, click, endTurn } from '../utils/ui.js';

context('Topbar actions', () => {
  beforeEach(() => start());

  it('When user clicks on unmute music button, music gets unmuted and then, it can me muted again', () => {
    cy.get('#mute_music').should('contain', 'Unmute Music');

    click('#mute_music');

    cy.get('#mute_music').should('contain', 'Mute Music');
    //TODO: demonstrate that sound is actually emited

    click('#mute_music');

    cy.get('#mute_music').should('contain', 'Unmute Music');
  })

  it('When user clicks on unmute SFX button, SFX gets unmuted and then, it can me muted again', () => {
    cy.get('#mute_sfx').should('contain', 'Unmute SFX');

    click('#mute_sfx');

    cy.get('#mute_sfx').should('contain', 'Mute SFX');
    //TODO: demonstrate that sound is actually emited

    click('#mute_sfx');

    cy.get('#mute_sfx').should('contain', 'Unmute SFX');
  })

  it('When user clicks next turn, a new player and AI unit should spawn and player gains 3 gold', () => {
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
  })
})
