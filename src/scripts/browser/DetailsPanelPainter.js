//TODO the functions inside this class need some refactoring work
function DetailsPanelPainter() {
  this.hide = function () {
    $("#info").hide();
  };

  this.showHumanTownPanel = function (
    players,
    unit,
    name,
    strength,
    quantity,
    quality,
    quantityUpgradePrice,
    qualityUpgradePrice
  ) {
    updateDataLabels("Roman", "Town", name);
    updateHumanTownStats(
      players,
      unit,
      quantity,
      quality,
      quantityUpgradePrice,
      qualityUpgradePrice
    );

    paintBackground("roman town");
    showTownDetails();
    showPanel();
  };

  this.showAITownPanel = function (name) {
    showAdversaryTownPanel("Barbarian", "Town", name);

    paintBackground("barbarian town");
    showTownDetails();
    showPanel();
  };

  this.showNeutralTownPanel = function (name) {
    showAdversaryTownPanel("Nature", "Free Town");

    paintBackground("nature town");
    showTownDetails();
    showPanel();
  };

  this.showHumanSoldierPanel = function (name, strength, movements) {
    updateDataLabels("Roman", "Soldier", name);
    showImproveStrengthButton(strength);
    updateHumanSoldierStats(movements, strength);

    showSoldierDetails();
    showDestroyButton();

    paintBackground("roman soldier");
    showPanel();
  };

  this.showAISoldierPanel = function (name, strength) {
    updateDataLabels("Barbarian", "Soldier");
    updateAISoldierStats(strength);

    hideImproveStrengthButton();
    hideDestroyButton();
    showSoldierDetails();

    paintBackground("barbarian soldier");
    showPanel();
  };

  this.showNeutralSoldierPanel = function (name) {
    updateDataLabels("Nature", "Wolves");
    updateNeutralSoldierStats();

    hideImproveStrengthButton();
    hideDestroyButton();
    showSoldierDetails();

    paintBackground("nature soldier");
    showPanel();
  };

  var showPanel = () => {
    $("#info").show();
  };

  var showAdversaryTownPanel = function (faction, type, name) {
    updateDataLabels(faction, type, name);
    $("#improve_quantity").html("");
    $("#improve_quality").html("");
    $("#prod").html("");
    $("#improve_quantity").hide();
    $("#improve_quality").hide();
    $("#prod").hide();
  };

  var showSoldierDetails = function () {
    $("#town_info").hide();
    $("#soldier_info").show();
  };

  var showTownDetails = function () {
    $("#town_info").show();
    $("#soldier_info").hide();
  };

  var showDestroyButton = function () {
    $("#destroy").show();
  };

  var hideDestroyButton = function () {
    $("#destroy").hide();
  };

  var hideImproveStrengthButton = function () {
    $("#improve_strength").hide();
  };

  var updateDataLabels = function (faction, type, name) {
    $("#player").val(faction);
    $("#type").val(type);

    if (name) {
      $("#name").val(name);
      $("#name_descriptor").show();
      $("#name").show();
    } else {
      $("#name_descriptor").hide();
      $("#name").hide();
    }
  };

  var showImproveStrengthButton = function (strength) {
    $("#improve_strength").val(strength);
    $("#improve_strength").show();
  };

  var updateHumanTownStats = function (
    players,
    unit,
    quantity,
    quality,
    quantityUpgradePrice,
    qualityUpgradePrice
  ) {
    $("#improve_quantity").html(quantityUpgradePrice);
    $("#improve_quality").html(qualityUpgradePrice);
    $("#improve_quantity").show();
    $("#improve_quality").show();

    $("#improve_quantity").off();
    //TODO pass to this function only the callback function "upgradeMode", not all players
    //TODO Clicking on improve quantity shouldn close the details panel when success
    $("#improve_quantity").click(function () {
      players.human.upgradeMode(unit, "improve_quantity");
    });

    $("#improve_quality").off();
    $("#improve_quality").click(function () {
      players.human.upgradeMode(unit, "improve_quality");
    });

    $("#improve_quantity").html(`Quantity (${quantityUpgradePrice} 💰)`);
    $("#improve_quality").html(`Quality (${qualityUpgradePrice} 💰)`);
    $("#prod").html(
      `Producing [${quantity}] soldiers with [${quality}] strength each turn. Upgrade: `
    );
    $("#prod").show();
  };

  var updateHumanSoldierStats = function (movements, strength) {
    $("#movement").html(`Movements left: [${movements}]`);
    $("#strength").html(`Combat strength: [${strength}].`);
    $("#improve_strength").html(`Improve Strength (${strength} 💰)`);
  };

  var updateAISoldierStats = function (strength) {
    $("#movement").html("");
    $("#strength").html(`Combat strength: [${strength}].`);
  };

  var updateNeutralSoldierStats = function () {
    //TODO move to LiteralsManager when its created
    const move_message_eng = "They protect their territory",
      move_message_spa = "Prefiere defender su territorio",
      strength_message_eng = "Can devour an undertrained human",
      strength_message_spa = "Puede devorar a alguien con poco entrenamiento";

    $("#movement").html(move_message_eng);
    $("#strength").html(strength_message_eng);
  };

  var paintBackground = (classes) => {
    document.getElementById("info").className = `info ${classes}`;
  };
}
