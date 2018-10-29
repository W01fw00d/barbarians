function Encounter(iconTemplates, namesManager, soundManager){
    this.iconTemplates = iconTemplates;
    this.namesManager = namesManager;
    this.soundManager = soundManager;
}

Encounter.prototype.iconTemplates;

Encounter.prototype.compareStrengths = function(unit, adversary) {
    let results = {
        winner: null,
        loser: null
    }

    // 100% win
    if (unit.strength > adversary.strength + 1) {
        results.winner = unit;
        results.loser = adversary;

    } else if (unit.strength + 1 < adversary.strength) {
        results.winner = adversary;
        results.loser = unit;

        // Random winner (50%)
    } else if (unit.strength === adversary.strength) {
        if (Math.round(Math.random() * 1) === 1) {
            results.winner = unit;
            results.loser = adversary;

        } else {
            results.winner = adversary;
            results.loser = unit;
        }

        // 25%
    } else if (unit.strength + 1 === adversary.strength) {
        if (Math.round(Math.random() * 3) === 0) {
            results.winner = unit;
            results.loser = adversary;

        } else {
            results.winner = adversary;
            results.loser = unit;
        }

    } else if (unit.strength === adversary.strength + 1){
        if (Math.round(Math.random() * 3) !== 0) {
            results.winner = unit;
            results.loser = adversary;

        } else {
            results.winner = adversary;
            results.loser = unit;
        }
    }

    return results;
}

Encounter.prototype.updateConqueredRomanTown = function(iteration, unit, conqueredUnit) {
    const extraTitle = '. quantity: [' + conqueredUnit.stats.quantity + ']. quality: [' + conqueredUnit.stats.quality + ']';
    this.updateConqueredTown(iteration, unit, conqueredUnit, 'A', 'AR_del_def', 'rom_conquest', extraTitle);
}

Encounter.prototype.updateConqueredBarbarianTown = function(iteration, unit, conqueredUnit) {
    this.updateConqueredTown(iteration, unit, conqueredUnit, 'E', 'AB_del_def', 'bar_conquest', '');
}

Encounter.prototype.updateConqueredTown = function(iteration, unit, conqueredUnit, annotation, img, audio, extraTitle) {
    newId = $(iteration + ' img').attr('id').replaceAt($(iteration+' img').attr('id').length - 1, annotation);
    title = '[' + conqueredUnit.name + ']' + extraTitle;

    $(iteration + ' a img').attr('id', newId);
    $(iteration + ' a img').attr('src', './src/images/board/' + img + '.png');
    $(iteration + ' a').attr('title', title);

    conqueredUnit.cell = conqueredUnit.cell.replaceAt(conqueredUnit.cell.length - 1, annotation);

    this.soundManager.sfx.play(audio);
}

Encounter.prototype.changeIcon = function(unit, winner) {
    const unitCell = unit.cell.replace('icon', '').split("");

    let html, id, mobTemplate;

    //    unit.movements = (result !== 'none') ? 0 : unit.movements - movement;

    switch (unit.player) {
        case 'human':
            if (unit.movements > 0 && winner !== unit){
                mobTemplate = this.iconTemplates.getHumanMob;

            } else {
                unit.movements = 0;
                mobTemplate = this.iconTemplates.getUsedHumanMob;
            }
            break;

        case 'ai':
            unit.movements = 1;
            mobTemplate = this.iconTemplates.getAIMob;
            break;
                       }

    id = unitCell[0] + '' + unitCell[1] + unitCell[2];

    // Cal the function within the IconTemplates context, if a function has been chosen
    html = mobTemplate ? mobTemplate.apply(this.iconTemplates, [id, unit.name, unit.movements, unit.strength]) : '';

    $('#cell' + unitCell[0] + '' + unitCell[1]).html(html);
}

// Calculate the encounter result between a soldier and a soldier, or a soldier and a town; return true if unit wins.
Encounter.prototype.check = function(unit, players) {
    let adversary,
        conquered,
        cell = unit.cell.replace('icon', '').split(""),

        iteration = [
            ('#cell' + (parseInt(cell[0]) + 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) + 1)),
            ('#cell' + (parseInt(cell[0]) - 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) - 1))
        ],

        iterationLength = iteration.length,
        conqueredUnit,
        units,
        unitsLength,
        combatResults = results = {
            winner: null,
            loser: null
        },
        i = 0,
        j = 0,
        k = 0,
        newId = '',
        title = '',
        audio = '',
        cellId,
        typeOfCollindantUnit,
        mobsAnnotationCorralation = {
            e: 'ai',
            a: 'human',
            n: 'neutral'
        },
        townsAnnotationCorralation = {
            E: 'ai',
            A: 'human',
            N: 'neutral'
        };

    // Look for fights with other soldiers next to itself
    for (i = 0; i < iterationLength; i++) {
        cellId = $(iteration[i]+' a img').attr('id');

        if (cellId !== undefined) {
            typeOfCollindantUnit = cellId.replace('icon', '').charAt(2);

            if (((typeOfCollindantUnit === 'e') && (unit.player === 'human'))
                || ((typeOfCollindantUnit === 'a') && (unit.player === 'ai'))
                || typeOfCollindantUnit === 'n') {

                units = players[mobsAnnotationCorralation[typeOfCollindantUnit]].units.mobs;
                unitsLength = units.length;

                // Find adversary
                for (j = 0; j < unitsLength; j++){
                    if (units[j].cell.replace('icon', '').replace('a', '').replace('e','').replace('n','') === iteration[i].replace('#cell', '')) {
                        adversary = units[j];
                        break;
                    }
                }

                combatResults = this.compareStrengths(unit, adversary);

                this.destroyUnit(combatResults.loser, players);

                // Loot for killing soldiers
                if (combatResults.winner.player === 'human' && combatResults.loser.player === 'ai'){
                    players.human.setGold(players.human.gold + 1);

                } else if (combatResults.winner.player === 'ai' && combatResults.loser.player === 'human'){
                    players.ai.setGold(players.ai.gold + 1);
                }

                // If not dead yet, keep looking for fights
                if (combatResults.loser === unit){
                    break;
                }
            }
        }
    }

    // If unit is still alive, it can conquest towns
    if (combatResults.loser !== unit) {
        // A soldier can only conquest one town each turn
        for (i = 0; i < iterationLength && !conquered; i++){
            cellId = $(iteration[i]+' a img').attr('id');

            if (cellId !== undefined) {
                typeOfCollindantUnit = cellId.replace('icon', '').charAt(2);

                if (((typeOfCollindantUnit === 'E') && (unit.player === 'human'))
                    || ((typeOfCollindantUnit === 'A') && (unit.player === 'ai'))
                    || (typeOfCollindantUnit === 'N')) {

                    units = players[townsAnnotationCorralation[typeOfCollindantUnit]].units.towns;
                    unitsLength = units.length;

                    // Find target unit in array
                    for (j = 0; j < unitsLength; j++){
                        if (units[j].cell === ($(iteration[i]+' img').attr('id'))) {
                            conquered = j;
                            break;
                        }
                    }

                    conqueredUnit = units[conquered];
                    conqueredUnit.player = unit.player;
                    conqueredUnit.factionTag = unit.factionTag;

                    units[conquered].name = this.namesManager.getRandomName('town', unit.player);

                    if (unit.player === 'human'){
                        this.updateConqueredRomanTown(iteration[i], unit, conqueredUnit);

                    } else if (unit.player === 'ai'){
                        this.updateConqueredBarbarianTown(iteration[i], unit, conqueredUnit);
                    }

                    // Update units lists
                    players[unit.player].units.towns.push(conqueredUnit);
                    players[townsAnnotationCorralation[typeOfCollindantUnit]].units.towns = units.filter(unit => {
                        return unit.player === townsAnnotationCorralation[typeOfCollindantUnit];
                    });
                }
            }
        }
    }

    if (combatResults.loser !== unit){
        this.changeIcon(unit, combatResults.winner);
    }
}

Encounter.prototype.destroyUnit = function(unit, players) {
    $('#cell' + unit.cell.replace('icon','').replace('a', '').replace('e', '').replace('n','')).html('');

    units = players[unit.player].units.mobs;
    units.splice(units.indexOf(unit), 1);

    let soundFile;

    if (unit.player === 'human'){
        soundFile = 'scream';

    } else if (unit.player === 'ai'){
        soundFile = 'kill';

    } else if (unit.player === 'neutral'){
        soundFile = 'wolf_scream';
    }

    this.soundManager.sfx.play(soundFile);
}

Encounter.prototype.improveUnitStrength = function(unit, players) {
    players.human.upgradeMode(unit, 'improve_strength');
}
