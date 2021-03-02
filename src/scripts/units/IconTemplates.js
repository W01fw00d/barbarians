//TODO all this should probably go into browser/
function IconTemplates() {}

IconTemplates.prototype.getBase = function (id, title, img) {
  return (
    '<a id="tooltip' +
    id +
    '" href="#" data-toggle="tooltip" title="' +
    title +
    '">' +
    '<img class="icon" id="icon' +
    id +
    '" src="./src/images/board/' +
    img +
    '.png"></img></a>'
  );
};

IconTemplates.prototype.getMob = function (id, name, img, extraTitle = "") {
  const title = `[${name}]${extraTitle}`;

  return this.getBase(id, title, `mob/${img}`);
};

IconTemplates.prototype.getStarterAIMob = function (id, name) {
  return this.getAIMob(id, name, null, 1);
};

IconTemplates.prototype.getAIMob = function (id, _, _, strength) {
  return this.getMob(
    id,
    "Barbarian",
    `barbarian/${this.getIconByStrength(strength)}`
  );
};

IconTemplates.prototype.getStarterHumanMob = function (id, name) {
  return this.getHumanMob(id, name, 2, 1);
};

IconTemplates.prototype.getIconByStrength = function (strength) {
  const availableIcons = [1, 2, 4, 8];

  return availableIcons.includes(strength)
    ? strength
    : availableIcons[availableIcons.length - 1];
};

IconTemplates.prototype.getHumanMob = function (id, name, movements, strength) {
  return this.getMob(
    id,
    name,
    `roman/${this.getIconByStrength(strength)}`,
    `| Moves: [${movements}] | Strength: [${strength}]`
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
    `roman/grey/${this.getIconByStrength(strength)}`,
    `| Moves: [${movements}] | Strength: [${strength}]`
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
