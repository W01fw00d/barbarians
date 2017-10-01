function updateDataLabels(unit) {
    $('#player').val(unit.player);
    $('#type').val(unit.type);
    $('#name').val(unit.name);
};

// Shows data about the icon and, depending of the type of icon, allows to move it (soldier) or improve it (town)
function showIconData(){
    let i = 0,
        unit,
        icon = this.id,
        type = icon.charAt(icon.length - 1),
        color,
        grey = 'RGB(135, 135, 135)',
        red = 'RGB(255, 10, 10)',
        blue = 'RGB(7, 168, 226)',
        unitsLength = units.length;

    $('.icon').off();

    for(i = 0; i < unitsLength; i++){
        if (units[i].cell == icon){
            unit = units[i];
            break;
        }
    }

    switch(type){

        case 'A':
            updateDataLabels(unit);

            $('#quantity_production').html(unit.quantity);
            $('#quality_production').html(unit.quality);
            $('#improve_quantity').html(unit.quantityUpgradePrice);
            $('#improve_quality').html(unit.qualityUpgradePrice);

            $('#town_info').show();
            $('#soldier_info').hide();

            $('#improve_quantity').off();
            $('#improve_quantity').click(function(){
                upgradeMode(unit, 'improve_quantity');
            });

            $('#improve_quality').off();
            $('#improve_quality').click(function(){
                upgradeMode(unit, 'improve_quality');
            });

            //$('#improve_quality').click({unit : unit}, upgradeMode);

            $("#improve_quantity").html('Quantity ('+unit.stats.quantityUpgradePrice+' Gold)');
            $("#improve_quality").html('Quality ('+unit.stats.qualityUpgradePrice+' Gold)');
            $("#prod").html('Producing ['+unit.stats.quantity+'] soldiers with ['+unit.stats.quality+'] strength each turn. Upgrade: ');

            color = 'red';
            break;

        case 'E':
            updateDataLabels(unit);

            $('#town_info').hide();
            $('#soldier_info').hide();

            color = blue;
            break;

        case 'N':
            updateDataLabels(unit);

            $('#town_info').hide();
            $('#soldier_info').hide();

            color = grey;
            break;

        case 'a':
            updateDataLabels(unit);

            $('#town_info').hide();
            $('#soldier_info').show();
            $('#destroy').show();

            moveMode(icon, unit);
            $("#movement").html('Movements left: [' + unit.movements + ']');
            $("#strength").html('Combat strength: [' + unit.strength + '].');

            color = red;
            break;

        case 'e':
            updateDataLabels(unit);

            $('#town_info').hide();
            $('#soldier_info').show();
            $('#destroy').hide();

            $("#movement").html('');
            $("#strength").html('Combat strength: [' + unit.strength + '].');

            color = blue;
            break;

        case 'n':
            const move_message_eng = 'They protect their territory',
                  move_message_spa = 'Prefiere defender su territorio',
                  strength_message_eng = 'Can devour an undertrained human',
                  strength_message_spa = 'Puede devorar a alguien con poco entrenamiento';
            
            updateDataLabels(unit);

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
}

//
function destroyUnit(unit){
    $('#cell' + unit.cell.replace('icon','').replace('a', '').replace('e', '').replace('n','')).html('');
    units.splice(units.indexOf(unit), 1);

    let audio;

    if (unit.player === 'Roman'){
        audio = new Audio('./src/sounds/scream.mp3');
        
    }else if (unit.player === 'Barbarian'){
        audio = new Audio('./src/sounds/kill.mp3');
        
    }else if (unit.player === 'Neutral'){
        audio = new Audio('./src/sounds/wolf_scream.mp3');
    }

    audio.play();
}