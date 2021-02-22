/// <reference types="cypress" />

import { start, click, endTurn, isMobsCount } from "../../utils/ui.js";

context("Units movements", () => {
  it("User moves soldier 2 steps and cannot move anymore; then next turn user moves it 2 steps again", () => {
    start();

    click("#icon32a");
    cy.get("#movement").should("contain", "Movements left: [2]");
    click("#cell30");

    click('#icon30a[src="./src/images/board/SR_del_def_grey.png"]');
    cy.get("#movement").should("contain", "Movements left: [0]");
    click("#cell32");

    cy.get('#icon30a[src="./src/images/board/SR_del_def_grey.png"]').should(
      "exist"
    );

    endTurn();
    click('#icon30a[src="./src/images/board/SR_del_def.png"]');
    cy.get("#movement").should("contain", "Movements left: [2]");
    click("#cell32");

    cy.get('#icon32a[src="./src/images/board/SR_del_def_grey.png"]').should(
      "exist"
    );
  });

  it("User moves soldier 1 step and then move it 1 step again; after that, it cannot be moved anymore", () => {
    start();

    click("#icon32a");
    click("#cell31");

    click('#icon31a[src="./src/images/board/SR_del_def.png"]');
    cy.get("#movement").should("contain", "Movements left: [1]");
    click("#cell30");

    click('#icon30a[src="./src/images/board/SR_del_def_grey.png"]');
    cy.get("#movement").should("contain", "Movements left: [0]");
    click("#cell31");
    cy.get('#icon30a[src="./src/images/board/SR_del_def_grey.png"]').should(
      "exist"
    );
  });

  it("User cannot move soldier more than 2 steps", () => {
    start();

    click("#icon32a");
    click("#cell62");

    cy.get('#icon32a[src="./src/images/board/SR_del_def.png"]').should("exist");
    cy.get("#movement").should("contain", "Movements left: [2]");
  });

  it("User cannot move soldier into an obstacle", () => {
    start();

    click("#icon32a");
    click("#cell33");

    cy.get('#icon32a[src="./src/images/board/SR_del_def.png"]').should("exist");
    cy.get("#movement").should("contain", "Movements left: [2]");
  });

  it.skip("AI soldiers cannot move out-of-bounds", () => {
    //TODO bug : sometimes, map doesn't finish when it should
    // it seems that, when all barbarians soldiers are dead, if there's still a wolf or a barbarian town, game doesn't finish til next turn
    // another theory is that some barbarian soldiers are generated out-of-bounds, and not displayed? needs debugging and implement restrictions on soldier generation
    // Reproduced: sometimes soldiers move out of bounds, probably "inside" the mountains; or a soldier is generated inside other soldier
    start(3);

    isMobsCount("barbarian", 6);

    endTurn();

    cy.get("#map")
      .find('img[src="./src/images/board/SB_del_def.png"]')
      .should("have.length.at.least", 7); // AI randomly upgrades quantity, resulting in +2 barbarians instead of +1
  });
});
