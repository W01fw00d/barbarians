export const click = (selector) => cy.get(selector).click();

export const start = (level) => {
  cy.visit(
    `index.html${
      level ? `?level=${level}&` : `?`
    }muteNarration&disableAnimations`
  );
  click("#modal-ok").then(() => click("#modal-ok"));
};

export const endTurn = () => cy.get("#end_turn").click();
export const moreStrength = () => cy.get("#improve_strength").click();

export const canSeeSoldierInfo = () =>
  cy.get("#soldier_info").should("be.visible");

export const isMobsCount = (faction, expected) =>
  cy
    .get("#map")
    .find(`img[src="./src/images/board/mob/${faction}/1.png"]`)
    .should("have.length", expected);

export const isBarbarianMobsCount = (expected) =>
  cy
    .get("#map")
    .find(`img[src="./src/images/board/mob/barbarian/1.png"]`)
    .should("have.length", expected);
