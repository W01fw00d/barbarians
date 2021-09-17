function AI(map, mapPainter, animationManager) {
  Player.call(this, map, mapPainter);
  this.animationManager = animationManager;

  this.name = "ai";
}

AI.prototype = Object.create(Player.prototype);

AI.prototype.shuffle = function (array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

// Performs the AI enemy turn: it behaves quite randomly for now
AI.prototype.performTurn = function (endAITurn, checkEncounter) {
  const improveTowns = () => {
    // Randomly reorder towns array
    this.shuffle(this.units.towns).forEach((town) => {
      // If random number is 1, quality won't be improved; if it's 2, quantity won't be improved
      const lazy = Math.round(Math.random() * 5);
      const stats = town.stats;

      if (this.gold >= stats.qualityUpgradePrice && lazy !== 1) {
        this.upgradeMode(town, "improve_quality");
      }

      if (this.gold >= stats.quantityUpgradePrice && lazy !== 2) {
        this.upgradeMode(town, "improve_quantity");
      }
    });
  };

  let lazy;
  let activeSoldiers = [];
  this.units.mobs.forEach((mob) => {
    lazy = Math.round(Math.random() * 5);

    if (lazy != 1) {
      activeSoldiers.push(mob);
    }
  });

  let currentSoldier;
  const performNextMovement = () => {
    this.animationManager.sleepOneStep().then(() => {
      currentSoldier = activeSoldiers.pop();
      if (currentSoldier) {
        const currentCell = currentSoldier.cell;
        const currentFaction = currentSoldier.factionTag;
        this.animationManager.enableAnimations &&
          this.mapPainter.selectCell(currentCell, currentFaction);

        this.animationManager.sleepHalfStep().then(() => {
          this.moveSoldierRandom(currentSoldier);
          checkEncounter(currentSoldier);
        });
      }

      if (activeSoldiers.length > 0) {
        performNextMovement();
      } else {
        this.animationManager.sleepOneStep().then(() => {
          improveTowns();
          endAITurn();
        });
      }
    });
  };

  performNextMovement();
};

// Move enemy soldiers randomly
AI.prototype.moveSoldierRandom = function (unit) {
  let cell = unit.cell.replace("icon", "").split(""),
    movements = unit.movements,
    equals = true,
    iteration = [
      "cell" + (parseInt(cell[0]) + 1) + "" + parseInt(cell[1]),
      "cell" + parseInt(cell[0]) + "" + (parseInt(cell[1]) + 1),
      "cell" + (parseInt(cell[0]) - 1) + "" + parseInt(cell[1]),
      "cell" + parseInt(cell[0]) + "" + (parseInt(cell[1]) - 1),
    ],
    randomIndex,
    randomCell,
    cell_aux,
    iterationLength;

  // Avoid soldiers moving to non-existant cells
  if (parseInt(cell[0]) === 7) {
    iteration.splice(0, 1);
  } else if (parseInt(cell[0]) === 0) {
    iteration.splice(2, 1);
  }

  if (parseInt(cell[1]) === 7) {
    iteration.splice(1, 1);
  } else if (parseInt(cell[1]) === 0) {
    iteration.splice(3, 1);
  }

  iterationLength = iteration.length;

  // Randomly reorder posible directions array
  nIterations = Math.round(Math.random() * iterationLength);

  while (nIterations > 0) {
    while (equals) {
      equals = false;
      randomCell1 = Math.abs(
        Math.round(Math.random() * (iteration.length - 1))
      );
      randomCell2 = Math.abs(
        Math.round(Math.random() * (iteration.length - 1))
      );

      if (randomCell1 == randomCell2) {
        equals = true;
      }
    }

    cell_aux = iteration[randomCell1];
    iteration[randomCell1] = iteration[randomCell2];
    iteration[randomCell2] = cell_aux;

    nIterations--;
  }

  while (unit.movements === movements && iteration.length > 0) {
    randomIndex = Math.abs(Math.round(Math.random() * (iteration.length - 1)));
    randomCell = iteration[randomIndex];

    this.moveSoldier(unit, randomCell);

    iteration.splice(randomIndex, 1);
  }
};

// WIP
// Move soldiers, first try to aproach neutral/human player towns, and then human player soldiers
AI.prototype.moveSoldierIA = function (unit) {
  var randomIndex = 0;
  var randomCell = "";
  var equals = true;
  var cell_aux = "";
  var i = 0;
  var initialCell = "";
  var finalCell = "";
  var target = "";
  var continueBool = true;

  var cell = unit.cell.replace("icon", "").split("");

  var iteration = [
    "#cell" + (parseInt(cell[0]) + 1) + "" + parseInt(cell[1]) + " a img",
    "#cell" + parseInt(cell[0]) + "" + (parseInt(cell[1]) + 1) + " a img",
    "#cell" + (parseInt(cell[0]) - 1) + "" + parseInt(cell[1]) + " a img",
    "#cell" + parseInt(cell[0]) + "" + (parseInt(cell[1]) - 1) + " a img",
  ];

  var iterationLength = iteration.length;
  var unitsLength = units.length;

  initialCell = unit.cell.replace("icon", "").split("");

  // First look for towns
  for (i = 0; i < unitsLength && movements > 0; i++) {
    continueBool = true;

    if (
      units[i].type === "Town" &&
      (units[i].player === "Neutral" || units[i].player === "Roman")
    ) {
      while (continueBool && unit.movements > 0) {
        target = units[i];
        finalCell = units[i].cell.replace("icon", "").split("");

        //It will try to position itself on the same column that the target; and after that, on the same row.
        if (initialCell[1] < finalCell[1]) {
          moveSoldier(unit, iteration[1]);
        }
        if (initialCell[1] < finalCell[1]) {
          moveSoldier(unit, iteration[4]);
        } else if (initialCell[0] < finalCell[0]) {
          moveSoldier(unit, iteration[0]);
        } else if (initialCell[0] > finalCell[0]) {
          moveSoldier(unit, iteration[2]);
        }

        // If our unit doesn't exist anymore o the town was already conquered, stop
        if (units[i].player === "Roman" || unit === undefined) {
          continueBool = false;
        }
      }
    }
  }

  // Then it searchs for human and neutral soldiers
  for (i = 0; i < unitsLength; i++) {
    continueBool = true;

    if (
      units[i].type === "Soldier" &&
      (units[i].player === "Neutral" || units[i].player === "Roman")
    ) {
      while (continueBool && unit.movements > 0) {
        target = units[i];
        finalCell = units[i].cell.replace("icon", "").split("");

        //Intentará posicionarse en la misma columna que el target, y luego en su misma fila
        if (initialCell[1] < finalCell[1]) {
          moveSoldier(unit, iteration[1]);
        }
        if (initialCell[1] < finalCell[1]) {
          moveSoldier(unit, iteration[4]);
        } else if (initialCell[0] < finalCell[0]) {
          moveSoldier(unit, iteration[0]);
        } else if (initialCell[0] > finalCell[0]) {
          f;
          moveSoldier(unit, iteration[2]);
        }

        // If our unit or human player unit doesn't exist anymore
        if (units[i] !== target || unit === undefined) {
          continueBool = false;
        }
      }
    }
  }
};
