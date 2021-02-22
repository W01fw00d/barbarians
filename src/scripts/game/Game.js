function Game(startingMapLevel, muteNarration, enableAnimations) {
  //TODO why define vars on this?
  this.browserUtils = new BrowserUtils();
  this.mapPainter = new MapPainter();
  this.detailsPanelPainter = new DetailsPanelPainter();
  this.mapDesign = new MapDesign();
  this.namesManager = new NamesManager();
  this.iconTemplates = new IconTemplates();
  this.soundManager = new SoundManager(muteNarration);
  this.animationManager = new AnimationManager(enableAnimations);
  this.map = new Map(
    this.mapPainter,
    this.detailsPanelPainter,
    this.mapDesign,
    this.namesManager,
    this.iconTemplates
  );
  this.infoLayer = new InfoLayer(this.detailsPanelPainter);
  this.encounter = new Encounter(
    this.iconTemplates,
    this.namesManager,
    this.soundManager,
    this.map,
    this.mapPainter
  );
  this.levelManager = new LevelManager(
    this.browserUtils,
    this.mapDesign,
    this.soundManager,
    startingMapLevel
  );
  this.turnManager = new TurnManager(
    this.encounter,
    this.levelManager,
    this.namesManager,
    this.iconTemplates,
    this.map,
    this.mapPainter,
    this.animationManager
  );

  this.players = {
    human: new Human(this.map, this.mapPainter),
    ai: new AI(this.map, this.mapPainter, this.animationManager),
    neutral: new Neutral(),
  };

  this.currentMapLevel = startingMapLevel;

  this.map.generate(this.currentMapLevel, this.players);

  this.bindIconClick();
  this.bindAll();

  /////////randomMapGenerator(x, A, E, N, a, e, n)///////
  //randomMapGenerator(10, 2, 2, 3, 5, 5, 5);
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

Game.prototype.getUnit = function (icon) {
  const unitsAnnotationCorralation = {
      e: ["ai", "mobs"],
      E: ["ai", "towns"],
      a: ["human", "mobs"],
      A: ["human", "towns"],
      n: ["neutral", "mobs"],
      N: ["neutral", "towns"],
    },
    annotation = icon[icon.length - 1];

  let units = this.players[unitsAnnotationCorralation[annotation][0]].units[
    unitsAnnotationCorralation[annotation][1]
  ];
  let unitsLength = units.length;

  for (i = 0; i < unitsLength; i++) {
    if (units[i].cell == icon) {
      return units[i];
    }
  }
};

Game.prototype.onCellClick = function (event, unit) {
  const target = event.target.id;

  let newMapLevel;

  //if this cell has an icon and the icon represents unit or town data, show that data instead of moving unit
  if (target.indexOf("icon") !== -1 && this.getUnit(target)) {
    //        showIconData.apply(targetIcon);
    event.stopPropagation();

    let modeToActivate = this.infoLayer.checkUnitInfo(event, this.players);

    if (modeToActivate.mode === "move") {
      this.moveMode.call(this, modeToActivate.unit);
    }
  } else if (
    unit.movements > 0 &&
    unit.cell.replace("icon", "").substring(0, 2) !== target.replace("cell", "")
  ) {
    result = this.players.human.moveSoldier(unit, target);

    if (result) {
      this.encounter.check(unit, this.players);

      this.levelManager.checkEndOfLevelCondition(
        this.currentMapLevel,
        this.players,
        (newMapLevel) => {
          if (newMapLevel) {
            this.currentMapLevel = newMapLevel;
            this.map.generate(this.currentMapLevel, this.players);
          }

          this.resetBoardBindings();
        }
      );
    }
  }
};

// Allows soldier to move while movements left
Game.prototype.moveMode = function (unit) {
  $(".cell").one("click", (event) => {
    this.onCellClick.call(this, event, unit);
  });

  $("#destroy").off();
  $("#destroy").click(() => {
    if (confirm("Do you want to destroy current soldier?")) {
      this.encounter.destroyUnit(unit, this.players);
      this.levelManager.checkEndOfLevelCondition(
        this.currentMapLevel,
        this.players,
        (newMapLevel) => {
          if (newMapLevel) {
            this.currentMapLevel = newMapLevel;
            this.map.generate(this.currentMapLevel, this.players);
          }

          this.resetBoardBindings();
        }
      );
    }
  });

  $("#improve_strength").off();
  $("#improve_strength").click(() => {
    this.encounter.improveUnitStrength(unit, this.players);
  });
};

Game.prototype.bindIconClick = function () {
  $(".icon").one("click", (event) => {
    event.stopPropagation();

    let modeToActivate = this.infoLayer.checkUnitInfo(event, this.players);

    if (modeToActivate.mode === "move") {
      this.moveMode.call(this, modeToActivate.unit);
    } else {
      this.bindIconClick();
    }
  });
};

Game.prototype.resetBoardBindings = function () {
  $(".cell").off();
  $(".icon").off();
  this.bindIconClick();
  $("#info").hide();
};

Game.prototype.bindAll = function () {
  let newMapLevel;

  $("#close").click(() => {
    this.resetBoardBindings.call(this);
  });

  $("#reset_map").click(() => {
    if (confirm("Reset current map?")) {
      this.map.generate(this.currentMapLevel, this.players);
      this.bindIconClick();
    }
  });

  $("#end_turn").click(() => {
    const startHumanTurn = (newMapLevel) => {
      if (newMapLevel) {
        this.currentMapLevel = newMapLevel;
        this.map.generate(this.currentMapLevel, this.players);
      }

      $("#end_turn").html("<b>End turn</b> (+3 gold)");
      $("#end_turn").prop("disabled", false);
      $("#reset_map").prop("disabled", false);
      $("#enable_animations").prop("disabled", false);
      this.bindIconClick();
    };

    $("#end_turn").html("AI Turn...");
    $("#end_turn").prop("disabled", true);
    $("#reset_map").prop("disabled", true);
    $("#enable_animations").prop("disabled", true);
    $(".cell").off();
    $(".icon").off();
    $("#info").hide();

    this.turnManager.endTurn.call(
      this.turnManager,
      this.currentMapLevel,
      this.players,
      startHumanTurn
    );
  });

  $("#mute_music").click(
    function (event) {
      var music = this.soundManager.music;
      if (!music.isMuted()) {
        event.target.innerHTML = "Unmute Music";
        music.mute();
      } else {
        event.target.innerHTML = "Mute Music";
        music.unmute();
      }
    }.bind(this)
  );

  $("#mute_narration").click(
    function (event) {
      var narrator = this.soundManager.narrator;
      if (!narrator.isMuted) {
        event.target.innerHTML = "Unmute Narration";
        narrator.mute();
      } else {
        event.target.innerHTML = "Mute Narration";
        narrator.unmute();
      }
    }.bind(this)
  );

  const enableAnimationsCheckbox = document.getElementById("enable_animations");
  enableAnimationsCheckbox &&
    enableAnimationsCheckbox.addEventListener("change", ({ currentTarget }) => {
      this.animationManager.enableAnimations = currentTarget.checked;
    });
};
