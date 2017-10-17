function Game(startingMapLevel){
    this.namesManager = new NamesManager();
    this.iconTemplates = new IconTemplates();
    this.map = new Map(this.namesManager, this.iconTemplates);
    this.infoLayer = new InfoLayer();
    this.encounter = new Encounter(this.iconTemplates);
    this.levelManager = new LevelManager();
    this.turnManager = new TurnManager(this.encounter, this.levelManager, this.namesManager, this.iconTemplates);

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

Game.prototype.currentMapLevel;

// Classes
Game.prototype.namesManager;
Game.prototype.iconTemplates;
Game.prototype.map;
Game.prototype.levelManager;
Game.prototype.infoLayer;
Game.prototype.turnManager;
Game.prototype.encounter;
Game.prototype.players;

Game.prototype.getUnit = function(icon) {
    const unitsAnnotationCorralation = {
        e: ['ai', 'mobs'],
        E: ['ai', 'towns'],
        a: ['human', 'mobs'],
        A: ['human', 'towns'],
        n: ['neutral', 'mobs'],
        N: ['neutral', 'towns'],
    },
          annotation = icon[icon.length - 1];

    let units = this.players[unitsAnnotationCorralation[annotation][0]].units[unitsAnnotationCorralation[annotation][1]],
        unitsLength = units.length;

    for (i = 0; i < unitsLength; i++) {
        if (units[i].cell == icon) {
            return units[i];
        }
    }
}

Game.prototype.onCellClick = function(event, unit){ 
    const target = event.target.id;

    let newMapLevel;

//    targetIcon = target.getElementsByClassName('icon')[0];

    //if this cell has an icon and the icon represents unit or town data, show that data instead of moving unit
    if (target.indexOf('icon') !== -1 && this.getUnit(target)) {
//        showIconData.apply(targetIcon);
        event.stopPropagation();

        let modeToActivate = this.infoLayer.checkUnitInfo(event, this.players);

        if (modeToActivate.mode === 'move') {
            this.moveMode.call(this, modeToActivate.unit);
        }

    } else if ((unit.movements > 0) && (unit.cell.replace('icon', '').substring(0, 2) !== target.replace('cell', ''))){
        result = this.players.human.moveSoldier(unit, target);

        if (result) {
            this.encounter.check(unit, this.players);
            newMapLevel = this.levelManager.checkEndOfLevelCondition(this.currentMapLevel, this.players);

            if (newMapLevel) {
                this.currentMapLevel = newMapLevel;
                this.map.generate(this.currentMapLevel, this.players);

            } else {
                this.resetBoardBindings(); 
            }
        }

        //            Player.prototype.moveSoldier.call(this, unit, target);
        //            this.moveSoldier(unit, target);
    }
}

// Allows soldier to move while movements left
Game.prototype.moveMode = function(unit) {
    let target, result;
    //movements = unit.movements;

    //$('#'+icon).html('<form><input readonly>'+movements+'</input></form>');

    //    $('.cell').off();
    //movements = movements - $('.cell').click({unit: unit}, moveSoldier).data("result");

    $('.cell').one( "click", event => {
        this.onCellClick.call(this, event, unit);
    });

    $('#destroy').off();
    $('#destroy').click(() => {
        if (confirm('Do you want to destroy current soldier?')){
            this.encounter.destroyUnit(unit, this.players);
            newMapLevel = this.levelManager.checkEndOfLevelCondition(this.currentMapLevel, this.players);

            if (newMapLevel) {
                this.currentMapLevel = newMapLevel;
                this.map.generate(this.currentMapLevel, this.players);

            } else {
                this.resetBoardBindings(); 
            }
            //            $('.cell').off();
            //            $('#info').hide();
            //            $('.icon').off();
            //            $('.icon').click(showIconData);
        }
    });
}

Game.prototype.bindIconClick = function() {
    $('.icon').one("click", event => {
        event.stopPropagation();

        let modeToActivate = this.infoLayer.checkUnitInfo(event, this.players);

        if (modeToActivate.mode === 'move') {
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

Game.prototype.bindAll = function() {
    let newMapLevel;

    $('#close').click(() => {
        this.resetBoardBindings.call(this);
    });

    $('#reset_map').click(() => {
        if (confirm('Reset current map?')){
            this.map.generate(this.currentMapLevel, this.players);
            this.bindIconClick();
        }
    });

    $('#end_turn').click(() => {
        newMapLevel = this.turnManager.endTurn.call(this.turnManager, this.currentMapLevel, this.players);

        if (newMapLevel) {
            this.currentMapLevel = newMapLevel;
            this.map.generate(this.currentMapLevel, this.players);

        } else {
            this.resetBoardBindings(); 
            //                        this.bindIconClick();
        }
    });

    //    $('#end_turn').click(this.players.human.endTurn);
}