function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const game = new Game(urlParams.get('level') || 1);
}

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}

$(document).ready(init);
