function Neutral() {
    Player.call(this);
    this.name = 'neutral';
}
//TODO: create yet another parent class to share between human, ai and neutral; that doesn't include move functions and other things only needed by ai and human
Neutral.prototype = Object.create(Player.prototype);
