function Neutral() {
  Faction.call(this);

  this.name = "neutral";
}

Neutral.prototype = Object.create(Faction.prototype);

Neutral.prototype.reset = function () {
  this.units = {
    mobs: [],
    towns: [],
  };
};
