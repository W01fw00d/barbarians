//TODO EncounterManager
function Encounter(iconTemplates, namesManager, soundManager, map, mapPainter) {
  //TODO this class doesnt seem to be the correct place for this functionality
  //TODO improving the strenght of a unit should remove its left movements
  this.improveUnitStrength = function (unit, players) {
    players.human.upgradeMode(unit, "improve_strength");
  };

  //TODO refactor this, currently is being used by this Encounter and by the destroy button too
  this.destroyUnit = function (unit, players) {
    $(
      "#cell" +
        unit.cell
          .replace("icon", "")
          .replace("a", "")
          .replace("e", "")
          .replace("n", "")
    ).html("");

    units = players[unit.player].units.mobs;
    units.splice(units.indexOf(unit), 1);
  };

  // Calculate the encounter result between a soldier and a soldier, or a soldier and a town; return true if unit wins.
  this.check = function (unit, players) {
    let adversary,
      conquered,
      cell = unit.cell.replace("icon", "").split(""),
      iteration = [
        "#cell" + (parseInt(cell[0]) + 1) + "" + parseInt(cell[1]),
        "#cell" + parseInt(cell[0]) + "" + (parseInt(cell[1]) + 1),
        "#cell" + (parseInt(cell[0]) - 1) + "" + parseInt(cell[1]),
        "#cell" + parseInt(cell[0]) + "" + (parseInt(cell[1]) - 1),
      ],
      iterationLength = iteration.length,
      conqueredUnit,
      units,
      unitsLength,
      combatResults = (results = {
        winner: null,
        loser: null,
      }),
      i = 0,
      j = 0,
      cellId,
      typeOfCollindantUnit,
      mobsAnnotationCorralation = {
        e: "ai",
        a: "human",
        n: "neutral",
      },
      townsAnnotationCorralation = {
        E: "ai",
        A: "human",
        N: "neutral",
      };

    // Look for fights with other soldiers next to itself
    for (i = 0; i < iterationLength; i++) {
      cellId = map.getCellId(iteration[i]);

      if (cellId !== undefined) {
        typeOfCollindantUnit = cellId.replace("icon", "").charAt(2);
        if (
          (typeOfCollindantUnit === "e" && unit.player === "human") ||
          (typeOfCollindantUnit === "a" && unit.player === "ai") ||
          typeOfCollindantUnit === "n"
        ) {
          units =
            players[mobsAnnotationCorralation[typeOfCollindantUnit]].units.mobs;
          unitsLength = units.length;

          // Find adversary
          for (j = 0; j < unitsLength; j++) {
            if (
              units[j].cell
                .replace("icon", "")
                .replace("a", "")
                .replace("e", "")
                .replace("n", "") === iteration[i].replace("#cell", "")
            ) {
              adversary = units[j];
              break;
            }
          }
          combatResults = compareStrengths(unit, adversary);

          this.destroyUnit(combatResults.loser, players);
          soundManager
            .narrate()
            .dead(combatResults.winner, combatResults.loser);

          // Loot for killing soldiers
          if (
            combatResults.winner.player === "human" &&
            combatResults.loser.player === "ai"
          ) {
            players.human.setGold(players.human.gold + 1);
          } else if (
            combatResults.winner.player === "ai" &&
            combatResults.loser.player === "human"
          ) {
            players.ai.setGold(players.ai.gold + 1);
          }

          // If not dead yet, keep looking for fights
          if (combatResults.loser === unit) {
            break;
          }
        }
      }
    }

    // If unit is still alive, it can conquest towns
    if (combatResults.loser !== unit) {
      // A soldier conquest all nearby towns
      for (i = 0; i < iterationLength; i++) {
        cellId = map.getCellId(iteration[i]);

        if (cellId !== undefined) {
          typeOfCollindantUnit = cellId.replace("icon", "").charAt(2);

          if (
            (typeOfCollindantUnit === "E" && unit.player === "human") ||
            (typeOfCollindantUnit === "A" && unit.player === "ai") ||
            typeOfCollindantUnit === "N"
          ) {
            units =
              players[townsAnnotationCorralation[typeOfCollindantUnit]].units
                .towns;
            unitsLength = units.length;

            // Find target unit in array
            for (j = 0; j < unitsLength; j++) {
              if (units[j].cell === map.getCellId(iteration[i])) {
                conquered = j;
                combatResults.winner = unit;
                break;
              }
            }

            conqueredUnit = units[conquered];
            const newName = namesManager.getRandomName("town", unit.player);
            soundManager.narrate().conquered(unit, conqueredUnit, newName);
            conqueredUnit.player = unit.player;
            conqueredUnit.factionTag = unit.factionTag;

            units[conquered].name = newName;

            if (unit.player === "human") {
              updateConqueredRomanTown(iteration[i], conqueredUnit);
            } else if (unit.player === "ai") {
              updateConqueredBarbarianTown(iteration[i], conqueredUnit);
            }

            // Update units lists
            players[unit.player].units.towns.push(conqueredUnit);
            players[
              townsAnnotationCorralation[typeOfCollindantUnit]
            ].units.towns = units.filter((unit) => {
              return (
                unit.player === townsAnnotationCorralation[typeOfCollindantUnit]
              );
            });
          }
        }
      }

      changeIcon(unit, combatResults.winner);
    }
  };

  var compareStrengths = function (unit, adversary) {
    let results = {
      winner: null,
      loser: null,
    };

    // 100% win
    if (unit.strength > adversary.strength + 1) {
      results.winner = unit;
      results.loser = adversary;
    } else if (unit.strength + 1 < adversary.strength) {
      results.winner = adversary;
      results.loser = unit;

      // Random winner (50%)
    } else if (unit.strength === adversary.strength) {
      //TODO wrap Math.random() so we can describe our game luck checks and properly test
      if (Math.round(Math.random() * 1) === 1) {
        results.winner = unit;
        results.loser = adversary;
      } else {
        results.winner = adversary;
        results.loser = unit;
      }

      // 25%
    } else if (unit.strength + 1 === adversary.strength) {
      if (Math.round(Math.random() * 3) === 0) {
        results.winner = unit;
        results.loser = adversary;
      } else {
        results.winner = adversary;
        results.loser = unit;
      }
    } else if (unit.strength === adversary.strength + 1) {
      if (Math.round(Math.random() * 3) !== 0) {
        results.winner = unit;
        results.loser = adversary;
      } else {
        results.winner = adversary;
        results.loser = unit;
      }
    }

    return results;
  };

  var updateConqueredRomanTown = function (iteration, conqueredUnit) {
    //TODO only extraTitle setting is different from BarbarianTown function
    const extraTitle = `. quantity: [${conqueredUnit.stats.quantity}]. quality: [${conqueredUnit.stats.quality}]`;
    updateConqueredTown(iteration, conqueredUnit, "A", extraTitle);
  };

  var updateConqueredBarbarianTown = function (iteration, conqueredUnit) {
    updateConqueredTown(iteration, conqueredUnit, "E", "");
  };

  var updateConqueredTown = function (
    iteration,
    conqueredUnit,
    annotation,
    extraTitle
  ) {
    mapPainter.repaintTown(iteration, conqueredUnit, extraTitle);

    conqueredUnit.cell = conqueredUnit.cell.replaceAt(
      conqueredUnit.cell.length - 1,
      annotation
    );
  };

  var changeIcon = function (unit, winner) {
    const unitCell = unit.cell.replace("icon", "").split("");

    let html;
    let id = unitCell[0] + "" + unitCell[1] + unitCell[2];

    //    unit.movements = (result !== 'none') ? 0 : unit.movements - movement;

    switch (unit.player) {
      case "human":
        if (unit.movements > 0 && winner !== unit) {
          html = iconTemplates.getHumanMob(
            id,
            unit.name,
            unit.movements,
            unit.strength
          );
        } else {
          unit.movements = 0;
          html = iconTemplates.getUsedHumanMob(
            id,
            unit.name,
            unit.movements,
            unit.strength
          );
        }
        break;

      case "ai":
        unit.movements = 1;

        html = iconTemplates.getAIMob(id, unit.name, null, unit.strength);

        break;

      default:
        html = "";
    }

    $(`#cell${unitCell[0]}${unitCell[1]}`).html(html);
  };
}
