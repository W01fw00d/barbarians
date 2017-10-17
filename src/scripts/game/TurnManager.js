function TurnManager(encounter, levelManager, namesManager, iconTemplates) {
    this.encounter = encounter;
    this.levelManager = levelManager;
    this.namesManager = namesManager;
    this.iconTemplates = iconTemplates;
}

// Iterates through towns array and, if possible, generate soldiers equals to the quantity variable; with strength equals to quality variable
TurnManager.prototype.generateSoldiers = function(player, players){
    let quantity, quality, cell, emptyCell, annotation, movements, image, iterations, html, mobTemplate,
        towns = player.units.towns,
        mobs = player.units.mobs;

    towns.forEach((town, townsIndex) => {
        quantity = town.stats.quantity;
        quality = town.stats.quality;

        cell = town.cell.replace('icon','').split("");

        iterations = [
            ('#cell' + (parseInt(cell[0]) + 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) + 1)),
            ('#cell' + (parseInt(cell[0]) - 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) - 1))
        ];

        //TODO
        // Stop soldiers appearing in non-existant cells
        if (parseInt(cell[0]) === 7){
            iterations.splice(0, 1);

        } else if (parseInt(cell[0]) === 0){
            iterations.splice(2, 1);
        }

        if (parseInt(cell[1]) === 7){
            iterations.splice(1, 1);

        } else if (parseInt(cell[1]) === 0){
            iterations.splice(3, 1);
        }

        iterations.some((iteration, iterationsIndex) => {
            if ($(iteration + ' img').attr('id') === undefined){
                emptyCell = iteration.replace('#cell','').split("");

                randomName = this.namesManager.getRandomName('Soldier', player);
                
                if (player.name === 'human'){
                    annotation = 'a';
                    movements = 2;
                    mobTemplate = this.iconTemplates.getHumanMob;

                } else if (player.name === 'ai'){
                    annotation = 'e';
                    movements = 1;
                    mobTemplate = this.iconTemplates.getAIMob;
                }

                id = 'icon' + emptyCell[0] + emptyCell[1] + annotation;
                
//                id = emptyCell[0] + emptyCell[1] + annotation;
                $(iteration[iterationsIndex]).html(mobTemplate.apply(this.iconTemplates, [id, randomName, movements, town.stats.quality]));
                
//                $(iteration[j]).html('<a id="tooltip' + townsIndex + '' + iterationsIndex + cell
//                                     + '" href="#" data-toggle="tooltip" title="[' + randomName + ']. movements: [' + movements + '], strength: [' + town.stats.quality + ']">'
//                                     + '<img class="icon" id="' + id + '" src="./src/images/board/' + image + '.png"></img></a>');

                mobs.push(
                    {cell: id, player: player, type: 'Soldier', name: randomName, movements: movements, totalMovements: movements, strength: quality});

                // Resolve possible encounters when this unit appears besides other enemy unit
                this.encounter.check(mobs[mobs.length - 1], players);

                quantity--;
                // Stop when there's no more quantity
                return quantity <= 0;
            }
        });
    });


//    let i, j;
//
//    var unitsLength = units.length;
//    var soldiers = 0;
//    var quality = 0;
//    var movements = 0;
//    var cell = '';
//    var emptyCell = '';
//    var id = '';
//    var randomName = '';
//
//    var iteration = '';
//    var iterationLength = '';
//
//    for(i = 0; i < unitsLength; i++ ){
//        if ((units[i].type === 'Town') && (units[i].player === player)){
//            soldiers = units[i].stats.quantity;
//            quality = units[i].stats.quality;
//
//            cell = units[i].cell.replace('icon','').split("");
//
//            iteration = [
//                ('#cell' + (parseInt(cell[0]) + 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) + 1)),
//                ('#cell' + (parseInt(cell[0]) - 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) - 1))
//            ];
//
//            // Stop soldiers moving to non-existant cells
//            if (parseInt(cell[0]) === 7){
//                iteration.splice(0, 1);
//
//            } else if (parseInt(cell[0]) === 0){
//                iteration.splice(2, 1);
//            }
//
//            if (parseInt(cell[1]) === 7){
//                iteration.splice(1, 1);
//
//            } else if (parseInt(cell[1]) === 0){
//                iteration.splice(3, 1);
//            }
//
//            iterationLength = iteration.length;
//
//            //Will generate soldiers while free cells and dependant of quantity var of town 
//            for (j = 0; (j < iterationLength) && (soldiers > 0); j++){
//
//                if (($(iteration[j]+' img').attr('id') === undefined )){
//                    emptyCell = iteration[j].replace('#cell','').split("");
//
//                    randomName = getRandomName('Soldier', player);
//
//                    if (player === 'Roman'){
//                        id = 'icon'+emptyCell[0]+emptyCell[1]+'a';
//                        movements = 2;
//                        image = 'SR_del_def';
//
//                    } else if (player === 'Barbarian'){
//                        id = 'icon'+emptyCell[0]+emptyCell[1]+'e';
//                        movements = 1;
//                        image = 'SB_del_def';
//                    }
//
//                    $(iteration[j]).html('<a id="tooltip'+i+''+j+cell
//                                         +'" href="#" data-toggle="tooltip" title="['+randomName+']. movements: ['+movements+'], strength: ['+units[i].stats.quality+']">'
//                                         +'<img class="icon" id="'+id+'" src="./src/images/board/' + image + '.png"></img></a>');
//
//                    units.push(
//                        {cell: id, player: player, type: 'Soldier', name: randomName, movements: movements, totalMovements: movements, strength: quality});
//
//                    // Resolve possible encounters when this unit appears besides other enemy unit
//                    checkEncounter(units[units.length - 1]);
//
//                    soldiers--;
//                }
//            }
//        }
//    }
}

// TODO
// End current player turn, and provides 3 gold to each player
TurnManager.prototype.endTurn = function(currentMapLevel, players){
    //    let unitsLength;
    //
    //    let i = 0,
    //        id = '',
    //        unit_i;

    let id;
    
    this.generateSoldiers(players.human, players);
    players.ai.performTurn();

    this.generateSoldiers(players.ai, players);
    players.human.setGold(players.human.gold + 3);
    players.ai.gold += 3;

    //    unitsLength = units.length;

    players.ai.units.mobs.forEach(mob => {
        this.encounter.check(mob, players);

        mob.movements = mob.totalMovements;
    });

    players.human.units.mobs.forEach(mob => {
        this.encounter.check(mob, players);

        mob.movements = mob.totalMovements;

//        id = $('#' + mob.cell).attr('id').replace('icon', '').split("");
        
        id = mob.cell.replace('icon', '');
        

        // If it's a Roman Soldier, colour it in order to indicate that it can move again 
        $('#cell' + id[0] + id[1]).html(this.iconTemplates.getHumanMob(id, mob.name, mob.movements, mob.strength));
    });

    //    for (i = 0; i < unitsLength; i++){
    //        unit_i = units[i];
    //        // Soldiers will capture adjacent towns automatically if they are besides them at the end of turn
    //        if ((unit_i.player !== 'Neutral') && (unit_i.type === 'Soldier')){
    //            checkEncounter(unit_i);
    //
    //            unit_i.movements = unit_i.totalMovements;
    //
    //            // If it's a Roman Soldier, colour it in order to indicate that it can move again 
    //            if (unit_i.player === 'Roman'){
    //                id = $('#'+unit_i.cell).attr('id').replace('icon', '').split("");
    //
    //                $('#cell' + id[0] + id[1]).html('<a id="tooltip' + id[0] + id[1]
    //                                                +'a" href="#" data-toggle="tooltip" title="['+unit_i.name+']. Moves: ['+unit_i.movements+'], Strength: ['+unit_i.strength+']">'
    //                                                +'<img class="icon" id="icon'+id[0]+id[1]+'a" src="./src/images/board/SR_del_def.png"></img></a>');
    //            }
    //        }
    //    }
    //    $('.icon').off();
    //    $('.icon').click(showIconData);

    return this.levelManager.checkEndOfLevelCondition(currentMapLevel, players);
}