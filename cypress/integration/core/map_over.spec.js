/// <reference types="cypress" />

import {
  start,
  click,
  endTurn,
  moreStrength,
  isMobsCount,
  isBarbarianMobsCount,
} from "../../utils/ui.js";

context("Different ways to finish a map or the whole game", () => {
  it("When user clicks reset map, units and golds gets reset", () => {
    start();

    cy.get("#gold").should("have.value", 1);
    isMobsCount("roman", 1);
    isBarbarianMobsCount(1);

    endTurn();

    cy.get("#gold").should("have.value", 4);
    isMobsCount("roman", 2);
    cy.get("#map")
      .find('img[src="./src/images/board/mob/barbarian/8.png"]')
      .should("have.length.at.least", 2); // AI randomly upgrades quantity, resulting in +2 barbarians instead of +1
    click("#reset_map");

    cy.get("#gold").should("have.value", 1);
    isMobsCount("roman", 1);
    isBarbarianMobsCount(1);
  });

  it("Destroy all player soldiers and it's game over, after that games resets units and gold", () => {
    start();

    click("#icon32a");
    cy.get("#info").should("be.visible");

    moreStrength();
    cy.get("#gold").should("have.value", 0);

    click("#destroy");

    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.on("window:confirm", () => true).then(() => {
      cy.get("#modal-content").should(
        "contain",
        "The Barbarians are everywhere! Rome will fall..."
      );
      click("#modal-ok");
      cy.get("#gold").should("have.value", 1);
      cy.get("#icon32a").should("exist");
    });
  });

  it("User completes a map and visits the next one with reset units and gold, and can move units", () => {
    start(19);

    cy.get("#icon71a").should("not.exist");
    cy.get("#gold").should("have.value", 1);

    endTurn();

    click("#icon64a");
    moreStrength();
    moreStrength();

    cy.get("#gold").should("have.value", 1);

    click("#cell54").then(() => {
      cy.get("#modal-content").should(
        "contain",
        "Victory! The area is safe again."
      );
      click("#modal-ok");

      cy.get("#modal-content").should("contain", "A new map awaits you...");
      click("#modal-ok");

      cy.get("#icon71a").should("exist");
      cy.get("#gold").should("have.value", 1);

      endTurn();
      cy.get("#icon54a").should("not.exist");

      click("#icon71a");
      click("#cell72");

      cy.get("#icon72a").should("exist");
    });
  });

  it("User completes a map and completes the whole game, reseting to map 1 with reset gold", () => {
    start(21);

    cy.get("#icon03n").should("not.exist"); // wolf in map 1
    cy.get("#gold").should("have.value", 1);

    endTurn();

    click("#icon64a");
    moreStrength();
    moreStrength();

    cy.get("#gold").should("have.value", 1);

    click("#cell54").then(() => {
      cy.get("#modal-content").should(
        "contain",
        "Victory! The area is safe again."
      );
      click("#modal-ok");
      cy.get("#modal-content").should(
        "contain",
        "Congratulations, you completed the game!" +
          " Those Barbarians won't be a threat for our beloved Rome anymore... right?"
      );
      click("#modal-ok");

      cy.location().should((location) => {
        expect(location.search).to.eq("");
      });
      cy.get("#icon03n").should("exist"); // wolf in map 1
      cy.get("#gold").should("have.value", 1);
    });
  });
});
