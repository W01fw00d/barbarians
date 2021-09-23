function SoundManager(muteNarration) {
  this.narrator = {
    isMuted: muteNarration,
    mute: function () {
      window.speechSynthesis.cancel();
      this.isMuted = true;
    },
    unmute: function () {
      this.isMuted = false;
    },
  };

  this.speech = new SpeechSynthesisUtterance();
  this.speech.lang = "en";
  this.speaker = window.speechSynthesis;
  this.diaryGenerator = new DiaryGenerator();
}

SoundManager.prototype.narrate = function () {
  this.speaker.cancel();

  return {
    dead: (killer, victim) => {
      if (!this.narrator.isMuted) {
        this.speech.text = this.diaryGenerator.dead(killer, victim);
        this.speaker.speak(this.speech);
      }
    },
    conquered: (conqueror, town, newTownName) => {
      if (!this.narrator.isMuted) {
        this.speech.text = this.diaryGenerator.conquered(
          conqueror,
          town,
          newTownName
        );
        this.speaker.speak(this.speech);
      }
    },
    read: (text) => {
      if (!this.narrator.isMuted) {
        this.speech.text = text;
        this.speaker.speak(this.speech);
      }
    },
  };
};
