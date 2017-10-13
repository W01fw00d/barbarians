$(document).ready(init);

function init() {
    const game = new Game();
    game.start(1);
}

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}