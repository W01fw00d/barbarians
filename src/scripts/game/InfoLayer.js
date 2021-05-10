//TODO refactor, change its name or even remove this class, its merely a mapping between Units and their Painter
function InfoLayer(painter) {
  // Shows data about the icon and, depending of the type of icon, allows to move it (soldier) or improve it (town)
  this.checkUnitInfo = function (event, players) {
    const icon = event.target.id,
      type = icon.charAt(icon.length - 1);

    let result = {
        mode: null,
        unit: null,
      },
      unit;

    switch (type) {
      // Human roman town
      case "A":
        unit = findUnit(icon, players.human.units.towns);
        //TODO Consider if we need to pass all this info to painter, or Define an object model for passing data for painting
        //TODO maybe quantity and qualityUpgradePrice could be deduced from the current quantity and quality?
        painter.showHumanTownPanel(
          players,
          unit,
          unit.name,
          unit.strength,
          unit.stats.quantity,
          unit.stats.quality,
          unit.stats.quantityUpgradePrice,
          unit.stats.qualityUpgradePrice
        );

        break;

      // AI barbarian town
      case "E":
        unit = findUnit(icon, players.ai.units.towns);
        painter.showAITownPanel(unit.name);

        break;

      // Neutral town
      case "N":
        unit = findUnit(icon, players.neutral.units.towns);
        painter.showNeutralTownPanel(unit.name);
        break;

      // Human roman soldier (mob)
      case "a":
        unit = findUnit(icon, players.human.units.mobs);

        painter.showHumanSoldierPanel(unit.name, unit.strength, unit.movements);

        if (unit.movements) {
          result.mode = "move";
          result.unit = unit;
        }

        break;

      // Ai barbarian soldier (mob)
      case "e":
        unit = findUnit(icon, players.ai.units.mobs);
        painter.showAISoldierPanel(unit.name, unit.strength);

        break;

      // Neutral wolf (mob)
      case "n":
        unit = findUnit(icon, players.neutral.units.mobs);
        painter.showNeutralSoldierPanel(unit.name);

        break;
    }

    return result;
  };

  var findUnit = function (icon, units) {
    const unitsLength = units.length;

    let unit;

    for (i = 0; i < unitsLength; i++) {
      if (units[i].cell == icon) {
        unit = units[i];

        return unit;
      }
    }

    return unit;
  };
  this.findUnit = findUnit;
}
