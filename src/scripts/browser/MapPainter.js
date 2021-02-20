//TODO Name it BoardPainter
function MapPainter() {
  const factionsMap = {
    roman: "red",
    barbarian: "blue",
    nature: "grey",
  };

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

  this.repaintTown = function (
    iteration,
    conqueredUnit,
    annotation,
    img,
    extraTitle
  ) {
    const newId = $(iteration + " img")
      .attr("id")
      .replaceAt($(`${iteration} img`).attr("id").length - 1, annotation);

    $(`${iteration} a img`).attr("id", newId);
    $(`${iteration} a img`).attr("src", `./src/images/board/${img}.png`);
    $(`${iteration} a`).attr("title", `[${conqueredUnit.name}]${extraTitle}`);
  };

  this.selectCell = (cell, faction) => {
    $(`#${cell}`).addClass(
      `selected-cell-${
        factionsMap[faction ? faction.toLowerCase() : factionsMap.nature]
      }`
    );
  };

  this.unselectCell = (cell, faction) => {
    $(`#${cell}`).removeClass(
      `selected-cell-${
        factionsMap[faction ? faction.toLowerCase() : factionsMap.nature]
      }`
    );
  };
}
