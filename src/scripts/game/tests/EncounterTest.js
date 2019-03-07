describe("Encounter", ()=> {
  let iconTemplates,
    namesManager,
    soundManager,
    encounter,
    players;

  beforeEach(()=> {
    iconTemplates = new IconTemplates();
    namesManager = new NamesManager();
    soundManager = new SoundManager();
    map = new Map();

    encounter = new Encounter(iconTemplates, namesManager, soundManager, map);

    const human = new Player();
    human.setGold(0);
    human.units = {
      mobs: [],
      towns: []
    };

    const ai = new Player();
    ai.setGold(0);
    ai.units = {
      mobs: [],
      towns: []
    };

    const neutral = new Player();
    neutral.units = {
      mobs: [],
      towns: []
    };

    players = {
      human: human,
      ai: ai,
      neutral: neutral,
    };

    spyOn(soundManager.sfx, 'play');
  });

  describe("when unit strength is at least 2 points higher than adversary", ()=> {
    it("unit shall always win", ()=> {
      players.human.units.mobs.push({
        cell: 'icon00a',
        player: 'human',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Roman',
        // totalMovements: 0,
        // movements: 0,
        strength: 3,
      });

      const enemyCell = 'icon10e';

      players.ai.units.mobs.push({
        cell: enemyCell,
        player: 'ai',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Barbarian',
        strength: 1,
      });

      spyOn(map, 'getCellId')
        .withArgs('#cell0-1').and.returnValue(undefined)
        .withArgs('#cell-10').and.returnValue(undefined)
        .withArgs('#cell-01').and.returnValue(undefined)

        .withArgs('#cell10').and.returnValue(enemyCell)
        .withArgs('#cell01').and.returnValue(undefined);

      encounter.check(players.human.units.mobs[0], players);
      expect(players.ai.units.mobs.length).toBe(0);
      expect(soundManager.sfx.play).toHaveBeenCalledWith('kill');

      expect(players.human.gold).toBe(1);
    });
  });

//TODO refactor next tests
  describe("when unit strength is at least 2 points lower that adversary", ()=> {
    it("unit shall always loose", ()=> {
      unit = {strength: 1};
      adversary = {strength: 3};

      let result = encounter.compareStrengths(unit, adversary);

      expect(result.winner).toBe(adversary);
    });
  });

  describe("when unit strength is equal to adversary strength", ()=> {
    it("a random number shall be generated", ()=> {
      spyOn(Math, 'random');
      unit = {strength: 1};
      adversary = {strength: 1};

      let result = encounter.compareStrengths(unit, adversary);

      expect(Math.random).toHaveBeenCalled();
    });
  });

  describe("when unit strength is exactly one point higher that adversary strength", ()=> {
    it("a random number shall be generated", ()=> {
      spyOn(Math, 'random');
      unit = {strength: 2};
      adversary = {strength: 1};

      let result = encounter.compareStrengths(unit, adversary);

      expect(Math.random).toHaveBeenCalled();
    });
  });

  describe("when unit strength is exactly one point lower that adversary strength", ()=> {
    it("a random number shall be generated", ()=> {
      spyOn(Math, 'random');
      unit = {strength: 1};
      adversary = {strength: 2};

      let result = encounter.compareStrengths(unit, adversary);

      expect(Math.random).toHaveBeenCalled();
    });
  });

  // changeIcon
  describe("when human unit have movements left and haven´t fought", ()=> {
    it("HumanMob template shall be used", ()=> {
      unit = {player: 'human', movements: 1, cell: 'icon'};

      spyOn(iconTemplates, 'getHumanMob');

      encounter.changeIcon(unit, {});
      expect(iconTemplates.getHumanMob).toHaveBeenCalled();
    });
  });

  describe("when human unit have NO movements left", ()=> {
    it("UsedHumanMob template shall be used", ()=> {
      unit = {player: 'human', movements: 0, cell: 'icon'};

      spyOn(iconTemplates, 'getUsedHumanMob');

      encounter.changeIcon(unit, {});
      expect(iconTemplates.getUsedHumanMob).toHaveBeenCalled();
    });
  });

  describe("when human unit have won a fight", ()=> {
    it("UsedHumanMob template shall be used", ()=> {
      unit = {player: 'human', movements: 2, cell: 'icon'};

      spyOn(iconTemplates, 'getUsedHumanMob');

      encounter.changeIcon(unit, unit);
      expect(iconTemplates.getUsedHumanMob).toHaveBeenCalled();
    });
  });

  describe("when unit is AI", ()=> {
    it("getAIMob template shall be used", ()=> {
      unit = {player: 'ai', cell: 'icon'};

      spyOn(iconTemplates, 'getAIMob');

      encounter.changeIcon(unit, unit);
      expect(iconTemplates.getAIMob).toHaveBeenCalled();
    });
  });
});
