function Human(map, mapPainter, browserUtils) {
  Player.call(this, map, mapPainter, browserUtils);
  this.name = "human";
}

Human.prototype = Object.create(Player.prototype);

Human.prototype.setGold = function (gold) {
  this.gold = gold;
  $("#gold").val(this.gold);
};
