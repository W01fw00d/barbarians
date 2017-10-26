function SoundManager() {
  this.audio = $('#music-bar');
  this.audio.prop('autoplay', true);
  this.audio.load();
}

SoundManager.prototype.isMuted = function () {
  return this.audio.prop('muted');
};

SoundManager.prototype.mute = function () {
  this.audio.prop('muted', true);
};

SoundManager.prototype.unmute = function() {
  this.audio.prop('muted', false);
};
