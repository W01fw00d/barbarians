function Game(){}

// You can set here a different starting level, for testing purposes
Game.prototype.currentMapLevel = 1;

// Classes
Game.prototype.map;
Game.prototype.infoLayer;
Game.prototype.encounter;
Game.prototype.players;

Game.prototype.onCellClick = function(event, unit){ 
    target = event.target.id;

    if ((unit.movements > 0) && (unit.cell.replace('icon', '').substring(0, 2) !== target.replace('cell', ''))){
        result = this.players.human.moveSoldier(unit, target);

        if (result) {
            this.encounter.check(unit, this.players);
            this.resetBoardBindings();
        }

        //            Player.prototype.moveSoldier.call(this, unit, target);
        //            this.moveSoldier(unit, target);
    }
}

// Allows soldier to move while movements left
Game.prototype.moveMode = function(unit) {
    console.log('MOVE MODE ACTIVE');
    let target, result;
    //movements = unit.movements;

    //$('#'+icon).html('<form><input readonly>'+movements+'</input></form>');

    //    $('.cell').off();
    //movements = movements - $('.cell').click({unit: unit}, moveSoldier).data("result");

    $('.cell').one( "click", event => {
        console.log('MOVING!');
        //        console.log(event.currentTarget);
        this.onCellClick.call(this, event, unit);
    });

    $('#destroy').off();
    $('#destroy').click(function(){
        if (confirm('Do you want to destroy current soldier?')){
            this.encounter.destroyUnit(unit);
            $('.cell').off();
            $('#info').hide();
            $('.icon').off();
            $('.icon').click(showIconData);
        }
    });
}

Game.prototype.bindIconClick = function() {
    $('.icon').one("click", event => {
        event.stopPropagation();
        console.log('ICON SELECTED');

        let modeToActivate = this.infoLayer.checkUnitInfo(event, this.players);

        if (modeToActivate.mode === 'move') {
            console.log(this.players);

            this.moveMode.call(this, modeToActivate.unit);
        }
    });
}

Game.prototype.resetBoardBindings = function() {
    $('.cell').off();
    $('.icon').off();
    this.bindIconClick();
    $('#info').hide();
}

Game.prototype.start = function(startingMapLevel) {
    this.map = new Map();
    this.infoLayer = new InfoLayer();
    this.encounter = new Encounter();

    this.players = {
        human: new Human(),
        ai: new AI(),
        neutral: new Neutral()
    }

    this.currentMapLevel = startingMapLevel;

    this.map.generate(this.currentMapLevel, this.players);
    this.bindIconClick();
    this.bindAll();

    /////////randomMapGenerator(x, A, E, N, a, e, n)///////
    //console.log(randomMapGenerator(10, 2, 2, 3, 5, 5, 5));
    //mapGenerator(randomMapGenerator(10, 2, 2, 3, 2, 3, 2)); // <= 64
}

Game.prototype.bindAll = function() {
    $('#close').click(function(){
        this.resetBoardBindings();
    });

    $('#reset_map').click(function(){
        if (confirm('Reset current map?')){
            this.map.generate(this.currentMapLevel, this.players);
            this.bindIconClick();
        }
    });

    $('#end_turn').click(this.players.human.endTurn);
}