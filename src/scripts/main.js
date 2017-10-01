// You can set here a different starting level, for testing purposes
var currentMapLevel = 1,
    units = [];
//Gold [Romans, Barbarians];
    gold = [1, 1];

$(document).ready(ini);

function ini() {
    /////////randomMapGenerator(x, A, E, N, a, e, n)///////
	//console.log(randomMapGenerator(10, 2, 2, 3, 5, 5, 5));
    //mapGenerator(randomMapGenerator(10, 2, 2, 3, 2, 3, 2)); // <= 64
    
// Quick hack for trying out concrete maps
//    currentMapLevel = 10;
    mapGenerator(blueprints[currentMapLevel]);

    $('#close').click(function(){
        $('.cell').off();
        $('.icon').off();
        $('.icon').click(showIconData);
        $('#info').hide();
    });

    $('#reset_map').click(function(){
        if (confirm('Reset current map?')){
            mapGenerator(blueprints[currentMapLevel]);
        }
    });

    $('#end_turn').click(endTurn);
}

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}