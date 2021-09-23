function init() {
  const urlParams = new URLSearchParams(window.location.search);

  const muteNarration = urlParams.get("muteNarration") !== null;
  if (muteNarration) {
    $("#mute_narration").html("Unmute Narration");
  }

  const disableAnimations = urlParams.get("disableAnimations") !== null;
  if (disableAnimations) {
    $("#enable_animations").prop("checked", false);
  }

  const disableModals = urlParams.get("disableModals") !== null;
  if (disableModals) {
    // TODO: Add a new checkbox to options
    // $("#enable_modals").prop("checked", false);
  }

  new Game(
    urlParams.get("level") || 1,
    muteNarration,
    !disableAnimations,
    !disableModals
  );
}

String.prototype.replaceAt = function (index, character) {
  return (
    this.substr(0, index) + character + this.substr(index + character.length)
  );
};

$(document).ready(init);
