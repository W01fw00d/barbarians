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

Player.prototype.reset = function () {
  this.units = {
    mobs: [],
    towns: [],
  };
  this.gold = STARTING_GOLD;
};

Player.prototype.setGold = function (gold) {
  this.gold = gold;
};

Player.prototype.showModal = function (message) {
  $("#modal-content").html(message);
  $("#modal").modal("show");
};

// upgrade_auto is for AI turn use of this function. In other case, this is invoked by an event_handler
Player.prototype.moveSoldier = function (unit, target) {
  const initialCell = unit.cell.replace("icon", "").split("");
  const finalCell = target.replace("cell", "").replace("#", "").split("");

  let icon = this.mapManager.getIcon(target);
  let movement;
  let result;

  //Check how many cells have it move as a total
  movement =
    Math.abs(initialCell[0] - finalCell[0]) +
    Math.abs(finalCell[1] - initialCell[1]);

  if (icon === null && movement > 0 && movement <= unit.movements) {
    // Move the soldier icon to the selected cell, and calculate movements left
    unit.cell = "icon" + finalCell[0] + "" + finalCell[1] + initialCell[2];
    unit.movements -= movement;

    result = unit;

    this.mapPainter.clearCell(initialCell[0], initialCell[1]);
  } else {
    if (unit.player === "human") {
      this.showModal("Invalid movement");
      result = null;
    }
  }

  return result;
};

// upgrade_auto is for AI turn use of this function. In other case, this is invoked by an event_handler
// TODO: refactor, doesn't make much sense that soldiers and towns share this function
Player.prototype.upgradeMode = function (unit, upgrade) {
  const errorMessage = "You don't have enough gold!";

  let cell;

  const updateTownHtml = () => {
    $("#prod").html(
      `Producing [${unit.stats.quantity}] soldiers with [${unit.stats.quality}] strength each turn. Upgrade: `
    );

    cell = unit.cell.replace("icon", "#cell");
    cell = cell.substring(0, cell.length - 1);
    const factionTitleMap = {
      roman: () =>
        ` Quantity: [${unit.stats.quantity}], Quality: [${unit.stats.quality}]`,
    };

    this.mapPainter.repaintTown(
      cell,
      unit,
      (factionTitleMap[unit.factionTag.toLowerCase()] || (() => ""))()
    );
  };

  if (upgrade === "improve_quantity") {
    if (unit.stats.quantityUpgradePrice <= this.gold) {
      this.setGold(this.gold - unit.stats.quantityUpgradePrice);
      unit.stats.quantityUpgradePrice += unit.stats.quantityUpgradePrice;
      unit.stats.quantity++;

      updateTownHtml();

      //TODO refactor: move all this DOM acceses to DetailsPanelPainter
      $("#improve_quantity").html(
        `Quantity (${unit.stats.quantityUpgradePrice} Gold)`
      );
    } else {
      this.showModal(errorMessage);
    }
  } else if (upgrade === "improve_quality") {
    if (unit.stats.qualityUpgradePrice <= this.gold) {
      this.setGold(this.gold - unit.stats.qualityUpgradePrice);
      unit.stats.qualityUpgradePrice += unit.stats.qualityUpgradePrice;
      unit.stats.quality++;

      updateTownHtml();
      $("#improve_quality").html(
        `Quality (${unit.stats.qualityUpgradePrice} Gold)`
      );
    } else {
      this.showModal(errorMessage);
    }

    // This is only used by AlliedMobs.
  } else if (upgrade === "improve_strength") {
    if (unit.strength <= this.gold) {
      this.setGold(this.gold - unit.strength);
      unit.strength += unit.strength;

      $("#strength").html("Combat strength: [" + unit.strength + "].");
      $("#improve_strength").html(
        "Improve Strength (" + unit.strength + " Gold)"
      );

      cell = unit.cell.replace("icon", "#cell");
      cell = cell.substring(0, cell.length - 1);
      this.mapPainter.repaintMob(
        cell,
        unit,
        ` | Moves: [${unit.movements}] | Strength: [${unit.strength}]`
      );
    } else {
      this.showModal(errorMessage);
    }
  }
};
