function Neutral() {
    Player.call(this);
    this.name = 'neutral';
}

Neutral.prototype = Object.create(Player.prototype);
