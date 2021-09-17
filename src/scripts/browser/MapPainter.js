//TODO Name it BoardPainter
function MapPainter(iconTemplates) {
  this.iconTemplates = iconTemplates;

  this.paint = function (selector, content) {
    $(selector).html(content);
  };

  this.clearCell = function (y, x) {
    $(`#cell${y}${x}`).html("");
  };

  this.eraseMap = function () {
    $("#map").html("");
  };

  this.paintRow = function (rowIndex) {
    $("#map").append(`<tr id="row${rowIndex}"></tr>`);
  };

  this.paintCell = function (
    id,
    rowIndex,
    columnIndex,
    icon,
    imageRoute,
    ground,
    display
  ) {
    $(`#row${rowIndex}`).append(
      `<th class="cell" id="cell${rowIndex}${columnIndex}">${icon}</th>`
    );
    $(`#cell${rowIndex}${columnIndex}`).css({
      "background-image": `url(${imageRoute}${ground})`,
    });
    $(`#icon${id}`).css({ display: display });
  };

  this.repaintTown = function (cell, unit, extraTitle) {
    const { factionTag, stats, name } = unit;
    const faction = factionTag.toLowerCase();
    const { quantity, quality } = stats;

    const getAnnotation = () => {
      const roman = "roman";
      const factionsMap = {
        roman: "A",
        barbarian: "E",
        nature: "N", //not really used here
      };

      return factionsMap[faction || roman] || factionsMap[roman];
    };

    const getIconByStrength = function (strength) {
      const availableIcons = [2, 3, 4, 5, 6];

      return availableIcons.includes(strength)
        ? strength
        : availableIcons[availableIcons.length - 1];
    };

    const newId = $(cell + " img")
      .attr("id")
      .replaceAt($(`${cell} img`).attr("id").length - 1, getAnnotation());

    $(`${cell} a img`).attr("id", newId);
    $(`${cell} a img`).attr(
      "src",
      `./src/images/board/town/${faction.toLowerCase()}/${getIconByStrength(
        quantity + quality
      )}.png`
    );
    $(`${cell} a`).attr("title", `[${name}]${extraTitle}`);
  };

  this.repaintMob = function (cell, unit, extraTitle) {
    const { factionTag, strength, name, movements } = unit;
    const faction = factionTag.toLowerCase();

    const getAnnotation = () => {
      const roman = "roman";
      const factionsMap = {
        roman: "a",
        barbarian: "e",
        nature: "n", //not really used here
      };

      return factionsMap[faction || roman] || factionsMap[roman];
    };

    const newId = $(cell + " img")
      .attr("id")
      .replaceAt($(`${cell} img`).attr("id").length - 1, getAnnotation());

    $(`${cell} a img`).attr("id", newId);
    $(`${cell} a img`).attr(
      "src",
      `./src/images/board/mob/${faction.toLowerCase()}/${
        faction === "roman" && movements === 0 ? "grey/" : ""
      }${this.iconTemplates.getSoldierIconByStrength(strength)}.png`
    );
    $(`${cell} a`).attr("title", `[${name}]${extraTitle}`);
  };

  this.selectCell = (cell, faction) => {
    document.getElementById(cell).className = `cell selected-cell ${
      faction ? faction.toLowerCase() : factionsMap.nature
    }`;
  };

  this.unselectCell = (cell) => {
    document.getElementById(cell).className = "cell";
  };
}
