function InfoLayer() {}

InfoLayer.prototype.updateDataLabels = function(unit) {
    $('#player').val(unit.player);
    $('#type').val(unit.type);
    $('#name').val(unit.name);
};

InfoLayer.prototype.findUnit = function(icon, units) {
    const unitsLength = units.length;
    
    let unit;
    
    for(i = 0; i < unitsLength; i++){
        if (units[i].cell == icon){
            unit = units[i];
            return unit;
        }
    }
    
    return unit;
}

// Shows data about the icon and, depending of the type of icon, allows to move it (soldier) or improve it (town)
InfoLayer.prototype.checkUnitInfo = function(event, players) {
    let i = 0,
        icon = event.target.id,
        type = icon.charAt(icon.length - 1),
        grey = 'RGB(135, 135, 135)',
        red = 'RGB(255, 10, 10)',
        blue = 'RGB(7, 168, 226)',
        result = {
            mode: null,
            unit : null
        },
        color,
        unit;

    $('.icon').off();

    switch(type){     
        // Human roman town
        case 'A':
            unit = this.findUnit(icon, players.human.units.towns);
            
            this.updateDataLabels(unit);

            $('#quantity_production').html(unit.quantity);
            $('#quality_production').html(unit.quality);
            $('#improve_quantity').html(unit.quantityUpgradePrice);
            $('#improve_quality').html(unit.qualityUpgradePrice);

            $('#town_info').show();
            $('#soldier_info').hide();

            $('#improve_quantity').off();
            $('#improve_quantity').click(function(){
                players.human.upgradeMode(unit, 'improve_quantity');
            });

            $('#improve_quality').off();
            $('#improve_quality').click(function(){
                players.human.upgradeMode(unit, 'improve_quality');
            });

            //$('#improve_quality').click({unit : unit}, upgradeMode);

            $("#improve_quantity").html('Quantity ('+unit.stats.quantityUpgradePrice+' Gold)');
            $("#improve_quality").html('Quality ('+unit.stats.qualityUpgradePrice+' Gold)');
            $("#prod").html('Producing ['+unit.stats.quantity+'] soldiers with ['+unit.stats.quality+'] strength each turn. Upgrade: ');

            color = 'red';
            break;

        // AI barbarian town
        case 'E':
            console.log(icon);
            console.log(players.ai.units.towns);
            
            unit = this.findUnit(icon, players.ai.units.towns);
            
            this.updateDataLabels(unit);

            $('#town_info').hide();
            $('#soldier_info').hide();

            color = blue;
            break;

        // Neutral town
        case 'N':
            unit = this.findUnit(icon, players.neutral.units.towns);
            
            this.updateDataLabels(unit);

            $('#town_info').hide();
            $('#soldier_info').hide();

            color = grey;
            break;

        // Human roman soldier (mob)
        case 'a':
            unit = this.findUnit(icon, players.human.units.mobs);
            
            this.updateDataLabels(unit);

            $('#town_info').hide();
            $('#soldier_info').show();
            $('#destroy').show();
            
            if (unit.movements) {
                result.mode = 'move';
                result.unit = unit;
            }
            
//            players.human.moveMode(unit);
            
            $("#movement").html('Movements left: [' + unit.movements + ']');
            $("#strength").html('Combat strength: [' + unit.strength + '].');

            color = red;
            break;

        // Ai barbarian soldier (mob)
        case 'e':
            unit = this.findUnit(icon, players.ai.units.mobs);
            
            this.updateDataLabels(unit);

            $('#town_info').hide();
            $('#soldier_info').show();
            $('#destroy').hide();

            $("#movement").html('');
            $("#strength").html('Combat strength: [' + unit.strength + '].');

            color = blue;
            break;

        // Neutral wolf (mob)
        case 'n':
            unit = this.findUnit(icon, players.neutral.units.mobs);
            
            const move_message_eng = 'They protect their territory',
                  move_message_spa = 'Prefiere defender su territorio',
                  strength_message_eng = 'Can devour an undertrained human',
                  strength_message_spa = 'Puede devorar a alguien con poco entrenamiento';
            
            this.updateDataLabels(unit);

            $('#town_info').hide();
            $('#soldier_info').show();
            $('#destroy').hide();

            $("#movement").html(move_message_eng);
            $("#strength").html(strength_message_eng);

            color = grey;
            break;
    }

    $('#info').css({'background' : color});
    $('#info').show();
    
    return result;
}