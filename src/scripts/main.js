function init() {
    // You can set here a different starting level, for testing purposes (1 - 12)
    const game = new Game(1);
}

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}

$(document).ready(init);