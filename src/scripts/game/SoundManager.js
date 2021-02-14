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

  this.narrator = {
    isMuted: true,
    mute: function() {
      this.isMuted = true;
    },
    unmute: function() {
      this.isMuted = false;
    },
  };

  this.speech =  new SpeechSynthesisUtterance();
  this.speech.lang = 'en';
  this.speaker = window.speechSynthesis;
  this.diaryGenerator = new DiaryGenerator();
}

SoundManager.prototype.getMusic = function() {
  return this.music;
};

SoundManager.prototype.getNarrator = function() {
  return this.narrator;
};

SoundManager.prototype.narrate = function() {
  this.speaker.cancel();

  return {
    dead: (killer, victim) => {
      if (!this.narrator.isMuted) {
        this.speech.text = this.diaryGenerator.dead(killer, victim);
        this.speaker.speak(this.speech);
      }
    },
  }
};
