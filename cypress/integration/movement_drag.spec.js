/// <reference types="cypress" />

//import { start, click, endTurn, isMobsCount } from "../../utils/ui.js";

context("Human Soldiers movements using drag and drop", () => {
  //TODO
  it.skip("User drags a soldier 2 steps and cannot move anymore; then next turn user drags it 2 steps again", () => {
    /* start();

    click("#icon32a");
    cy.get("#movement").should("contain", "Movements left: [2]");
    click("#cell30");

    click('#icon30a[src="./src/images/board/mob/roman/grey/1.png"]');
    cy.get("#movement").should("contain", "Movements left: [0]");
    click("#cell32");

    cy.get('#icon30a[src="./src/images/board/mob/roman/grey/1.png"]').should(
      "exist"
    );

    endTurn();
    click('#icon30a[src="./src/images/board/mob/roman/1.png"]');
    cy.get("#movement").should("contain", "Movements left: [2]");
    click("#cell32");

    cy.get('#icon32a[src="./src/images/board/mob/roman/grey/1.png"]').should(
      "exist"
    ); */
  });

  it.skip("User drags a soldier 1 step and then move it 1 step again; after that, it cannot be moved anymore", () => {
    /* start();

    click("#icon32a");
    click("#cell31");

    click('#icon31a[src="./src/images/board/mob/roman/1.png"]');
    cy.get("#movement").should("contain", "Movements left: [1]");
    click("#cell30");

    click('#icon30a[src="./src/images/board/mob/roman/grey/1.png"]');
    cy.get("#movement").should("contain", "Movements left: [0]");
    click("#cell31");
    cy.get('#icon30a[src="./src/images/board/mob/roman/grey/1.png"]').should(
      "exist"
    ); */
  });

  it.skip("User cannot drag a soldier more than 2 steps", () => {
    /* start();

    click("#icon32a");
    click("#cell62");

    cy.get('#icon32a[src="./src/images/board/mob/roman/1.png"]').should(
      "exist"
    );
    cy.get("#movement").should("contain", "Movements left: [2]"); */
  });

  it.skip("User cannot drag a soldier into an obstacle", () => {
    /* start();

    click("#icon32a");
    click("#cell33");

    cy.get('#icon32a[src="./src/images/board/mob/roman/1.png"]').should(
      "exist"
    );
    cy.get("#movement").should("contain", "Movements left: [2]"); */
  });

  it.skip("User can drag a soldier after moving to next map", () => {});
});
