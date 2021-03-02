export const barbariansMapOneFirstTurn = () => {
  cy.get("#map")
    .find('img[src="./src/images/board/mob/barbarian/1.png"]')
    .then(({ length }) => {
      // AI randonmly chooses between improving quantity or quality, so 1 - 2 units can spawn in first turn.
      // Also, strength can be improved
      if (length === 1) {
        cy.get("#map")
          .find('img[src="./src/images/board/mob/barbarian/2.png"]')
          .should("have.length", length);
      } else if (length === 2) {
        cy.expect(length).to.equal(2);
      } else {
        cy.expect(length).to.equal(3);
      }
    });
};
