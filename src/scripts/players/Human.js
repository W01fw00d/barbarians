function Human(map, mapPainter) {
    Player.call(this, map, mapPainter);
    this.name = 'human';
}

Human.prototype = Object.create(Player.prototype);

Human.prototype.setGold = function(gold) {
    this.gold = gold;
    $('#gold').val(this.gold);
}
