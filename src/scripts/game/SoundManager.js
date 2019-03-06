function SoundManager() {
  this.music = {
    audio: $('#music-bar'),
    isMuted: function () {
      return this.audio.prop('muted');
    },
    mute: function () {
      this.audio.prop('muted', true);
    },
    unmute: function() {
      this.audio.prop('muted', false);
    }
  };

  this.sfx = {
    isMuted: true,
    mute: function() {
      this.isMuted = true;
    },
    unmute: function() {
      this.isMuted = false;
    },
    play: function(audio) {
      if(!this.isMuted){
        new Audio('./src/sounds/' + audio + '.mp3').play();
      }
    }
  };
}

SoundManager.prototype.getMusic = function() {
  return this.music;
};

SoundManager.prototype.getSFX = function() {
  return this.sfx;
};
