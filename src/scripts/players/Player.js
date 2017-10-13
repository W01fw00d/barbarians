function Player() {
    this.units = {
        mobs: [],
        towns: []
    };
    
    this.gold;
}

Player.prototype.gold;
Player.prototype.units;

// upgrade_auto is for AI turn use of this function. In other case, this is invoked by an event_handler
Player.prototype.moveSoldier = function(unit, target) {
    const initialCell = unit.cell.replace('icon', '').split(""),
          finalCell = target.replace('cell', '').replace('#', '').split("");

    let icon = document.getElementById(target).lastElementChild,
        movement,
        result;

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

        result = unit;

    } else {
        if (unit.player === 'Roman'){
            alert('Invalid movement');
            result = null;
        }
    }
    
    return result;
}

// upgrade_auto is for AI turn use of this function. In other case, this is invoked by an event_handler
Player.prototype.upgradeMode = function(unit, upgrade){
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