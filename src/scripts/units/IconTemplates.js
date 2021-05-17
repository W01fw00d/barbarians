//TODO all this should probably go into browser/
function IconTemplates() {}

IconTemplates.prototype.getBase = (id, title, img, draggable = false) =>
  `<a id="tooltip${id}" ` +
  `class="icon-wrapper" ` +
  `href="#" ` +
  `data-toggle="tooltip" ` +
  `title="${title}"${draggable ? ' draggable="true"' : ""}>` +
  `<img class="icon" id="icon${id}" src="./src/images/board/${img}.png"/>` +
  `</a>`;

IconTemplates.prototype.getMob = function (
  id,
  name,
  img,
  extraTitle = "",
  draggable = false
) {
  const title = `[${name}]${extraTitle}`;

  return this.getBase(id, title, `mob/${img}`, draggable);
};

IconTemplates.prototype.getStarterAIMob = function (id, name) {
  return this.getAIMob(id, name, null, 1);
};

IconTemplates.prototype.getAIMob = function (id, _, _, strength) {
  return this.getMob(
    id,
    "Barbarian",
    `barbarian/${this.getSoldierIconByStrength(strength)}`
  );
};

IconTemplates.prototype.getStarterHumanMob = function (id, name) {
  return this.getHumanMob(id, name, 2, 1);
};

IconTemplates.prototype.getSoldierIconByStrength = function (strength) {
  const availableIcons = [1, 2, 4, 8];

  return availableIcons.includes(strength)
    ? strength
    : availableIcons[availableIcons.length - 1];
};

IconTemplates.prototype.getHumanMob = function (id, name, movements, strength) {
  const draggable = true;

  return this.getMob(
    id,
    name,
    `roman/${this.getSoldierIconByStrength(strength)}`,
    ` | Moves: [${movements}] | Strength: [${strength}]`,
    draggable
  );
};

IconTemplates.prototype.getUsedHumanMob = function (
  id,
  name,
  movements,
  strength
) {
  return this.getMob(
    id,
    name,
    `roman/grey/${this.getSoldierIconByStrength(strength)}`,
    ` | Moves: [${movements}] | Strength: [${strength}]`
  );
};

IconTemplates.prototype.getNeutralMob = function (id) {
  return this.getBase(id, "Hungry wolfs", "mob/nature/wolves");
};

IconTemplates.prototype.getNeutralTown = function (id) {
  return this.getBase(id, "Free Town", "town/nature/free");
};

IconTemplates.prototype.getTown = function (id, name, img, extraTitle = "") {
  return this.getBase(id, `[${name}]${extraTitle}`, `town/${img}`);
};

IconTemplates.prototype.getHumanTown = function (id, name) {
  return this.getTown(id, name, "roman/2", " | Quantity: [1] | Quality: [1]");
};

IconTemplates.prototype.getAITown = function (id, name) {
  return this.getTown(id, name, "barbarian/2");
};
