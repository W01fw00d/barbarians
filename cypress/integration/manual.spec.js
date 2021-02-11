/// <reference types="cypress" />

context('Manual testing', () => {
  it('Map 1', () => {
    // This is a hack to allow developer to manually test the game inside cypress window with auto-closing alerts
    cy.visit('main.html');
    cy.on('window:alert', cy.stub());
  })
})
