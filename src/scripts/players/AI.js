function AI() {
    Player.call(this);
    this.name = 'ai';
    this.gold = 1;
}

// Performs the AI enemy turn: it behaves quite randomly for now
AI.prototype.performTurn = function() {
    let i = 0,
        towns = [],
        nIterations = 0,
        equals = true,
        auxTown = '',
        townsLength = '',
        unitsLength = units.length,
        lazy = 0;

    // Move soldiers
    for (i = 0; i < unitsLength; i++){

        // If random number is 1, soldier will not move this turn
        lazy = Math.round(Math.random() * 5);

        if ((units[i] !== undefined) && (units[i].type === 'Soldier') && (units[i].player === 'Barbarian') && (lazy != 1)){
            moveSoldierRandom(units[i]);
        }
    }

    // Create only towns array
    for (i = 0; i < units.length; i++){

        if ((units[i].type === 'Town') && (units[i].player === 'Barbarian')){
            towns.push(units[i]);
        }
    }

    // Randonmy reorder towns array
    nIterations = Math.round(Math.random() * townsLength);

    while (nIterations > 0){

        while (equals){
            equals = false;
            randomTown1 = Math.round(Math.random() * townsLength) - 1;
            randomTown2 = Math.round(Math.random() * townsLength) - 1;
            
            if (randomTown1 === randomTown2){
                equals = true;
            }
        }

        auxTown = towns[randomTown1];
        towns[randomTown1] = towns[randomTown2];
        towns[randomTown2] = auxTown;

        nIterations--;
    }

    townsLength = towns.length;

    // Improve towns 
    for (i = 0; i < townsLength; i++){
        // If random number is 1, quality won't be improved; if it's 2, quantity won't be improved
        lazy = Math.round(Math.random() * 5);

        if ((gold[1] >= towns[i].stats.qualityUpgradePrice) && (lazy !== 1)){
            upgradeMode(towns[i], 'improve_quality');
        }

        if ((gold[1] >= towns[i].stats.quantityUpgradePrice) && (lazy !== 2)){
            upgradeMode(towns[i], 'improve_quantity');
        }
    }
}

// Move enemy soldiers randomly
AI.prototype.moveSoldierRandom = function(unit) {
    var randomIndex = 0,
        randomCell = '',
        equals = true,
        cell_aux = '',
        cell = unit.cell.replace('icon', '').split(""),
        iteration = [
            ('cell' + (parseInt(cell[0]) + 1) + '' + parseInt(cell[1])), ('cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) + 1)),
            ('cell' + (parseInt(cell[0]) - 1) + '' + parseInt(cell[1])), ('cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) - 1))
        ];

    // Avoid soldiers moving to non-existant cells
    if (parseInt(cell[0]) === 7){
        iteration.splice(0, 1);
        
    } else if (parseInt(cell[0]) === 0){
        iteration.splice(2, 1);
    }

    if (parseInt(cell[1]) === 7){
        iteration.splice(1, 1);
        
    } else if (parseInt(cell[1]) === 0){
        iteration.splice(3, 1);
    }

    var iterationLength = iteration.length;

    // Randomly reorder posible directions array
    nIterations = Math.round(Math.random() * iterationLength);

    while (nIterations > 0) {

        while (equals) {
            equals = false;
            randomCell1 = Math.abs(Math.round(Math.random() * (iteration.length - 1)))
            randomCell2 = Math.abs(Math.round(Math.random() * (iteration.length - 1)))
            
            if (randomCell1 == randomCell2) {
                equals = true;
            }
        }

        cell_aux = iteration[randomCell1];
        iteration[randomCell1] = iteration[randomCell2];
        iteration[randomCell2] = cell_aux;

        nIterations--;
    }

    var movements = unit.movements;

    while ((unit.movements === movements) && (iteration.length > 0)) {

        randomIndex = Math.abs(Math.round(Math.random() * (iteration.length - 1))) ;
        randomCell = iteration[randomIndex];
        moveSoldier(unit, randomCell);
        iteration.splice(randomIndex, 1);
    }
}

// Move soldiers, first try to aproach neutral/human player towns, and then human player soldiers
AI.prototype.moveSoldierIA = function(unit) {
    var randomIndex = 0;
    var randomCell = '';
    var equals = true;
    var cell_aux = '';
    var i = 0;
    var initialCell = '';
    var finalCell = '';
    var target = '';
    var continueBool = true;

    var cell = unit.cell.replace('icon', '').split("");

    var iteration = [
        ('#cell' + (parseInt(cell[0]) + 1) + '' + parseInt(cell[1]) +' a img'), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) + 1) +' a img'),
        ('#cell' + (parseInt(cell[0]) - 1) + '' + parseInt(cell[1]) +' a img'), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) - 1) +' a img')
    ];

    var iterationLength = iteration.length;
    var unitsLength = units.length;

    initialCell = unit.cell.replace('icon','').split('');

    // First look for towns
    for (i = 0; (i < unitsLength && movements > 0); i++){

        continueBool = true;

        if ((units[i].type === 'Town') && ((units[i].player === 'Neutral') || (units[i].player === 'Roman'))){

            while (continueBool && unit.movements > 0){
                target = units[i];
                finalCell = units[i].cell.replace('icon','').split('');

                //It will try to position itself on the same column that the target; and after that, on the same row.
                if (initialCell[1] < finalCell[1]){
                    moveSoldier(unit, iteration[1]);
                    
                } if (initialCell[1] < finalCell[1]){
                    moveSoldier(unit, iteration[4]);
                    
                } else if (initialCell[0] < finalCell[0]){
                    moveSoldier(unit, iteration[0]);
                    
                } else if (initialCell[0] > finalCell[0]){
                    moveSoldier(unit, iteration[2]);
                }

                // If our unit doesn't exist anymore o the town was already conquered, stop
                if ((units[i].player === 'Roman') || (unit === undefined)){
                    continueBool = false;
                }
            }
        }
    }

    // Then it searchs for human and neutral soldiers
    for (i = 0; i < unitsLength; i++){

        continueBool = true;

        if ((units[i].type === 'Soldier') && ((units[i].player === 'Neutral') || (units[i].player === 'Roman'))){

            while (continueBool && unit.movements > 0){
                target = units[i];
                finalCell = units[i].cell.replace('icon','').split('');

                //Intentará posicionarse en la misma columna que el target, y luego en su misma fila
                if (initialCell[1] < finalCell[1]){
                    moveSoldier(unit, iteration[1]);
                    
                } if (initialCell[1] < finalCell[1]){
                    moveSoldier(unit, iteration[4]);
                    
                } else if (initialCell[0] < finalCell[0]){
                    moveSoldier(unit, iteration[0]);
                    
                } else if (initialCell[0] > finalCell[0]){f
                    moveSoldier(unit, iteration[2]);
                }

                // If our unit or human player unit doesn't exist anymore
                if ((units[i] !== target) || (unit === undefined)){
                    continueBool = false;
                }
            }
        }
    }
}