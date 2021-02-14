function DiaryGenerator() {}

DiaryGenerator.prototype.dead = function(killer, victim) {
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const humanAi = () => {
    const getPostPhrase = () => {
      const phrases = [
        '',
        ' We put its head on a pike in front on our camp as a warning.',
        ' I personally congratulated the lad.',
      ];

      return phrases[getRandomInt(0, phrases.length)];
    };

    return `A barbarian was defeated that day by ${killer.name}.${getPostPhrase()}`;
  };

  const humanNeutral = () => {
    const getPostPhrase = () => {
      const phrases = [
        ', but the human won.',
        '. Luckily, our soldier slayed the beast.',
      ];

      return phrases[getRandomInt(0, phrases.length)];
    };

    return `A wolf pack attacked ${killer.name}${getPostPhrase()}`
  };

  const aiHuman = () => {
    const getPostPhrase = () => {
      const phrases = [
        '',
        ' I forgot to send flowers to the widow.',
        ' I think the soldier had a son.',
        ' I sent the typical letter to the family.',
        ' That soldier was the real hero of the battle.',
        ' Sometimes, at night, I still hear the soldier screams.',
        ' Not the strongest soldier, but probably the more loyal.',
        " We took the soldier to the medic, but didn't make through the night.",
        " The soldier lived, but couldn't walk anymore.",
        " The soldier lived, went back home, got chased by inner demons, became a drunk.",
      ];

      return phrases[getRandomInt(0, phrases.length)];
    };

    return `${victim.name}, one of our own, was killed today by a damn barbarian.${getPostPhrase()}`;
  };

  const aiNeutral = () => {
    const getPhrase = () => {
      const phrases = [
        `It seems that the barbarians are hungry, there have been reports of them hunting some wolves.`,
        `A barbarian killed some wolves today. At least they are good for something.`,
        `It's funny to see beast fighting. Today, the barbarian won.`,
      ];

      return phrases[getRandomInt(0, phrases.length)];
    };

    return getPhrase();
  };

  const neutralHuman = () => {
    const getPhrase = () => {
      const phrases = [
        `A misfortune happened today. A wolf pack attacked ${victim.name} out of the camp: we found the soldier already dead.`,
        `${victim.name} went to drive away some wolves, but the soldier never came back...`,
        `${victim.name} was devoured by wolves... better to tell a more glorious death to the family.`,
      ];

      return phrases[getRandomInt(0, phrases.length)];
    };

    return getPhrase();
  };

  const neutralAi = () => {
    const getPostPhrase = () => {
      const phrases = [
        '',
        ' Even nature hates them.',
        ' Beasts killing beasts.',
      ];

      return phrases[getRandomInt(0, phrases.length)];
    }

    return `It seems that some wolves ate a barbarian alive today.${getPostPhrase()}`;
  };

  const killerVictimMap = {
    human: {
      ai: humanAi,
      neutral: humanNeutral,
    },
    ai: {
      human: aiHuman,
      neutral: aiNeutral,
    },
    neutral: {
      human: neutralHuman,
      ai: neutralAi,
    },
  };

  return killerVictimMap[killer.player][victim.player]();
}
