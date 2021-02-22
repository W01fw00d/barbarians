/// <reference types="cypress" />

import { start, endTurn, click, canSeeSoldierInfo, moreStrength } from '../utils/ui.js';

context('Narrator', () => {
  it('Roman soldier kills barbarian', () => {
    start(23);
    click('#mute_narration');

    endTurn();

    click('#icon21a');
    canSeeSoldierInfo();
    moreStrength();
    moreStrength();

    cy.window().then(({ speechSynthesis }) => {
      expect(speechSynthesis.speaking).to.be.false;
    });
    click('#cell23').then(() => {
      cy.window().then(({ speechSynthesis }) => {
        expect(speechSynthesis.speaking).to.be.true;
      });
    });
  })

  it('Roman vs wolves', () => {
    start(23);
    click('#mute_narration');

    endTurn();

    click('#icon21a');
    canSeeSoldierInfo();

    cy.window().then(({ speechSynthesis }) => {
      expect(speechSynthesis.speaking).to.be.false;
    });
    click('#cell11').then(() => {
      cy.window().then(({ speechSynthesis }) => {
        expect(speechSynthesis.speaking).to.be.true;
      });
    });
  })

  it('Roman captures barbarian town', () => {
    start(23);
    click('#mute_narration');

    endTurn();

    click('#icon21a');
    canSeeSoldierInfo();

    cy.window().then(({ speechSynthesis }) => {
      expect(speechSynthesis.speaking).to.be.false;
    });
    click('#cell30').then(() => {
      cy.window().then(({ speechSynthesis }) => {
        expect(speechSynthesis.speaking).to.be.true;
      });
    });
  })

  it('Roman captures free town', () => {
    start(23);
    click('#mute_narration');

    endTurn();

    click('#icon21a');
    canSeeSoldierInfo();

    cy.window().then(({ speechSynthesis }) => {
      expect(speechSynthesis.speaking).to.be.false;
    });
    click('#cell31').then(() => {
      cy.window().then(({ speechSynthesis }) => {
        expect(speechSynthesis.speaking).to.be.true;
      });
    });
  })

  it('Barbarian kills roman soldier', () => {
    start(23);
    click('#mute_narration');

    endTurn();

    click('#icon21a');

    cy.window().then(({ speechSynthesis }) => {
      expect(speechSynthesis.speaking).to.be.false;
    });
    click('#cell23').then(() => {
      cy.window().then(({ speechSynthesis }) => {
        expect(speechSynthesis.speaking).to.be.true;
      });
    });
  })

  it('Barbarian vs wolves', () => {
    start(24);
    click('#mute_narration');

    cy.window().then(({ speechSynthesis }) => {
      expect(speechSynthesis.speaking).to.be.false;
    });
    endTurn().then(() => {
      cy.window().then(({ speechSynthesis }) => {
        expect(speechSynthesis.speaking).to.be.true;
      });
    });
  })

  it.skip('Barbarian captures roman town', () => {
    // TODO bug and test: seems that it isnt possible for a barbarian to capture a roman town
    // (as it gets captured back by the new roman recruit at beginning of next turn),
    // because of how AI turn order works different from player
    start(26);
    click('#mute_narration');

    cy.window().then(({ speechSynthesis }) => {
      expect(speechSynthesis.speaking).to.be.false;
    });
    endTurn().then(() => {
      cy.window().then(({ speechSynthesis }) => {
        expect(speechSynthesis.speaking).to.be.true;
      });
    });
  })

  it('Barbarian captures free town', () => {
    start(25);
    click('#mute_narration');

    cy.window().then(({ speechSynthesis }) => {
      expect(speechSynthesis.speaking).to.be.false;
    });
    endTurn().then(() => {
      cy.wait(500);
      cy.window().then(({ speechSynthesis }) => {
        expect(speechSynthesis.speaking).to.be.true;
      });
    });
  })
})
