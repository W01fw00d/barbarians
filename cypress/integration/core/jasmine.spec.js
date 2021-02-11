/// <reference types="cypress" />

context('Jasmine Unit Tests', () => {
  it('Check if tests are green', () => {
    // This is a hack to allow executing all utests and ftests faster
    cy.visit('SpecRunner.html');

    cy.get('.jasmine-overall-result.jasmine-passed').should('exist');
  })
})
