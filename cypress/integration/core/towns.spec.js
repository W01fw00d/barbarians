/// <reference types="cypress" />

import { start, endTurn, click } from "../../utils/ui.js";

context("Towns upgrades and unit generation", () => {
  // TODO: improvement, location for new recruit should be randomized between all possible ones, currently is always the south space
  it("Player and enemy towns generate 1 unit when quantity is 1", () => {
    start(16);

    cy.get("#map")
      .find('img[src="./src/images/board/mob/roman/1.png"]')
      .should("have.length", 1);
    cy.get("#map")
      .find('img[src="./src/images/board/mob/barbarian/1.png"]')
      .should("have.length", 1);

    endTurn();

    cy.get("#map")
      .find('img[src="./src/images/board/mob/roman/1.png"]')
      .should("have.length", 2);

    cy.get("#map")
      .find('img[src="./src/images/board/mob/barbarian/1.png"]')
      .then(({ length }) => {
        // AI randonmly chooses between improving quantity or quality, so 1 - 2 units can spawn in first turn.
        // Also, strength can be improved
        // We limited available space in this map to 1 to avoid this randomness.
        if (length === 1) {
          cy.get("#map")
            .find('img[src="./src/images/board/mob/barbarian/2.png"]')
            .should("have.length", length);
        } else {
          cy.expect(length).to.equal(2);
        }
      });
  });

  it("Player town generates 2 units when quantity is 2", () => {
    start(16);

    cy.get("#map")
      .find('img[src="./src/images/board/mob/roman/1.png"]')
      .should("have.length", 1);

    click("#icon11A");
    cy.get("#prod").should(
      "contain",
      "Producing [1] soldiers with [1] strength each turn. Upgrade: "
    );
    click("#improve_quantity");
    cy.get("#prod").should(
      "contain",
      "Producing [2] soldiers with [1] strength each turn. Upgrade: "
    );

    endTurn();

    cy.get("#map")
      .find('img[src="./src/images/board/mob/roman/1.png"]')
      .should("have.length", 3);
  });

  it(
    "Player town generates unit with 1 strength when quality is 1;" +
      "and unit with 2 strength when quality is 2",
    () => {
      start(17);

      cy.get("#map")
        .find('img[src="./src/images/board/mob/roman/1.png"]')
        .should("have.length", 1);

      click("#icon11A");
      cy.get("#prod").should(
        "contain",
        "Producing [1] soldiers with [1] strength each turn. Upgrade: "
      );
      endTurn();

      click("#icon21a");
      cy.get("#strength").should("contain", "Combat strength: [1].");
      click("#cell22");

      click("#icon11A");
      click("#improve_quality");
      click("#icon11A");
      cy.get("#prod").should(
        "contain",
        "Producing [1] soldiers with [2] strength each turn. Upgrade: "
      );

      endTurn();

      click("#icon21a");
      cy.get("#strength").should("contain", "Combat strength: [2].");
    }
  );
});
