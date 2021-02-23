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

IconTemplates.prototype.getMob = function (id, name, movements, strength, img) {
  const title = `[${name}]. Moves: [${movements}], Strength: [${strength}]`;

  return this.getBase(id, title, `mob/${img}`);
};

IconTemplates.prototype.getStarterAIMob = function (id, name) {
  return this.getAIMob(id, name, 1, 1);
};

IconTemplates.prototype.getAIMob = function (id, _, movements, strength) {
  return this.getMob(id, "Barbarian", movements, strength, "barbarian/8");
};

IconTemplates.prototype.getStarterHumanMob = function (id, name) {
  return this.getHumanMob(id, name, 2, 1);
};

IconTemplates.prototype.getHumanMob = function (id, name, movements, strength) {
  return this.getMob(id, name, movements, strength, "roman/1");
};

IconTemplates.prototype.getUsedHumanMob = function (
  id,
  name,
  movements,
  strength
) {
  return this.getMob(id, name, movements, strength, "roman/grey/1");
};

IconTemplates.prototype.getNeutralMob = function (id) {
  return this.getBase(id, "Hungry wolfs", "mob/nature/wolves");
};

IconTemplates.prototype.getNeutralTown = function (id) {
  return this.getBase(id, "Free Town", "town/nature/free");
};

IconTemplates.prototype.getTown = function (id, name, img) {
  const title = `[${name}]. quantity: [1], quality: [1]`;

  return this.getBase(id, title, `town/${img}`);
};

IconTemplates.prototype.getHumanTown = function (id, name) {
  return this.getTown(id, name, "roman/2");
};

IconTemplates.prototype.getAITown = function (id, name) {
  return this.getTown(id, name, "barbarian/2");
};
