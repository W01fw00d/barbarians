/// <reference types="cypress" />

import {
  start,
  click,
  canSeeSoldierInfo,
  moreStrength,
  endTurn,
} from "../../utils/ui.js";

context("Soldiers actions", () => {
  it("Improve soldier strength if enough gold", () => {
    start();

    cy.get("#soldier_info").should("not.be.visible");
    click("#icon32a");
    canSeeSoldierInfo();

    cy.get("#strength").should("contain", "Combat strength: [1].");
    moreStrength();
    cy.get("#strength").should("contain", "Combat strength: [2].");
  });

  it("Do NOT improve soldier strength if NOT enough gold", () => {
    start();

    cy.get("#soldier_info").should("not.be.visible");
    click("#icon32a");
    canSeeSoldierInfo();

    cy.get("#strength").should("contain", "Combat strength: [1].");
    moreStrength();
    cy.get("#strength").should("contain", "Combat strength: [2].");
    moreStrength();

    cy.get("#modal-content").should("contain", "You don't have enough 💰!");
    click("#modal-ok");

    cy.get("#strength").should("contain", "Combat strength: [2].");
  });

  it("When a soldier strength is updated, the price raises only for that soldier", () => {
    start(18);
    endTurn();

    click("#icon70a");

    cy.get("#strength").should("contain", "Combat strength: [1].");
    cy.get("#improve_strength").should("contain", "Improve Strength (1 💰)");
    cy.get("#gold").should("have.value", 4);
    moreStrength();
    cy.get("#gold").should("have.value", 3);
    cy.get("#strength").should("contain", "Combat strength: [2].");
    cy.get("#improve_strength").should("contain", "Improve Strength (2 💰)");

    click("#icon71a");
    cy.get("#strength").should("contain", "Combat strength: [1].");
    cy.get("#improve_strength").should("contain", "Improve Strength (1 💰)");
    moreStrength();
    cy.get("#gold").should("have.value", 2);
    cy.get("#strength").should("contain", "Combat strength: [2].");
    cy.get("#improve_strength").should("contain", "Improve Strength (2 💰)");
  });

  it("Destroy one of the soldiers after confirmation", () => {
    start();
    endTurn();

    click("#icon32a");
    canSeeSoldierInfo();

    cy.on("window:confirm", () => true);
    click("#destroy");

    cy.get("#icon32a").should("not.exist");
  });

  it("Do not destroy one of the soldiers after confirmation", () => {
    start();
    endTurn();

    click("#icon32a");
    canSeeSoldierInfo();

    cy.on("window:confirm", () => false);
    click("#destroy");

    cy.get("#icon32a").should("exist");
  });
});
