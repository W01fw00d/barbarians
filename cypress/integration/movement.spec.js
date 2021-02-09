/// <reference types="cypress" />

import { start, click, endTurn } from '../utils/ui.js';

context('Units movements', () => {
  beforeEach(() => start());

  it('User moves soldier 2 steps and cannot move anymore; then next turn user moves it 2 steps again', () => {
    click('#icon32a');
    click('#cell30');

    click('#icon30a[src="./src/images/board/SRUsed_del_def.png"]');
    click('#cell32');

    cy.get('#icon30a[src="./src/images/board/SRUsed_del_def.png"]').should('exist');

    endTurn();
    click('#icon30a[src="./src/images/board/SR_del_def.png"]');
    click('#cell32');

    cy.get('#icon32a[src="./src/images/board/SRUsed_del_def.png"]').should('exist');

  })
})
