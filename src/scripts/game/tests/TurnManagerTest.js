describe("TurnManager", ()=> {
  beforeEach(()=> {
    encounter = new Encounter();
    levelManager = new LevelManager();
    namesManager = new NamesManager();
    iconTemplates = new IconTemplates();
    map = new Map();
    mapPainter = new MapPainter();

    turnManager = new TurnManager(
      encounter,
      levelManager,
      namesManager,
      iconTemplates,
      map,
      mapPainter
    );

    currentMapLevel = 1;

    const human = new Human();
    human.name = 'human';
    human.setGold(1);
    human.units = {
      mobs: [],
      towns: []
    };

    const ai = new AI();
    ai.name = 'ai';
    ai.setGold(1);
    ai.units = {
      mobs: [],
      towns: []
    };

    // const neutral = new Player();
    // neutral.units = {
    //   mobs: [],
    //   towns: []
    // };

    players = {
      human: human,
      ai: ai,
      // neutral: neutral,
    };

    spyOn(namesManager, 'getRandomName');
    spyOn(players.ai, 'performTurn');
    spyOn(players.human, 'setGold');
    spyOn(levelManager, 'checkEndOfLevelCondition');
  });

//endTurn
  describe("When turn is finished and a Human Town has empty space", ()=> {
    it("A new Human Soldier will be created", ()=> {
      spyOn(iconTemplates, 'getHumanMob');
      spyOn(encounter, 'check');

      unitCell = 'icon10A';

      players.human.units.towns.push({
        cell: unitCell,
        stats: {
          quantity: 1,
          quality: 1
        },
      });

      turnManager.endTurn(currentMapLevel, players);

      expect(iconTemplates.getHumanMob).toHaveBeenCalled();
      expect(encounter.check).toHaveBeenCalled();
      expect(players.human.units.mobs.length).toBe(1);
    });
  });

  describe("When turn is finished and a Town has no empty spaces", ()=> {
    it("A new Soldier will NOT be created on out-of-bottom-bounds", ()=> {
      spyOn(iconTemplates, 'getHumanMob');
      spyOn(encounter, 'check');

      const unitCell = 'icon73A';
      const occupied = 'icon00N'

      spyOn(map, 'getCellId')
        .withArgs('#cell83').and.returnValue(undefined)
        .withArgs('#cell63').and.returnValue(occupied)
        .withArgs('#cell72').and.returnValue(occupied)
        .withArgs('#cell74').and.returnValue(occupied);

      players.human.units.towns.push({
        cell: unitCell,
        stats: {
          quantity: 1,
          quality: 1
        },
      });

      turnManager.endTurn(currentMapLevel, players);

      expect(iconTemplates.getHumanMob).not.toHaveBeenCalled();
      expect(encounter.check).not.toHaveBeenCalled();
      expect(players.human.units.mobs.length).toBe(0);
    });
    it("A new Soldier will NOT be created on out-of-top-bounds", ()=> {
      spyOn(iconTemplates, 'getHumanMob');
      spyOn(encounter, 'check');

      const unitCell = 'icon03A';
      const occupied = 'icon00N'

      spyOn(map, 'getCellId')
        .withArgs('#cell-13').and.returnValue(undefined)
        .withArgs('#cell13').and.returnValue(occupied)
        .withArgs('#cell02').and.returnValue(occupied)
        .withArgs('#cell04').and.returnValue(occupied);

      players.human.units.towns.push({
        cell: unitCell,
        stats: {
          quantity: 1,
          quality: 1
        },
      });

      turnManager.endTurn(currentMapLevel, players);

      expect(iconTemplates.getHumanMob).not.toHaveBeenCalled();
      expect(encounter.check).not.toHaveBeenCalled();
      expect(players.human.units.mobs.length).toBe(0);
    });
    it("A new Soldier will NOT be created on out-of-right-bounds", ()=> {
      spyOn(iconTemplates, 'getHumanMob');
      spyOn(encounter, 'check');

      const unitCell = 'icon37A';
      const occupied = 'icon00N'

      spyOn(map, 'getCellId')
        .withArgs('#cell38').and.returnValue(undefined)
        .withArgs('#cell36').and.returnValue(occupied)
        .withArgs('#cell27').and.returnValue(occupied)
        .withArgs('#cell47').and.returnValue(occupied);

      players.human.units.towns.push({
        cell: unitCell,
        stats: {
          quantity: 1,
          quality: 1
        },
      });

      turnManager.endTurn(currentMapLevel, players);

      expect(iconTemplates.getHumanMob).not.toHaveBeenCalled();
      expect(encounter.check).not.toHaveBeenCalled();
      expect(players.human.units.mobs.length).toBe(0);
    });
    it("A new Soldier will NOT be created on out-of-left-bounds", ()=> {
      spyOn(iconTemplates, 'getHumanMob');
      spyOn(encounter, 'check');

      const unitCell = 'icon30A';
      const occupied = 'icon00N'

      spyOn(map, 'getCellId')
        .withArgs('#cell3-1').and.returnValue(undefined)
        .withArgs('#cell31').and.returnValue(occupied)
        .withArgs('#cell20').and.returnValue(occupied)
        .withArgs('#cell40').and.returnValue(occupied);

      players.human.units.towns.push({
        cell: unitCell,
        stats: {
          quantity: 1,
          quality: 1
        },
      });

      turnManager.endTurn(currentMapLevel, players);

      expect(iconTemplates.getHumanMob).not.toHaveBeenCalled();
      expect(encounter.check).not.toHaveBeenCalled();
      expect(players.human.units.mobs.length).toBe(0);
    });
  });

  describe("When turn is finished and Town has empty spaces but only 1 quantity", ()=> {
    it("Only 1 new Soldier will be created", ()=> {
      spyOn(iconTemplates, 'getHumanMob');
      spyOn(encounter, 'check');

      unitCell = 'icon10A';

      players.human.units.towns.push({
        cell: unitCell,
        stats: {
          quantity: 1,
          quality: 1
        },
      });

      turnManager.endTurn(currentMapLevel, players);

      expect(iconTemplates.getHumanMob).toHaveBeenCalled();
      expect(encounter.check).toHaveBeenCalled();
      expect(players.human.units.mobs.length).toBe(1);
    });
  });

  describe("When turn is finished and an AI Town has empty space", ()=> {
    it("A new AI Soldier will be created", ()=> {
      spyOn(iconTemplates, 'getAIMob');
      spyOn(encounter, 'check');

      unitCell = 'icon10E';

      players.ai.units.towns.push({
        cell: unitCell,
        stats: {
          quantity: 1,
          quality: 1
        },
      });

      turnManager.endTurn(currentMapLevel, players);

      expect(iconTemplates.getAIMob).toHaveBeenCalled();
      expect(encounter.check).toHaveBeenCalled();
      expect(players.ai.units.mobs.length).toBe(1);
    });
  });
  //
  // describe("When turn is finished", ()=> {
  //   it("Human and AI will gain 3 gold", ()=> {
  //     // expect(players.ai.gold).toBe(4);
  //     expect(players.human.setGold).toHaveBeenCalledWith(4);
  //   });
  //
  //   it("The End of Level Condition is checked", ()=> {
  //
  //   });
  // });
  //
  // describe("When turn is finished and a Human Soldier exists", ()=> {
  //   it("They recover all their movements and they are painted as active", ()=> {
  // players.human.units.mobs.push({
  //   cell: 'icon00a',
  //   player: 'human',
  //   name: 'name',
  //   typeTag: 'Soldier',
  //   factionTag: 'Roman',
  //   movements: 3,
  //   strength: 3,
  // });
  //   });
  // });
  //
  // describe("When turn is finished and an AI Soldier exists", ()=> {
  //   it("They recover all their movements", ()=> {
  //   });
  // });

});
