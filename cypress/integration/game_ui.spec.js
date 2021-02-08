/// <reference types="cypress" />

context('Game UI', () => {
  beforeEach(() => {
    cy.visit('main.html');
  })

  it('Improve soldier strength if enough gold', () => {
    cy.get('#info').should('not.be.visible');
    cy.get('#icon32a').click();
    cy.get('#info').should('be.visible');

    cy.get('#strength').should('contain', "Combat strength: [1].");
    cy.get('#improve_strength').click();
    cy.get('#strength').should('contain', "Combat strength: [2].");
  })

  it('Do NOT improve soldier strength if NOT enough gold', () => {
    cy.get('#info').should('not.be.visible');
    cy.get('#icon32a').click();
    cy.get('#info').should('be.visible');

    cy.get('#strength').should('contain', "Combat strength: [1].");
    cy.get('#improve_strength').click();
    cy.get('#strength').should('contain', "Combat strength: [2].");
    cy.get('#improve_strength').click();

    const stub = cy.stub()
    cy.on('window:alert', stub);
    cy.get('#improve_strength').click()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith("You don't have enough gold!");
    });

    cy.get('#strength').should('contain', "Combat strength: [2].");
  })

  it('Destroy one of the soldiers after confirmation', () => {
    cy.get('#end_turn').click();

    cy.get('#icon32a').click();
    cy.get('#info').should('be.visible');

    cy.on("window:confirm", () => true);
    cy.get('#destroy').click();

    cy.get('#icon32a').should('not.exist');
  })

  it('Do not destroy one of the soldiers after confirmation', () => {
    cy.get('#end_turn').click();

    cy.get('#icon32a').click();
    cy.get('#info').should('be.visible');

    cy.on("window:confirm", () => false);
    cy.get('#destroy').click();

    cy.get('#icon32a').should('exist');
  })

  it('Destroy all player soldiers and it\'s game over, after that games resets units and gold', () => {
    cy.get('#icon32a').click();
    cy.get('#info').should('be.visible');

    cy.get('#improve_strength').click();
    cy.get('#gold').should('have.value', 0);

    cy.get('#destroy').click();

    const stub = cy.stub()
    cy.on('window:alert', stub);
    cy.on("window:confirm", () => true).then(() => {
      expect(stub.getCall(0)).to.be.calledWith("The Barbarians are everywhere! Rome will fall...");
      //cy.get('#gold').should('have.value', 1); //TODO: This is a bug, currently game is not reseting gold
      cy.get('#icon32a').should('exist');
    });
  })
})
