function Encounter(iconTemplates){
    this.iconTemplates = iconTemplates;
}

Encounter.prototype.iconTemplates;

Encounter.prototype.compareStrengths = function(unit, adversary) {
    let results = {
        winner: null,
        loser: null
    }

    // 100% win
    if (unit.strength > adversary.strength + 1) {
        winner = unit;
        loser = adversary;

    } else if (unit.strength + 1 < adversary.strength) {
        winner = adversary;
        loser = unit;

        // Random winner (50%)
    } else if (unit.strength === adversary.strength) {     
        if (Math.round(Math.random() * 1) === 1) {
            winner = unit;
            loser = adversary;

        } else {
            winner = adversary;
            loser = unit;
        }

        // 25%    
    } else if (unit.strength + 1 === adversary.strength) {
        if (Math.round(Math.random() * 3) === 0) {
            winner = unit;
            loser = adversary;

        } else {
            winner = adversary;
            loser = unit;
        }

    } else if (unit.strength === adversary.strength + 1){
        if (Math.round(Math.random() * 3) !== 0) {
            winner = unit;
            loser = adversary;

        } else {
            winner = adversary;
            loser = unit;
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

    new Audio('./src/sounds/' + audio + '.mp3').play();
}

Encounter.prototype.changeIcon = function(unit, winner) {
    const unitCell = unit.cell.replace('icon', '').split("");

    let html, id, mobTemplate;

//    unit.movements = (result !== 'none') ? 0 : unit.movements - movement;

    switch (unit.player) {
        case 'human':
            if (unit.movements > 0 && winner !== unit){
//                img = 'SR_del_def';
                mobTemplate = this.iconTemplates.getHumanMob;
                
            } else {
//                img = 'SRUsed_del_def';
                unit.movements = 0;
                mobTemplate = this.iconTemplates.getUsedHumanMob;
            } 
            break;

        case 'ai':
//            if (winner && (winner.player === unit.player)) {
//                img = 'SB_del_def';
                mobTemplate = this.iconTemplates.getAIMob;
//            }
            break;
    }

    id = unitCell[0] + '' + unitCell[1] + unitCell[2];
    
    // Cal the function within the IconTemplates context, if a function has been chosen
    html = mobTemplate ? mobTemplate.apply(this.iconTemplates, [id, unit.name, unit.movements, unit.strength]) : '';
        
//    html = mobTemplate ? mobTemplate(id, unit.name, unit.totalMovements, unit.strength) : '';
    
//    html = img ? '<a id="tooltip' + finalCell[0] + '' + finalCell[1] + initialCell[2]
//        + '" href="#" data-toggle="tooltip" title="[' + unit.name + ']. movements: [' + unit.totalMovements + '], strength: [' + unit.strength + ']">'
//        + '<img class="icon" id="icon' + finalCell[0] + '' + finalCell[1] + initialCell[2] + '" src="./src/images/board/' + img + '.png"></img></a>' : '';

    $('#cell' + unitCell[0] + '' + unitCell[1]).html(html);
//    $('#cell' + initialCell[0] + '' + initialCell[1]).html('');
    
//    $('.cell').off();
//    $('.icon').click(showIconData);
//    $('#info').hide();
//    checkEndOfLevelCondition();
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
                    //console.log(units[j].cell.replace('icon', '').replace('a', '').replace('e','') + ' ===??? ' + iteration[i].replace('#cell', ''));
                    if (units[j].cell.replace('icon', '').replace('a', '').replace('e','').replace('n','') === iteration[i].replace('#cell', '')) {
                        adversary = units[j];
                        break;
                    }
                }

                combatResults = this.compareStrengths(unit, adversary);

                this.destroyUnit(combatResults.loser);

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
                    //TODO -> getRandomName
                    //                units[conquered].name = getRandomName('Town', unit.player);

                    if (unit.player === 'human'){
                        this.updateConqueredRomanTown(iteration[i], unit, conqueredUnit);
                        
                    } else if (unit.player === 'ai'){
                        this.updateConqueredBarbarianTown(iteration[i], unit, conqueredUnit);
                    }
                    
                    // Update units lists
                    players[unit.player].units.towns.push(conqueredUnit);                    
                    players[townsAnnotationCorralation[typeOfCollindantUnit]].units.towns = units.filter(unit => {
                        return unit.player === "neutral";
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

    let audio;

    if (unit.player === 'human'){
        audio = new Audio('./src/sounds/scream.mp3');

    }else if (unit.player === 'ai'){
        audio = new Audio('./src/sounds/kill.mp3');

    }else if (unit.player === 'neutral'){
        audio = new Audio('./src/sounds/wolf_scream.mp3');
    }

    audio.play();
}