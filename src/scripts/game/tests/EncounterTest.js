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
    mapPainter = new MapPainter();

    encounter = new Encounter(
      iconTemplates,
      namesManager,
      soundManager,
      map,
      mapPainter
    );

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
    it("unit shall always kill adversary and gain gold", ()=> {
      spyOn(iconTemplates, 'getUsedHumanMob');

      enemyCell = 'icon10e';

      spyOn(map, 'getCellId')
        .withArgs('#cell0-1').and.returnValue(undefined)
        .withArgs('#cell-10').and.returnValue(undefined)
        .withArgs('#cell-01').and.returnValue(undefined)

        .withArgs('#cell10').and.returnValue(enemyCell)
        .withArgs('#cell01').and.returnValue(undefined);

      players.human.units.mobs.push({
        cell: 'icon00a',
        player: 'human',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Roman',
        movements: 3,
        strength: 3,
      });

      players.ai.units.mobs.push({
        cell: enemyCell,
        player: 'ai',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Barbarian',
        strength: 1,
      });

      encounter.check(players.human.units.mobs[0], players);

      expect(players.human.units.mobs.length).toBe(1);
      expect(players.ai.units.mobs.length).toBe(0);
      //expect(soundManager.sfx.play).toHaveBeenCalledWith('kill');

      expect(iconTemplates.getUsedHumanMob).toHaveBeenCalled();

      expect(players.ai.gold).toBe(0);
      expect(players.human.gold).toBe(1);
    });

    it("unit shall always kill neutral adversary", ()=> {
      spyOn(iconTemplates, 'getUsedHumanMob');

      enemyCell = 'icon10n';

      spyOn(map, 'getCellId')
        .withArgs('#cell0-1').and.returnValue(undefined)
        .withArgs('#cell-10').and.returnValue(undefined)
        .withArgs('#cell-01').and.returnValue(undefined)

        .withArgs('#cell10').and.returnValue(enemyCell)
        .withArgs('#cell01').and.returnValue(undefined);

      players.human.units.mobs.push({
        cell: 'icon00a',
        player: 'human',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Roman',
        strength: 3,
      });

      players.neutral.units.mobs.push({
        cell: enemyCell,
        player: 'neutral',
        name: 'name',
        typeTag: 'Beast',
        factionTag: 'Nature',
        strength: 1,
      });

      encounter.check(players.human.units.mobs[0], players);

      expect(players.human.units.mobs.length).toBe(1);
      expect(players.neutral.units.mobs.length).toBe(0);
      //expect(soundManager.sfx.play).toHaveBeenCalledWith('wolf_scream');

      expect(players.human.gold).toBe(0);
    });
  });

  describe("when unit strength is at least 2 points lower that adversary", ()=> {
    it("unit shall always be killed by adversary", ()=> {
      spyOn(iconTemplates, 'getAIMob');

      enemyCell = 'icon10a';

      spyOn(map, 'getCellId')
        .withArgs('#cell0-1').and.returnValue(undefined)
        .withArgs('#cell-10').and.returnValue(undefined)
        .withArgs('#cell-01').and.returnValue(undefined)

        .withArgs('#cell10').and.returnValue(enemyCell)
        .withArgs('#cell01').and.returnValue(undefined);

      players.human.units.mobs.push({
        cell: enemyCell,
        player: 'human',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Roman',
        strength: 1,
      });

      players.ai.units.mobs.push({
        cell: 'icon00e',
        player: 'ai',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Barbarian',
        strength: 3,
      });

      encounter.check(players.ai.units.mobs[0], players);
      expect(players.human.units.mobs.length).toBe(0);
      expect(players.ai.units.mobs.length).toBe(1);
      //expect(soundManager.sfx.play).toHaveBeenCalledWith('scream');

      expect(iconTemplates.getAIMob).toHaveBeenCalled();

      expect(players.ai.gold).toBe(1);
      expect(players.human.gold).toBe(0);
    });
  });

  describe("when unit strength is equal to adversary strength", ()=> {
    it("a random number shall be generated", ()=> {
      spyOn(Math, 'random');

      enemyCell = 'icon10e';

      spyOn(map, 'getCellId')
        .withArgs('#cell0-1').and.returnValue(undefined)
        .withArgs('#cell-10').and.returnValue(undefined)
        .withArgs('#cell-01').and.returnValue(undefined)

        .withArgs('#cell10').and.returnValue(enemyCell)
        .withArgs('#cell01').and.returnValue(undefined);

      players.human.units.mobs.push({
        cell: 'icon00a',
        player: 'human',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Roman',
        strength: 1,
      });

      players.ai.units.mobs.push({
        cell: enemyCell,
        player: 'ai',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Barbarian',
        strength: 1,
      });

      encounter.check(players.human.units.mobs[0], players);

      expect(Math.random).toHaveBeenCalled();
    });
  });

  describe("when unit strength is exactly one point higher that adversary strength", ()=> {
    it("a random number shall be generated", ()=> {
      spyOn(Math, 'random');

      enemyCell = 'icon10e';

      spyOn(map, 'getCellId')
        .withArgs('#cell0-1').and.returnValue(undefined)
        .withArgs('#cell-10').and.returnValue(undefined)
        .withArgs('#cell-01').and.returnValue(undefined)

        .withArgs('#cell10').and.returnValue(enemyCell)
        .withArgs('#cell01').and.returnValue(undefined);

      players.human.units.mobs.push({
        cell: 'icon00a',
        player: 'human',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Roman',
        strength: 2,
      });

      players.ai.units.mobs.push({
        cell: enemyCell,
        player: 'ai',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Barbarian',
        strength: 1,
      });

      encounter.check(players.human.units.mobs[0], players);

      expect(Math.random).toHaveBeenCalled();
    });
  });

  describe("when unit strength is exactly one point lower that adversary strength", ()=> {
    it("a random number shall be generated", ()=> {
      spyOn(Math, 'random');

      enemyCell = 'icon10e';

      spyOn(map, 'getCellId')
        .withArgs('#cell0-1').and.returnValue(undefined)
        .withArgs('#cell-10').and.returnValue(undefined)
        .withArgs('#cell-01').and.returnValue(undefined)

        .withArgs('#cell10').and.returnValue(enemyCell)
        .withArgs('#cell01').and.returnValue(undefined);

      players.human.units.mobs.push({
        cell: 'icon00a',
        player: 'human',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Roman',
        strength: 1,
      });

      players.ai.units.mobs.push({
        cell: enemyCell,
        player: 'ai',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Barbarian',
        strength: 2,
      });

      encounter.check(players.human.units.mobs[0], players);

      expect(Math.random).toHaveBeenCalled();
    });
  });

  // changeIcon
  describe("when human unit have movements left and haven´t fought", ()=> {
    it("HumanMob template shall be used", ()=> {
      spyOn(iconTemplates, 'getHumanMob');

      spyOn(map, 'getCellId')
        .withArgs('#cell0-1').and.returnValue(undefined)
        .withArgs('#cell-10').and.returnValue(undefined)
        .withArgs('#cell-01').and.returnValue(undefined)
        .withArgs('#cell10').and.returnValue(undefined)
        .withArgs('#cell01').and.returnValue(undefined);

      players.human.units.mobs.push({
        cell: 'icon00a',
        player: 'human',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Roman',
        strength: 1,
        movements: 1,
      });

      encounter.check(players.human.units.mobs[0], players);

      expect(iconTemplates.getHumanMob).toHaveBeenCalled();
    });
  });

  describe("when human unit have NO movements left", ()=> {
    it("UsedHumanMob template shall be used", ()=> {
      spyOn(iconTemplates, 'getUsedHumanMob');

      spyOn(map, 'getCellId')
        .withArgs('#cell0-1').and.returnValue(undefined)
        .withArgs('#cell-10').and.returnValue(undefined)
        .withArgs('#cell-01').and.returnValue(undefined)
        .withArgs('#cell10').and.returnValue(undefined)
        .withArgs('#cell01').and.returnValue(undefined);

      players.human.units.mobs.push({
        cell: 'icon00a',
        player: 'human',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Roman',
        strength: 1,
        movements: 0,
      });

      encounter.check(players.human.units.mobs[0], players);

      expect(iconTemplates.getUsedHumanMob).toHaveBeenCalled();
    });
  });

  describe("When human unit is nearby AI town", ()=> {
    it("AI Town will become human town", ()=> {
      spyOn(iconTemplates, 'getUsedHumanMob');
      spyOn(mapPainter, 'repaintTown');
      spyOn(namesManager, 'getRandomName');

      enemyCell = 'icon10E';

      spyOn(map, 'getCellId')
        .withArgs('#cell0-1').and.returnValue(undefined)
        .withArgs('#cell-10').and.returnValue(undefined)
        .withArgs('#cell-01').and.returnValue(undefined)

        .withArgs('#cell10').and.returnValue(enemyCell)
        .withArgs('#cell01').and.returnValue(undefined);

      players.human.units.mobs.push({
        cell: 'icon00a',
        player: 'human',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Roman',
        movements: 3,
        strength: 3,
      });

      players.ai.units.towns.push({
        cell: enemyCell,
        player: 'ai',
        name: 'name',
        typeTag: 'Town',
        factionTag: 'Barbarian',
        stats: {
          quantity: 1,
          quality: 1
        },
      });

      encounter.check(players.human.units.mobs[0], players);

      expect(players.ai.units.towns.length).toBe(0);
      expect(players.human.units.towns.length).toBe(1);

      expect(mapPainter.repaintTown).toHaveBeenCalled();
      //expect(soundManager.sfx.play).toHaveBeenCalledWith('rom_conquest');

      // TODO cuando se captura una ciudad, se deberían perder los movimientos restantes
    });
  });

  describe("When human unit is nearby a Neutral town", ()=> {
    it("Neutral Town will become human town", ()=> {
      spyOn(iconTemplates, 'getUsedHumanMob');
      spyOn(mapPainter, 'repaintTown');
      spyOn(namesManager, 'getRandomName');

      enemyCell = 'icon10N';

      spyOn(map, 'getCellId')
        .withArgs('#cell0-1').and.returnValue(undefined)
        .withArgs('#cell-10').and.returnValue(undefined)
        .withArgs('#cell-01').and.returnValue(undefined)

        .withArgs('#cell10').and.returnValue(enemyCell)
        .withArgs('#cell01').and.returnValue(undefined);

      players.human.units.mobs.push({
        cell: 'icon00a',
        player: 'human',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Roman',
        movements: 3,
        strength: 3,
      });

      players.neutral.units.towns.push({
        cell: enemyCell,
        player: 'neutral',
        name: 'name',
        typeTag: 'Town',
        factionTag: 'Nature',
        stats: {
          quantity: 1,
          quality: 1
        },
      });

      encounter.check(players.human.units.mobs[0], players);

      expect(players.neutral.units.towns.length).toBe(0);
      expect(players.human.units.towns.length).toBe(1);

      expect(mapPainter.repaintTown).toHaveBeenCalled();
      //expect(soundManager.sfx.play).toHaveBeenCalledWith('rom_conquest');
      // TODO cuando se captura una ciudad, se deberían perder los movimientos restantes
    });
  });

  describe("When AI unit is nearby Human town", ()=> {
    it("Human Town will become AI town", ()=> {
      spyOn(mapPainter, 'repaintTown');
      spyOn(namesManager, 'getRandomName');

      enemyCell = 'icon10A';

      spyOn(map, 'getCellId')
        .withArgs('#cell0-1').and.returnValue(undefined)
        .withArgs('#cell-10').and.returnValue(undefined)
        .withArgs('#cell-01').and.returnValue(undefined)

        .withArgs('#cell10').and.returnValue(enemyCell)
        .withArgs('#cell01').and.returnValue(undefined);

      players.ai.units.mobs.push({
        cell: 'icon00e',
        player: 'ai',
        name: 'name',
        typeTag: 'Soldier',
        factionTag: 'Barbarian',
        movements: 3,
        strength: 3,
      });

      players.human.units.towns.push({
        cell: enemyCell,
        player: 'human',
        name: 'name',
        typeTag: 'Town',
        factionTag: 'Roman',
        stats: {
          quantity: 1,
          quality: 1
        },
      });

      encounter.check(players.ai.units.mobs[0], players);

      expect(players.ai.units.towns.length).toBe(1);
      expect(players.human.units.towns.length).toBe(0);

      expect(mapPainter.repaintTown).toHaveBeenCalled();
      //expect(soundManager.sfx.play).toHaveBeenCalledWith('bar_conquest');

      // TODO cuando se captura una ciudad, se deberían perder los movimientos restantes
    });
  });
});
