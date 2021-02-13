function DiaryGenerator() {}

DiaryGenerator.prototype.dead = function(killer, victim) {
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const playerMobMap = {
    human: 'roman',
    ai: 'barbarian',
    neutral: 'a wolf',
  };

  const humanText = () => {
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

    return `${victim.name}, the ${playerMobMap[victim.player]}, ` +
      `was defeated that day by ${killer.name}, the ${playerMobMap[killer.player]}.${getPostPhrase()}`;
  };

  const aiText = () => {
    return `${victim.name}, the ${playerMobMap[victim.player]}, ` +
      `was defeated that day by ${killer.name}, the ${playerMobMap[killer.player]}.`;
  };

  const neutralText = () => {
    return `A wolf pack attacked, ` +
      `${killer.name}, the ${playerMobMap[killer.player]}. Luckily, the human slayed the beast.`
  };

  // Increase depth of map: each mob with the other 2. Examples:
  // human victim, wolves killer
  // ai victim, wolves killer
  const playerTextMap = {
    human: humanText,
    ai: aiText,
    neutral: neutralText,
  };

  return playerTextMap[victim.player]();
}
