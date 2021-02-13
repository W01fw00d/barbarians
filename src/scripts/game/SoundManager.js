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
      if (!this.isMuted) {
        new Audio('./src/sounds/' + audio + '.mp3').play();
      }
    }
  };

  this.narrator =  new SpeechSynthesisUtterance();
  this.narrator.lang = 'en';
  this.speaker = window.speechSynthesis;
  this.diaryGenerator = new DiaryGenerator();
}

SoundManager.prototype.getMusic = function() {
  return this.music;
};

SoundManager.prototype.getSFX = function() {
  return this.sfx;
};

SoundManager.prototype.narrate = function() {
  this.speaker.cancel();

  return {
    dead: (killer, victim) => {
      if (!this.sfx.isMuted) {
        this.narrator.text = this.diaryGenerator.dead(killer, victim);
        this.speaker.speak(this.narrator);
      }
    },
  }
};
