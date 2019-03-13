function Player() {
    this.units = {
        mobs: [],
        towns: []
    };

    this.gold;
}

Player.prototype.name;
Player.prototype.gold;
Player.prototype.units;

Player.prototype.setGold = function(gold) {
    this.gold = gold;
}

// upgrade_auto is for AI turn use of this function. In other case, this is invoked by an event_handler
Player.prototype.moveSoldier = function(unit, target) {
    const initialCell = unit.cell.replace('icon', '').split(""),
          finalCell = target.replace('cell', '').replace('#', '').split("");

    let icon = document.getElementById(target).lastElementChild,
        movement,
        result;

    //Check how many cells have it move as a total
    movement = Math.abs(initialCell[0] - finalCell[0]) + Math.abs(finalCell[1] - initialCell[1]);

    if ((icon === null) && (movement > 0) && (movement <= unit.movements)){

        //Move the soldier icon to he selected cell, and calculate movements left
        unit.cell = 'icon' + finalCell[0] + '' + finalCell[1] + initialCell[2];
        unit.movements -= movement;

        result = unit;

        $('#cell' + initialCell[0] + '' + initialCell[1]).html('');

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
        cell,
        image = '',
        title = '';

    if (unit.player === 'human'){
        index = 0;
        image = 'AR_del_def';

    } else if (unit.player === 'ai'){
        index = 1;
        image = 'AB_del_def';
    }

    if (upgrade === 'improve_quantity'){
        if (unit.stats.quantityUpgradePrice <= this.gold){
            this.setGold(this.gold - unit.stats.quantityUpgradePrice);
            unit.stats.quantityUpgradePrice += unit.stats.quantityUpgradePrice;
            unit.stats.quantity++;

        } else {
            alert(errorMessage);
        }

    } else if (upgrade === 'improve_quality'){
        if (unit.stats.qualityUpgradePrice <= this.gold){
            this.setGold(this.gold - unit.stats.qualityUpgradePrice);
            unit.stats.qualityUpgradePrice += unit.stats.qualityUpgradePrice;
            unit.stats.quality++;

        } else {
            alert(errorMessage);
        }

    // This is only used by AlliedMobs.
    } else if (upgrade === 'improve_strength') {
        if (unit.strength <= this.gold){
            this.setGold(this.gold - unit.strength);
            unit.strength += unit.strength;

            $("#strength").html('Combat strength: [' + unit.strength + '].');
            $("#improve_strength").html('Improve Strength (' + unit.strength + ' Gold)');
        } else {
            alert(errorMessage);
        }
        return;
    }

    cell = unit.cell.replace('icon', '#cell')
    cell = cell.substring(0, cell.length - 1);

    if (unit.player === 'human') {
        title = '[' + unit.name + ']. Quantity: [' + unit.stats.quantity + '], Quality: [' + unit.stats.quality + ']';

    } else if (unit.player === 'ai') {
        title = '[' + unit.name + ']';
    }

    $(cell + ' a').attr('title', title);
    $('#info').hide();
}
