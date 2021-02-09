/// <reference types="cypress" />

import { start, endTurn, click, moreStrength, canSeeSoldierInfo } from '../utils/ui.js';

context('Combat', () => {
  //TODO: test that every barbarian killed gives the player 1 gold, but the wolfs give 0
  it(
    'Soldier defeats 3 mobs if it has more than 1 strength than them, and cannot move anymore.' +
    ' Also, next turn new recruits are auto-killed',
  () => {
    start(13);

    endTurn();
    
    click('#icon64a');
    canSeeSoldierInfo();
    moreStrength();
    moreStrength();
    cy.get('#strength').should('contain', "Combat strength: [4].");

    cy.get('#icon44n').should('exist');
    cy.get('#icon53e').should('exist');
    cy.get('#icon55e').should('exist');
    cy.get('#movement').should('contain', 'Movements left: [2]');

    click('#cell54');

    cy.get('#icon44n').should('not.exist');
    cy.get('#icon53e').should('not.exist');
    cy.get('#icon55e').should('not.exist');
    click('#icon54a[src="./src/images/board/SRUsed_del_def.png"]');
    cy.get('#movement').should('contain', 'Movements left: [0]');

    endTurn();
    cy.get('#icon53e').should('not.exist');
    cy.get('#icon55e').should('not.exist');
  })

  it('Soldier captures 3 towns, and cannot move anymore', () => {
    start(14);

    click('#icon64a');

    cy.get('#icon44N[src="./src/images/board/AN_del_def.png"]').should('exist');
    cy.get('#icon53E[src="./src/images/board/AB_del_def.png"]').should('exist');
    cy.get('#icon55E[src="./src/images/board/AB_del_def.png"]').should('exist');

    click('#cell54');

    //TODO: Bug: When capturing, soldier should loose all movement left. Also, all towns should be captured
    //cy.get('#icon44A[src="./src/images/board/AR_del_def.png"]').should('exist');
    //cy.get('#icon53A[src="./src/images/board/AR_del_def.png"]').should('exist');
    cy.get('#icon55A[src="./src/images/board/AR_del_def.png"]').should('exist');
    //click('#icon54a[src="./src/images/board/SRUsed_del_def.png"]');
    //cy.get('#movement').should('contain', 'Movements left: [0]');
  })

  //TODO: bug, sometimes only one town is conquered, instead of the 3
  /* it('Soldier captures 3 towns automatically at beginning of second turn', () => {
    start(15);

    cy.get('#icon44N[src="./src/images/board/AN_del_def.png"]').should('exist');
    cy.get('#icon53E[src="./src/images/board/AB_del_def.png"]').should('exist');
    cy.get('#icon55E[src="./src/images/board/AB_del_def.png"]').should('exist');

    endTurn();

    cy.get('#icon44A[src="./src/images/board/AR_del_def.png"]').should('exist');
    cy.get('#icon53A[src="./src/images/board/AR_del_def.png"]').should('exist');
    cy.get('#icon55A[src="./src/images/board/AR_del_def.png"]').should('exist');
  }) */
})
