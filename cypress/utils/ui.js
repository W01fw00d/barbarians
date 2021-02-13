export const start = (level) => cy.visit(`main.html${level ? `?level=${level}` : ``}`);

export const click = (selector) => cy.get(selector).click();

export const endTurn = () => cy.get('#end_turn').click();
export const moreStrength = () => cy.get('#improve_strength').click();

export const canSeeSoldierInfo = () => cy.get('#soldier_info').should('be.visible');

export const isMobsCount = (faction, expected) => {
    const factionsMap = {
        roman: 'SR',
        barbarian: 'SB',
        nature: 'L',
    };

    return cy.get('#map')
        .find(`img[src="./src/images/board/${factionsMap[faction]}_del_def.png"]`)
        .should('have.length', expected);
}
