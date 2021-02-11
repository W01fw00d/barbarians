/// <reference types="cypress" />

import { start, click, endTurn } from '../../utils/ui.js';

context('Units movements', () => {
  beforeEach(() => start());

  it('User moves soldier 2 steps and cannot move anymore; then next turn user moves it 2 steps again', () => {
    click('#icon32a');
    cy.get('#movement').should('contain', 'Movements left: [2]');
    click('#cell30');

    click('#icon30a[src="./src/images/board/SRUsed_del_def.png"]');
    cy.get('#movement').should('contain', 'Movements left: [0]');
    click('#cell32');

    cy.get('#icon30a[src="./src/images/board/SRUsed_del_def.png"]').should('exist');

    endTurn();
    click('#icon30a[src="./src/images/board/SR_del_def.png"]');
    cy.get('#movement').should('contain', 'Movements left: [2]');
    click('#cell32');

    cy.get('#icon32a[src="./src/images/board/SRUsed_del_def.png"]').should('exist');
  })

  it('User moves soldier 1 step and then move it 1 step again; after that, it cannot be moved anymore', () => {
    click('#icon32a');
    click('#cell31');

    click('#icon31a[src="./src/images/board/SR_del_def.png"]');
    cy.get('#movement').should('contain', 'Movements left: [1]');
    click('#cell30');

    click('#icon30a[src="./src/images/board/SRUsed_del_def.png"]');
    cy.get('#movement').should('contain', 'Movements left: [0]');
    click('#cell31');
    cy.get('#icon30a[src="./src/images/board/SRUsed_del_def.png"]').should('exist');
  })

  it('User cannot move soldier more than 2 steps', () => {
    click('#icon32a');
    click('#cell62');

    cy.get('#icon32a[src="./src/images/board/SR_del_def.png"]').should('exist');
    cy.get('#movement').should('contain', 'Movements left: [2]');
  })

  it('User cannot move soldier into an obstacle', () => {
    click('#icon32a');
    click('#cell33');

    cy.get('#icon32a[src="./src/images/board/SR_del_def.png"]').should('exist');
    cy.get('#movement').should('contain', 'Movements left: [2]');
  })
})
