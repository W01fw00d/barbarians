/// <reference types="cypress" />

import { click } from '../utils/ui.js';

context('Manual testing', () => {
  it('Map 1', () => {
    // This is a hack to allow developer to manually test the game inside cypress window with auto-closing alerts
    cy.visit('main.html');
    click('#modal-ok').then(
      () => click('#modal-ok')
    );

    click('#mute_narration');
    cy.on('window:alert', cy.stub());
  })
})
