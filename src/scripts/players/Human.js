function Human() {
    Player.call(this);
    this.name = 'human';
    this.gold = 1;
}

Human.prototype = Object.create(Player.prototype);

Human.prototype.setGold = function(gold) {
    this.gold = gold;
    $('#gold').val(this.gold);
}
