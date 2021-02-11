// TODO disengage all functionality related to html tags, wrap it so browser characteristics are hidden
//TODO Named it MapManager, as Map is the logic information about the Browser/Board
function Map(mapPainter, detailsPanelPainter, mapDesign, namesManager, iconTemplates) {
  const STARTING_GOLD = 1;

  // Generates a map using the desing array as input
  this.generate = function(level, players) {
    const resetMapState = () => {
      players.human.setGold(STARTING_GOLD);
      players.human.reset();
      players.ai.reset();
      players.neutral.reset();
    }

    resetMapState();
    detailsPanelPainter.hide();
    mapPainter.eraseMap();

    const designArray = mapDesign.blueprints[level];
    designArray.forEach((row, rowIndex) => {
      mapPainter.paintRow(rowIndex);

      row.split('').forEach((cell, columnIndex) => {
        this.generateCell(players, cell, rowIndex, columnIndex);
      });
    });
  }

  //TODO this function shall return players, to explicit that it modifies it
  //TODO maybe this function should go in another class, "Cell"
  this.generateCell = function(players, cell, rowIndex, columnIndex) {
    const id = rowIndex + '' + columnIndex + cell,
      imageRoute = './src/images/board/',
      iconTagClosing = '.png"></img>',
      ground = 'H_def.png';

    let display = 'block',
      icon = '<img id="obstacle' + id + '" src="' + imageRoute,
      randomName;

    //TODO use a map structure or similar to map character to function
    switch (cell) {
      case 'x':
        icon += 'MS_def' + iconTagClosing;
        break;

      case 'I':
        icon += 'MI_defl' + iconTagClosing;
        break;

      case 'X':
        icon += 'M_def' + iconTagClosing;
        break;

      case 'D':
        icon += 'MD_def' + iconTagClosing;
        break;

      case 'V':
        icon += 'A_def' + iconTagClosing;
        break;

      case 'N':
        //TODO disengage units list management from icon choosing for cell painting
        units = players.neutral.units.towns;
        units.push(getTownObject(id, 'neutral', 'Free Town', 'Town', 'Nature'));
        icon = iconTemplates.getNeutralTown(id);
        break;

      case 'A':
        randomName = namesManager.getRandomName('town', 'human');
        units = players.human.units.towns;
        units.push(getTownObject(id, 'human', randomName, 'Town', 'Roman'));
        icon = iconTemplates.getHumanTown(id, randomName);
        break;

      case 'E':
        randomName = namesManager.getRandomName('town', 'ai');
        units = players.ai.units.towns;
        units.push(getTownObject(id, 'ai', randomName, 'Town', 'Barbarian'));
        icon = iconTemplates.getAITown(id, randomName);
        break;

      case 'n':
        units = players.neutral.units.mobs;
        units.push(getMobObject(id, 'neutral', 'Wolf', 0, 1, 'Beast', 'Nature'));
        icon = iconTemplates.getNeutralMob(id);
        break;

      case 'a':
        randomName = namesManager.getRandomName('mob', 'human');
        units = players.human.units.mobs;
        units.push(getMobObject(id, 'human', randomName, 2, 1, 'Soldier', 'Roman'));
        icon = iconTemplates.getStarterHumanMob(id, randomName);
        break;

      case 'e':
        randomName = namesManager.getRandomName('mob', 'ai');
        units = players.ai.units.mobs;
        units.push(getMobObject(id, 'ai', randomName, 1, 1, 'Soldier', 'Barbarian'));
        icon = iconTemplates.getStarterAIMob(id, randomName);
        break;

      case ' ':
      default:
        icon = '';
        display = 'none';
        break;
      };

    mapPainter.paintCell(
      id, rowIndex, columnIndex, icon, imageRoute, ground, display
    );
  }

  var getTownObject = function(
    id, player, name, typeTag, factionTag
  ) {
    const stats = {
      quantity: 1,
      quality: 1,
      quantityUpgradePrice: 1,
      qualityUpgradePrice: 1
    };

    let result = getUnitObject(id, player, name, typeTag, factionTag);
    result.stats = stats;

    return result;
  }

  var getMobObject = function(
    id, player, name, movements, strength, typeTag, factionTag
  ) {
    let result = getUnitObject(id, player, name, typeTag, factionTag);
    result.totalMovements = movements;
    result.movements = movements;
    result.strength = strength;

    return result;
  }

  var getUnitObject = function(
    id, player, name, typeTag, factionTag
  ) {
    return {
      cell: 'icon' + id,
      player: player,
      name: name,
      typeTag: typeTag,
      factionTag: factionTag
    };
  }

  //TODO create a Map object which stores all possible position on map and what is there, to be able to refactor those functions
  this.getCellId = function(cell) {
    return $(cell + ' img').attr('id');
  }

  this.getIcon = function(id) {
    return document.getElementById(id).lastElementChild;
  }
}
