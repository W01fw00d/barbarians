describe("InfoLayer", ()=> {
  beforeEach(()=> {
    detailsPanelPainter = new DetailsPanelPainter();

    infoLayer = new InfoLayer(
      detailsPanelPainter
    );

    const human = new Player();
    human.units = {
      mobs: [],
      towns: [],
    };

    const ai = new Player();
    ai.units = {
      mobs: [],
      towns: [],
    };

    const neutral = new Player();
    neutral.units = {
      mobs: [],
      towns: [],
    };

    players = {
      human: human,
      ai: ai,
      neutral: neutral,
    };
  });

  describe("When Roman Town is clicked", ()=> {
    it("Details Panel will be updated with all its stats", ()=> {
      spyOn(detailsPanelPainter, 'showHumanTownPanel');

      townCellId = 'icon00A';

      players.human.units.towns.push({
        cell: townCellId,
        player: 'human',
        name: 'name',
        stats: {
          quantity: 1,
          quality: 1
        },
        quantityUpgradePrice: 1,
        qualityUpgradePrice: 1,
      });

      event = {
        target: {
          id: townCellId,
        },
      }

      result = infoLayer.checkUnitInfo(event, players);

      expect(result.mode).toBe(null);
      expect(result.unit).toBe(null);

      expect(detailsPanelPainter.showHumanTownPanel).toHaveBeenCalled();
    });
  });

  describe("When AI Town is clicked", ()=> {
    it("Details Panel will be updated with only basic stats", ()=> {
      spyOn(detailsPanelPainter, 'showAITownPanel');

      townCellId = 'icon00E';

      players.ai.units.towns.push({
        cell: townCellId,
        player: 'ai',
        name: 'name',
      });

      event = {
        target: {
          id: townCellId,
        },
      }

      result = infoLayer.checkUnitInfo(event, players);

      expect(result.mode).toBe(null);
      expect(result.unit).toBe(null);

      expect(detailsPanelPainter.showAITownPanel).toHaveBeenCalled();
    });
  });

  describe("When Neutral Town is clicked", ()=> {
    it("Details Panel will be updated with only basic stats", ()=> {
      spyOn(detailsPanelPainter, 'showNeutralTownPanel');

      townCellId = 'icon00N';

      players.neutral.units.towns.push({
        cell: townCellId,
        player: 'neutral',
        name: 'name',
      });

      event = {
        target: {
          id: townCellId,
        },
      }

      result = infoLayer.checkUnitInfo(event, players);

      expect(result.mode).toBe(null);
      expect(result.unit).toBe(null);

      expect(detailsPanelPainter.showNeutralTownPanel).toHaveBeenCalled();
    });
  });

  describe("When Roman Soldier is clicked", ()=> {
    it("Details Panel will be updated with all stats and action buttons; and game will enter in move unit mode", ()=> {
      spyOn(detailsPanelPainter, 'showHumanSoldierPanel');

      townCellId = 'icon00a';

      players.human.units.mobs.push({
        cell: townCellId,
        strength: 1,
        movements: 3,
      });

      event = {
        target: {
          id: townCellId,
        },
      }

      result = infoLayer.checkUnitInfo(event, players);

      expect(result.mode).toBe('move');
      expect(result.unit).toBe(players.human.units.mobs[0]);

      expect(detailsPanelPainter.showHumanSoldierPanel).toHaveBeenCalled();
    });
  });

  describe("When AI Soldier is clicked", ()=> {
    it("Details Panel will be updated with basic stats", ()=> {
      spyOn(detailsPanelPainter, 'showAISoldierPanel');

      townCellId = 'icon00e';

      players.ai.units.mobs.push({
        cell: townCellId,
      });

      event = {
        target: {
          id: townCellId,
        },
      }

      result = infoLayer.checkUnitInfo(event, players);

      expect(result.mode).toBe(null);
      expect(result.unit).toBe(null);

      expect(detailsPanelPainter.showAISoldierPanel).toHaveBeenCalled();
    });
  });

  describe("When Neutral Soldier is clicked", ()=> {
    it("Details Panel will be updated with basic stats", ()=> {
      spyOn(detailsPanelPainter, 'showNeutralSoldierPanel');

      townCellId = 'icon00n';

      players.neutral.units.mobs.push({
        cell: townCellId,
      });

      event = {
        target: {
          id: townCellId,
        },
      }

      result = infoLayer.checkUnitInfo(event, players);

      expect(result.mode).toBe(null);
      expect(result.unit).toBe(null);

      expect(detailsPanelPainter.showNeutralSoldierPanel).toHaveBeenCalled();
    });
  });
});
