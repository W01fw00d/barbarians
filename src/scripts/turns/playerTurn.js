// Returns a name string, chosen randomly from the names array 
function getRandomName(type, faction){
    let names, randomNumber;

    switch(type){

        case 'Soldier':
            names = faction === 'Roman' ? 
                romanSoldierNames : barbarianSoldierNames;

            break;
            
        case 'Town':
            names = faction === 'Roman' ? 
                romanTownNames : barbarianTownNames;
            
            break;
    }

    randomNumber = Math.floor(Math.random() * (names.length - 1));
    names.splice(randomNumber, 1);

    return names[randomNumber];
}

// End current player turn, and provides 3 gold to each player
function endTurn(){
    let unitsLength;
    
    let i = 0,
        id = '',
        unit_i;

    generateSoldiers('Roman');
    turnAI();
    generateSoldiers('Barbarian');
    gold[1] += 3;
    gold[0] += 3;
    $('#gold').val(gold[0]);
    
    unitsLength = units.length;

    for (i = 0; i < unitsLength; i++){

        unit_i = units[i];
        // Soldiers will capture adjacent towns automatically if they are besides them at the end of turn
        if ((unit_i.player !== 'Neutral') && (unit_i.type === 'Soldier')){
            checkEncounter(unit_i);
            
            unit_i.movements = unit_i.totalMovements;

            // If it's a Roman Soldier, colour it in order to indicate that it can move again 
            if (unit_i.player === 'Roman'){
                id = $('#'+unit_i.cell).attr('id').replace('icon', '').split("");
                
                $('#cell' + id[0] + id[1]).html('<a id="tooltip' + id[0] + id[1]
                    +'a" href="#" data-toggle="tooltip" title="['+unit_i.name+']. Moves: ['+unit_i.movements+'], Strength: ['+unit_i.strength+']">'
                        +'<img class="icon" id="icon'+id[0]+id[1]+'a" src="./src/images/board/SR_del_def.png"></img></a>');
            }
        }
    }

    $('.icon').off();
    $('.icon').click(showIconData);

    checkVictoryCondition();
}

// Iterates through towns array and, if possible, generate soldiers equals to the quantity variable; with strength equals to quality variable
function generateSoldiers(player){
    var i = 0;
    var j = 0;
    var unitsLength = units.length;
    var soldiers = 0;
    var quality = 0;
    var movements = 0;
    var cell = '';
    var emptyCell = '';
    var id = '';
    var randomName = '';

    var iteration = '';
    var iterationLength = '';

    for(i = 0; i < unitsLength; i++ ){

        if ((units[i].type === 'Town') && (units[i].player === player)){

            soldiers = units[i].stats.quantity;
            quality = units[i].stats.quality;

            cell = units[i].cell.replace('icon','').split("");

            iteration = [
                ('#cell' + (parseInt(cell[0]) + 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) + 1)),
                ('#cell' + (parseInt(cell[0]) - 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) - 1))
            ];

            // Stop soldiers moving to non-existant cells
            if (parseInt(cell[0]) === 7){
                iteration.splice(0, 1);
            }else if (parseInt(cell[0]) === 0){
                iteration.splice(2, 1);
            }

            if (parseInt(cell[1]) === 7){
                iteration.splice(1, 1);
            }else if (parseInt(cell[1]) === 0){
                iteration.splice(3, 1);
            }

            iterationLength = iteration.length;


            //Will generate soldiers while free cells and dependant of quantity var of town 
            for (j = 0; (j < iterationLength) && (soldiers > 0); j++){

                if ( ($(iteration[j]+' img').attr('id') === undefined ) ){

                    emptyCell = iteration[j].replace('#cell','').split("");

                    randomName = getRandomName('Soldier', player);

                    if (player === 'Roman'){
                        id = 'icon'+emptyCell[0]+emptyCell[1]+'a';
                        movements = 2;
                        image = 'SR_del_def';

                    } else if (player === 'Barbarian'){
                        id = 'icon'+emptyCell[0]+emptyCell[1]+'e';
                        movements = 1;
                        image = 'SB_del_def';
                    }
                    
                    $(iteration[j]).html('<a id="tooltip'+i+''+j+cell
                        +'" href="#" data-toggle="tooltip" title="['+randomName+']. movements: ['+movements+'], strength: ['+units[i].stats.quality+']">'
                        +'<img class="icon" id="'+id+'" src="./src/images/board/' + image + '.png"></img></a>');

                    units.push(
                        {cell: id, player: player, type: 'Soldier', name: randomName, movements: movements, totalMovements: movements, strength: quality});

                    // Resolve possible encounters when this unit appears besides other enemy unit
                    checkEncounter(units[units.length - 1]);

                    soldiers--;
                }
            }
        }
    }
}

// Allows soldier to move while movements left
function moveMode(icon, unit){
    let target;
    //movements = unit.movements;

    //$('#'+icon).html('<form><input readonly>'+movements+'</input></form>');

    $('.cell').off();
    //movements = movements - $('.cell').click({unit: unit}, moveSoldier).data("result");

    $('.cell').click(function(){
        var target = this.id;
        if ((unit.movements > 0) && (unit.cell.replace('icon', '').substring(0, 2) !== this.id.replace('cell', ''))){
            moveSoldier(unit, target);
        }

    });

    $('#destroy').off();
    $('#destroy').click(function(){
        if (confirm('Do you want to destroy current soldier?')){
            destroyUnit(unit);
            $('.cell').off();
            $('#info').hide();
            $('.icon').off();
            $('.icon').click(showIconData);
        }
    });
}