// upgrade_auto is for AI turn use of this function. In other case, this is invoked by an event_handler
function moveSoldier(unit, target) {
    let icon = document.getElementById(target).lastElementChild,
        movement,
        result;

    initialCell = unit.cell.replace('icon', '').split("");
    finalCell = target.replace('cell', '').replace('#', '').split("");
    
    //Check how many cells have it move as a total
    movement = Math.abs(initialCell[0] - finalCell[0]) + Math.abs(finalCell[1] - initialCell[1]);

    if ((icon === null) && (movement > 0) && (movement <= unit.movements)
        /*
        && ((initialCell[0] - finalCell[0] < unit.movements) || (finalCell[0] - initialCell[0] < unit.movements))
        && ((initialCell[1] - finalCell[1] < unit.movements) || (finalCell[1] - initialCell[1] < unit.movements))
        */
        ){

        //Move the soldier icon to he selected cell, and calculate movements left 

        //$(unit.cell).css({'background': iconColor, 'border-radius' : iconShape, 'display' : display});
        //unit.cell = 'icon'+initialCell[2];

        unit.cell = 'icon' + finalCell[0] + '' + finalCell[1] + initialCell[2];

        result = checkEncounter(unit);

        unit.movements = (result !== 'none') ? 0 : unit.movements - movement;

        switch (unit.player) {
            case 'Roman':
                if (result === 'looses'){
                    $('#cell' + finalCell[0] + '' + finalCell[1]).html('');
                    
                } else if ((result === 'wins') || (unit.movements === 0)){
                    $('#cell'+finalCell[0]+''+finalCell[1]).html('<a id="tooltip'+finalCell[0]+''+finalCell[1]+initialCell[2]
                        +'" href="#" data-toggle="tooltip" title="['+unit.name+']. movements: ['+unit.movements+'], strength: ['+unit.strength+']">'
                        +'<img class="icon" id="icon'+finalCell[0]+''+finalCell[1]+initialCell[2]+'" src="./src/images/board/SRUsed_del_def.png"></img></a>');

                } else if (result === 'none'){
                    $('#cell'+finalCell[0]+''+finalCell[1]).html('<a id="tooltip'+finalCell[0]+''+finalCell[1]+initialCell[2]
                        +'" href="#" data-toggle="tooltip" title="['+unit.name+']. movements: ['+unit.movements+'], strength: ['+unit.strength+']">'
                        +'<img class="icon" id="icon'+finalCell[0]+''+finalCell[1]+initialCell[2]+'" src="./src/images/board/SR_del_def.png"></img></a>');
                }
                break;
                
            case 'Barbarian':
                if (result === 'looses'){
                    $('#cell'+finalCell[0]+''+finalCell[1]).html('');
                    
                } else{
                    $('#cell'+finalCell[0]+''+finalCell[1]).html('<a id="tooltip'+finalCell[0]+''+finalCell[1]+initialCell[2]
                        +'" href="#" data-toggle="tooltip" title="['+unit.name+']. movements: ['+unit.totalMovements+'], strength: ['+unit.strength+']">'
                        +'<img class="icon" id="icon'+finalCell[0]+''+finalCell[1]+initialCell[2]+'" src="./src/images/board/SB_del_def.png"></img></a>');
                }
                break;
    }

        $('#cell' + initialCell[0] + '' + initialCell[1]).html('');
        $('.cell').off();
        $('.icon').click(showIconData);
        $('#info').hide();
        checkVictoryCondition();

    }else{

        if (unit.player === 'Roman'){
            alert('Invalid movement');
        }
    }
}

// Calculate the encounter result between a soldier and a soldier, or a soldier and a town; return true if unit wins.
function checkEncounter(unit){
    let adversary = '',
        conquered = 0,
        winner = '',
        loser = '',
        cell = unit.cell.replace('icon', '').split(""),
        
        iteration = [
            ('#cell' + (parseInt(cell[0]) + 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) + 1)),
            ('#cell' + (parseInt(cell[0]) - 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) - 1))
        ],
        
        iterationLength = iteration.length,
        unitsLength = units.length,
        i = 0,
        j = 0,
        k = 0,
        newId = '',
        title = '',
    //Finds anything? 'none', 'vence' 0 'wins'
        result = 'none',
        audio = '';

    // Look for fights with other soldiers next to itself
    for (i = 0; i < iterationLength; i++){
         if ( ($(iteration[i]+' a img').attr('id') !== undefined)
            && ( (($(iteration[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'e') && (unit.player === 'Roman'))
            ||(($(iteration[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'a') && (unit.player === 'Barbarian'))
            ||(($(iteration[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'n') && ((unit.player === 'Roman')||(unit.player === 'Barbarian'))) )

            ) {

            result = 'none';

            // Combat
            for (j = 0; j < unitsLength; j++){
                //console.log(units[j].cell.replace('icon', '').replace('a', '').replace('e','') + ' ===??? ' + iteration[i].replace('#cell', ''));
                if (units[j].cell.replace('icon', '').replace('a', '').replace('e','').replace('n','') === iteration[i].replace('#cell', '')) {
                    adversary = units[j];
                    break;
                }
            }

            // 100% win
            if (unit.strength > adversary.strength + 1) {
                winner = unit;
                loser = adversary;
                result = 'wins';
                destroyUnit(adversary);

            } else if (unit.strength + 1 < adversary.strength) {
                winner = adversary;
                loser = unit;
                result = 'looses';
                destroyUnit(unit);

            } else if (unit.strength === adversary.strength) {

                // Random winner (50%)
                if (Math.round(Math.random() * 1) === 1) {
                    winner = unit;
                    loser = adversary;
                    result = 'wins';
                    destroyUnit(adversary);

                } else {
                    winner = adversary;
                    loser = unit;
                    result = 'looses';
                    destroyUnit(unit);
                }
            } else if (unit.strength + 1 === adversary.strength) {

                // 25%
                if (Math.round(Math.random() * 3) === 0) {
                    winner = unit;
                    loser = adversary;
                    result = 'wins';
                    destroyUnit(adversary);

                } else {
                    winner = adversary;
                    loser = unit;
                    result = 'looses';
                    destroyUnit(unit);
                }

            } else if (unit.strength === adversary.strength + 1){

                // 25%
                if (Math.round(Math.random() * 3) !== 0) {
                    winner = unit;
                    loser = adversary;
                    result = 'wins';
                    destroyUnit(adversary);

                } else {
                    winner = adversary;
                    loser = unit;
                    result = 'looses';
                    destroyUnit(unit);
                }
            }

            // Loot for kill
            if ((winner.player === 'Roman')&&(loser.player !== 'Neutral')){
                gold[0]++;
                $('#gold').val(gold[0]);

            }else if ((winner.player === 'Barbarian')&&(loser.player !== 'Neutral')){
                gold[1]++;
            }

            // If not dead yet, keep looking for fights
            if (loser === unit){
                break;
            }
        }
    }

    // If unit is still alive, it can conquest towns
    if (result !== 'looses') {

        for (i = 0; i < iterationLength; i++){

            if (  ($(iteration[i]+' a img').attr('id') !== undefined)
                && (($(iteration[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'N')
                || (($(iteration[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'E') && (unit.player === 'Roman'))
                || (($(iteration[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'A') && (unit.player === 'Barbarian')) )
                ) {

               //.log($(iteration[0]).attr('id').replace('icon', '').charAt(2));

                result = 'wins';

                unitsLength = units.length;

                // Find target unit in array 
                for (j = 0; j < unitsLength; j++){
                    if (units[j].cell === ($(iteration[i]+' img').attr('id'))) {
                        conquered = j;
                        break;
                    }
                }

                units[conquered].player = unit.player;
                units[conquered].name = getRandomName('Town', unit.player);

                if (unit.player === 'Roman'){
                    $(iteration[i]+' a img').attr('src', './src/images/board/AR_del_def.png');
                    newId = $(iteration[i]+' img').attr('id').replaceAt( $(iteration[i]+' img').attr('id').length - 1, 'A');
                    $(iteration[i]+' a img').attr('id', newId);
                    units[conquered].cell = units[conquered].cell.replaceAt(units[conquered].cell.length - 1, 'A');

                    title = '['+units[conquered].name+']. quantity: ['+units[conquered].stats.quantity+']. quality: ['+units[conquered].stats.quality+']';

                    audio = new Audio('./src/sounds/rom_conquest.mp3');
                } else if (unit.player === 'Barbarian'){
                    $(iteration[i]+' a img').attr('src', './src/images/board/AB_del_def.png');
                    newId = $(iteration[i]+' img').attr('id').replaceAt( $(iteration[i]+' img').attr('id').length - 1, 'E');
                    $(iteration[i]+' a img').attr('id', newId);
                    units[conquered].cell = units[conquered].cell.replaceAt(units[conquered].cell.length - 1, 'E');
                    audio = new Audio('./src/sounds/bar_conquest.mp3');

                    title = '['+units[conquered].name+']';
                }

                $(iteration[i]+' a').attr('title', title);
                // A soldier can only conquest one town each turn 
                audio.play();
            }
        }
    }
    return result;
}

// upgrade_auto is for AI turn use of this function. In other case, this is invoked by an event_handler
function upgradeMode(unit, upgrade){
    const errorMessage = 'You don\'t have enough gold!';
    
    let money = 0,
        cell = '',
        image = '',
        title = '';
    
    if (unit.player === 'Roman'){
        index = 0;
        image = 'AR_del_def';
        
    } else if (unit.player === 'Barbarian'){
        index = 1;
        image = 'AB_del_def';
    }

    if (upgrade === 'improve_quantity'){

        if (unit.stats.quantityUpgradePrice <= gold[index]){
            gold[index] -= unit.stats.quantityUpgradePrice;
            unit.stats.quantityUpgradePrice += unit.stats.quantityUpgradePrice;
            unit.stats.quantity++;
            $('#gold').val(gold[index]);

        } else{
            alert(errorMessage);
        }

    } else if (upgrade === 'improve_quality'){

        if (unit.stats.qualityUpgradePrice <= gold[index]){
            gold[index] -= unit.stats.qualityUpgradePrice;
            unit.stats.qualityUpgradePrice += unit.stats.qualityUpgradePrice;
            unit.stats.quality++;
            $('#gold').val(gold[index]);

        } else{
            alert(errorMessage);
        }
    }

    cell = unit.cell.replace('icon', '#cell')
    cell = cell.substring(0, cell.length - 1);

    if (unit.player === 'Roman'){
        title = '['+unit.name+']. Quantity: ['+unit.stats.quantity+'], Quality: ['+unit.stats.quality+']';
        
    } else if (unit.player === 'Barbarian'){
        title = '['+unit.name+']';
    }

    $(cell).html('<a id="tooltip'+unit.cell.replace('icon','')
            +'" href="#" data-toggle="tooltip" title="'+title+'">'
            +'<img class="icon" id="'+unit.cell+'" src="./src/images/board/'+image+'.png"></img></a>');

    $('#info').hide();
    $('.icon').click(showIconData);
}