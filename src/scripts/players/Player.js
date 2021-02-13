const STARTING_GOLD = 1;

//TODO map as mapManager renamed here only to avoid crash with other var named map
function Player(mapManager, mapPainter) {
    Faction.call(this);

    this.gold = STARTING_GOLD;
    this.mapManager = mapManager;
    this.mapPainter = mapPainter;
}

Player.prototype = Object.create(Faction.prototype);

Player.prototype.gold;

Player.prototype.reset = function() {
    this.units = {
        mobs: [],
        towns: [],
    };
    this.gold = STARTING_GOLD;
}

Player.prototype.setGold = function(gold) {
    this.gold = gold;
}

// upgrade_auto is for AI turn use of this function. In other case, this is invoked by an event_handler
Player.prototype.moveSoldier = function(unit, target) {
    const initialCell = unit.cell.replace('icon', '').split(""),
          finalCell = target.replace('cell', '').replace('#', '').split("");

    let icon = this.mapManager.getIcon(target),
        movement,
        result;

    //Check how many cells have it move as a total
    movement = Math.abs(initialCell[0] - finalCell[0]) + Math.abs(finalCell[1] - initialCell[1]);

    if ((icon === null) && (movement > 0) && (movement <= unit.movements)) {
        //Move the soldier icon to he selected cell, and calculate movements left
        unit.cell = 'icon' + finalCell[0] + '' + finalCell[1] + initialCell[2];
        unit.movements -= movement;

        result = unit;

        this.mapPainter.clearCell(initialCell[0], initialCell[1]);

    } else {
        if (unit.player === 'Roman'){
            alert('Invalid movement');
            result = null;
        }
    }

    return result;
}

// upgrade_auto is for AI turn use of this function. In other case, this is invoked by an event_handler
Player.prototype.upgradeMode = function(unit, upgrade) {
    const errorMessage = 'You don\'t have enough gold!';

    let cell,
        image = '',
        title = '';

    const updateTownHtml = () => {
        $("#prod").html(
            `Producing [${unit.stats.quantity}] soldiers with [${unit.stats.quality}] strength each turn. Upgrade: `
        );

        cell = unit.cell.replace('icon', '#cell');
        cell = cell.substring(0, cell.length - 1);
        title = `[${unit.name}]. Quantity: [${unit.stats.quantity}], Quality: [${unit.stats.quality}]`;
        $(cell + ' a').attr('title', title);
    }

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

            updateTownHtml();

            //TODO refactor: move all this DOM acceses to DetailsPanelPainter
            $("#improve_quantity").html(
                `Quantity (${unit.stats.quantityUpgradePrice} Gold)`
            );

        } else {
            alert(errorMessage);
        }

    } else if (upgrade === 'improve_quality'){
        if (unit.stats.qualityUpgradePrice <= this.gold){
            this.setGold(this.gold - unit.stats.qualityUpgradePrice);
            unit.stats.qualityUpgradePrice += unit.stats.qualityUpgradePrice;
            unit.stats.quality++;

            updateTownHtml();
            $("#improve_quality").html(
                `Quality (${unit.stats.qualityUpgradePrice} Gold)`
            );

        } else {
            alert(errorMessage);
        }

    // This is only used by AlliedMobs.
    } else if (upgrade === 'improve_strength') {
        if (unit.strength <= this.gold) {
            const updateTooltip = () => {
                cell = unit.cell.replace('icon', '#cell');
                cell = cell.substring(0, cell.length - 1);
                $(cell + ' a').attr(
                    'title',
                    `[${unit.name}]. Moves: [${unit.movements}], Strength: [${unit.strength}]`
                );
            }

            this.setGold(this.gold - unit.strength);
            unit.strength += unit.strength;

            $("#strength").html('Combat strength: [' + unit.strength + '].');
            $("#improve_strength").html('Improve Strength (' + unit.strength + ' Gold)');
            updateTooltip();

        } else {
            alert(errorMessage);
        }
    }
}
