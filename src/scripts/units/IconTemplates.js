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

  return this.getBase(id, title, img);
};

IconTemplates.prototype.getStarterAIMob = function (id, name) {
  return this.getAIMob(id, name, 1, 1);
};

IconTemplates.prototype.getAIMob = function (id, _, movements, strength) {
  return this.getMob(id, "Barbarian", movements, strength, "SB_del_def");
};

IconTemplates.prototype.getStarterHumanMob = function (id, name) {
  return this.getHumanMob(id, name, 2, 1);
};

IconTemplates.prototype.getHumanMob = function (id, name, movements, strength) {
  return this.getMob(id, name, movements, strength, "SR_del_def");
};

IconTemplates.prototype.getUsedHumanMob = function (
  id,
  name,
  movements,
  strength
) {
  return this.getMob(id, name, movements, strength, "SR_del_def_grey");
};

IconTemplates.prototype.getNeutralMob = function (id) {
  return this.getBase(id, "Hungry wolfs", "L_del_def");
};

IconTemplates.prototype.getNeutralTown = function (id) {
  return this.getBase(id, "Free Town", "AN_del_def");
};

IconTemplates.prototype.getTown = function (id, name, img) {
  const title = `[${name}]. quantity: [1], quality: [1]`;

  return this.getBase(id, title, img);
};

IconTemplates.prototype.getHumanTown = function (id, name) {
  return this.getTown(id, name, "AR_del_def");
};

IconTemplates.prototype.getAITown = function (id, name) {
  return this.getTown(id, name, "AB_del_def");
};
