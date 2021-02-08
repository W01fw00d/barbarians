/// <reference types="cypress" />

context('Map over', () => {
  beforeEach(() => {
    cy.visit('main.html');
  })

  it('When user clicks reset map, units and golds gets reset', () => {
    cy.get('#gold').should('have.value', 1);
    cy.get('#map')
      .find('img[src="./src/images/board/SR_del_def.png"]')
      .should('have.length', 1);
    cy.get('#map')
      .find('img[src="./src/images/board/SB_del_def.png"]')
      .should('have.length', 1);

    cy.get('#end_turn').click();

    cy.get('#gold').should('have.value', 4);
    cy.get('#map')
      .find('img[src="./src/images/board/SR_del_def.png"]')
      .should('have.length', 2);
    cy.get('#map')
      .find('img[src="./src/images/board/SB_del_def.png"]')
      .should('have.length', 2);

    cy.get('#reset_map').click();

    //cy.get('#gold').should('have.value', 1); //TODO: (github issue #12) This is a bug, currently game is not reseting gold or units (after first turn, dead units appear again)
    cy.get('#map')
      .find('img[src="./src/images/board/SR_del_def.png"]')
      .should('have.length', 1);
    cy.get('#map')
      .find('img[src="./src/images/board/SB_del_def.png"]')
      .should('have.length', 1);
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
      //cy.get('#gold').should('have.value', 1); //TODO: (github issue #12) This is a bug, currently game is not reseting gold or units (after first turn, dead units appear again)
      cy.get('#icon32a').should('exist');
    });
  })
})
