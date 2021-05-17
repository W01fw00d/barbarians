/// <reference types="cypress" />

import { start, click, endTurn, moreStrength } from "../utils/ui.js";

context("Human Soldiers movements using drag and drop", () => {
  it("User drags a soldier 2 steps and cannot move anymore; then next turn user drags it 2 steps again", () => {
    start();

    cy.get("#tooltip32a").drag("#cell30");

    click('#icon30a[src="./src/images/board/mob/roman/grey/1.png"]');
    cy.get("#movement").should("contain", "Movements left: [0]");
    click("#cell32");

    cy.get('#icon30a[src="./src/images/board/mob/roman/grey/1.png"]').should(
      "exist"
    );

    endTurn();

    cy.get("#tooltip30a").drag("#cell32");

    cy.get('#icon32a[src="./src/images/board/mob/roman/grey/1.png"]').should(
      "exist"
    );
  });

  it("User drags a soldier 1 step and then move it 1 step again; after that, it cannot be moved anymore", () => {
    start();

    cy.get("#tooltip32a").drag("#cell31");
    click('#icon31a[src="./src/images/board/mob/roman/1.png"]');
    cy.get("#movement").should("contain", "Movements left: [1]");

    cy.get("#tooltip31a").drag("#cell30");
    click('#icon30a[src="./src/images/board/mob/roman/grey/1.png"]');
    cy.get("#movement").should("contain", "Movements left: [0]");

    cy.get("#tooltip30a").drag("#cell31");
    cy.get('#icon30a[src="./src/images/board/mob/roman/grey/1.png"]').should(
      "exist"
    );
  });

  it("User cannot drag a soldier more than 2 steps", () => {
    start();

    cy.get("#tooltip32a").drag("#cell62", { force: true });
    click("#modal-ok");

    cy.get('#icon32a[src="./src/images/board/mob/roman/1.png"]').should(
      "exist"
    );
    click("#icon32a");
    cy.get("#movement").should("contain", "Movements left: [2]");
  });

  it("User cannot drag a soldier into an obstacle", () => {
    start();

    cy.get("#tooltip32a").drag("#cell33", { force: true });
    click("#modal-ok");

    cy.get('#icon32a[src="./src/images/board/mob/roman/1.png"]').should(
      "exist"
    );

    click("#icon32a");
    cy.get("#movement").should("contain", "Movements left: [2]");
  });

  it("User can drag a soldier after moving to next map", () => {
    start(19);

    cy.get("#icon71a").should("not.exist");

    endTurn();

    click("#icon64a");
    moreStrength();
    moreStrength();

    click("#cell54").then(() => {
      cy.get("#modal-content").should(
        "contain",
        "Victory! The area is safe again."
      );
      click("#modal-ok");

      cy.get("#modal-content").should("contain", "A new map awaits you...");
      click("#modal-ok");

      cy.get("#icon71a").should("exist");

      endTurn();

      cy.get("#icon54a").should("not.exist");
      cy.get("#tooltip71a").drag("#cell72");
      cy.get("#icon72a").should("exist");
    });
  });
});
