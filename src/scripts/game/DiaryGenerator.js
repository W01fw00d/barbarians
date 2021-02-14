function DiaryGenerator() {}

DiaryGenerator.prototype.dead = function(killer, victim) {
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const playerMobMap = {
    human: 'roman',
    ai: 'barbarian',
    neutral: 'a wolf',
  };

  const humanAi = () => {
    return `A barbarian was defeated that day by ${killer.name}.`;
  };

  const humanNeutral = () => {
    return `A wolf pack attacked ${killer.name}. Luckily, our soldier slayed the beast.`
  };

  const aiHuman = () => {
    const getPostPhrase = () => {
      const postPhrases = [
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

      return postPhrases[getRandomInt(0, postPhrases.length)];
    }

    return `${victim.name}, one of our own, was killed today by a damn barbarian.${getPostPhrase()}`;
  };

  const aiNeutral = () => {
    return `It seems that the barbarians are hungry, there have been reports of them hunting some wolves.`;
  };

  const neutralHuman = () => {
    return `A misfortune happened today. A wolf pack attacked ${victim.name} out of the camp: we found the soldier already dead.`
  };

  const neutralAi = () => {
    const getPostPhrase = () => {
      const postPhrases = [
        '',
        ' Even nature hate them.',
        ' Beasts killing beasts.',
      ];

      return postPhrases[getRandomInt(0, postPhrases.length)];
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
