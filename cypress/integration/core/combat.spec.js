/// <reference types="cypress" />

import {
  start,
  endTurn,
  click,
  moreStrength,
  canSeeSoldierInfo,
} from "../../utils/ui.js";

context("Combat", () => {
  it(
    "Soldier defeats 3 mobs if it has more than 1 strength than them, and cannot move anymore." +
      " Also, next turn new recruits are auto-killed",
    () => {
      // TODO: this test breaks sometimes, when AI decides to improve quality so human soldier can die at hands of new barbarian recruits...
      // Improve strength more to avoid this possibility
      start(13);

      endTurn();
      cy.get("#gold").should("have.value", 4);

      click("#icon64a");
      canSeeSoldierInfo();
      moreStrength();
      moreStrength();
      cy.get("#strength").should("contain", "Combat strength: [4].");
      cy.get("#gold").should("have.value", 1);

      cy.get("#icon44n").should("exist");
      cy.get("#icon53e").should("exist");
      cy.get("#icon55e").should("exist");
      cy.get("#movement").should("contain", "Movements left: [2]");

      click("#cell54");

      cy.get("#icon44n").should("not.exist");
      cy.get("#icon53e").should("not.exist");
      cy.get("#icon55e").should("not.exist");
      click('#icon54a[src="./src/images/board/SR_del_def_grey.png"]');
      cy.get("#movement").should("contain", "Movements left: [0]");
      cy.get("#gold").should("have.value", 3); // + 2 because 2 barbarians killed, + 0 because 1 wolf killed

      endTurn();
      cy.get("#gold").should("have.value", 8); // + 3 because new turn, + 2 because 2 barbarians killed
      cy.get("#icon53e").should("not.exist");
      cy.get("#icon55e").should("not.exist");
    }
  );

  it("Soldier captures 3 towns, and cannot move anymore", () => {
    start(14);

    click("#icon64a");

    cy.get('#icon44N[src="./src/images/board/AN_del_def.png"]').should("exist");
    cy.get('#icon53E[src="./src/images/board/AB_del_def.png"]').should("exist");
    cy.get('#icon55E[src="./src/images/board/AB_del_def.png"]').should("exist");

    click("#cell54");

    cy.get('#icon44A[src="./src/images/board/AR_del_def.png"]').should("exist");
    cy.get('#icon53A[src="./src/images/board/AR_del_def.png"]').should("exist");
    cy.get('#icon55A[src="./src/images/board/AR_del_def.png"]').should("exist");
    click('#icon54a[src="./src/images/board/SR_del_def_grey.png"]');
    cy.get("#movement").should("contain", "Movements left: [0]");
  });

  it("Soldier captures 3 towns automatically at beginning of second turn", () => {
    start(15);

    cy.get('#icon44N[src="./src/images/board/AN_del_def.png"]').should("exist");
    cy.get('#icon53E[src="./src/images/board/AB_del_def.png"]').should("exist");
    cy.get('#icon55E[src="./src/images/board/AB_del_def.png"]').should("exist");

    endTurn();

    cy.get('#icon44A[src="./src/images/board/AR_del_def.png"]').should("exist");
    cy.get('#icon53A[src="./src/images/board/AR_del_def.png"]').should("exist");
    cy.get('#icon55A[src="./src/images/board/AR_del_def.png"]').should("exist");
  });
});
