/// <reference types="cypress" />

context('Toolbar actions', () => {
  beforeEach(() => {
    cy.visit('main.html');
  })

  it('When user clicks on unmute music button, music gets unmuted and then, it can me muted again', () => {
    cy.get('#mute_music').should('contain', 'Unmute Music');

    cy.get('#mute_music').click();

    cy.get('#mute_music').should('contain', 'Mute Music');
    //TODO: demonstrate that sound is actually emited

    cy.get('#mute_music').click();

    cy.get('#mute_music').should('contain', 'Unmute Music');
  })

  it('When user clicks on unmute SFX button, SFX gets unmuted and then, it can me muted again', () => {
    cy.get('#mute_sfx').should('contain', 'Unmute SFX');

    cy.get('#mute_sfx').click();

    cy.get('#mute_sfx').should('contain', 'Mute SFX');
    //TODO: demonstrate that sound is actually emited

    cy.get('#mute_sfx').click();

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

    cy.get('#end_turn').click();

    cy.get('#gold').should('have.value', 4);
    cy.get('#map')
      .find('img[src="./src/images/board/SR_del_def.png"]')
      .should('have.length', 2);
    cy.get('#map')
      .find('img[src="./src/images/board/SB_del_def.png"]')
      .should('have.length', 2);
  })
})
