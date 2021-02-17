function init() {
    const urlParams = new URLSearchParams(window.location.search);

    const muteNarration = urlParams.get('muteNarration') !== null;
    if (muteNarration) {
        $("#mute_narration").html('Unmute Narration');
    }

    const disableAnimations = urlParams.get('disableAnimations') !== null;
    if (disableAnimations) {
        $("#disable_animations").prop('checked', true);
    }

    new Game(
        urlParams.get('level') || 1,
        muteNarration,
        disableAnimations
    );
}

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}

$(document).ready(init);
