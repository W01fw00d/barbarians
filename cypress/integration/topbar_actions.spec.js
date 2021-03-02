/// <reference types="cypress" />

import { start, click, endTurn } from "../utils/ui.js";
import { barbariansMapOneFirstTurn } from "../utils/barbarians.js";

context("Topbar actions", () => {
  beforeEach(() => start());

  it("When user clicks on unmute music button, music gets unmuted and then, it can me muted again", () => {
    // Try to mute sound in browser, so no sound will really be heard when launching this test with ui
    cy.get("#mute_music").should("contain", "Unmute Music");

    click("#mute_music");

    cy.get("#mute_music").should("contain", "Mute Music");
    //TODO: demonstrate that sound is actually emited

    click("#mute_music");

    cy.get("#mute_music").should("contain", "Unmute Music");
  });

  it("When user clicks on unmute Narration button, Narration gets unmuted and then, it can me muted again", () => {
    // Try to mute sound in browser, so no sound will really be heard when launching this test with ui
    cy.get("#mute_narration").should("contain", "Unmute Narration");

    click("#mute_narration");

    cy.get("#mute_narration").should("contain", "Mute Narration");
    //TODO: demonstrate that sound is actually emited

    click("#mute_narration");

    cy.get("#mute_narration").should("contain", "Unmute Narration");
  });

  it("When user clicks next turn, a new player and AI unit should spawn and player gains 3 gold", () => {
    cy.get("#gold").should("have.value", 1);
    cy.get("#map")
      .find('img[src="./src/images/board/mob/roman/1.png"]')
      .should("have.length", 1);
    cy.get("#map")
      .find('img[src="./src/images/board/mob/barbarian/1.png"]')
      .should("have.length", 1);

    endTurn();

    cy.get("#gold").should("have.value", 4);
    cy.get("#map")
      .find('img[src="./src/images/board/mob/roman/1.png"]')
      .should("have.length", 2);

    barbariansMapOneFirstTurn();
  });
});
