describe("LevelManager", ()=> {
  let currentMapLevel,
    levelManager,
    soundManager,
    players;

  beforeEach(()=> {
    currentMapLevel = 1;

    mapDesign = new MapDesign();
    soundManager = new SoundManager();
    levelManager = new LevelManager(mapDesign, soundManager);

    players = {
      human: {
        units: {
          mobs: [],
          towns: []
        }
      },
      ai: {
        units: {
          mobs: [],
          towns: []
        }
      }
    };

    spyOn(window, 'alert');
    spyOn(soundManager.sfx, 'play');
  });

    //  checkEndOfLevelCondition
    describe("when there aren't any barbarian units", ()=> {
      beforeEach(()=> {
        players.human.units.mobs.push(
          {player: 'human', type: 'Soldier', name: 'Mock Name'}
        );

        players.human.units.towns.push(
          {player: 'human', type: 'Town', name: 'Mock Name'}
        );
      });

      it("next map shall be shown and victory message shall appear", ()=> {
        const victory_message_eng = 'Victory! The area is safe again.';
        const level_2_message_eng =
          'Even little mountain towns have the right to be protected against the sadistic Barbarians!';

        const currentMapLevelResult = levelManager.checkEndOfLevelCondition(
          currentMapLevel, players
        );

        expect(window.alert).toHaveBeenCalledWith(victory_message_eng);
        expect(window.alert).toHaveBeenCalledWith(level_2_message_eng);
        expect(soundManager.sfx.play).toHaveBeenCalledWith('victory');
        expect(currentMapLevelResult).toBe(currentMapLevel + 1);
      });
    });

    describe("when there aren't any roman soldiers", ()=> {
      beforeEach(()=> {
        players.ai.units.mobs.push(
          {player: 'ai', type: 'Soldier', name: 'Mock Name'}
        );
      });

      it("reset map and defeat message shall appear", ()=> {
        const defeat_message_eng =
          'The Barbarians are everywhere! Rome will fall...';

        const currentMapLevelResult =
          levelManager.checkEndOfLevelCondition(currentMapLevel, players);

        expect(window.alert).toHaveBeenCalledWith(defeat_message_eng);
        expect(soundManager.sfx.play).toHaveBeenCalledWith('defeat');
        expect(currentMapLevelResult).toBe(currentMapLevel);
    });
  });

  describe("when there are roman units and barbarian soldiers", ()=> {
    beforeEach(()=> {
      players.human.units.mobs.push(
        {player: 'human', type: 'Soldier', name: 'Mock Name'}
      );

      players.human.units.towns.push(
        {player: 'human', type: 'Town', name: 'Mock Name'}
      );

      players.ai.units.mobs.push(
        {player: 'ai', type: 'Soldier', name: 'Mock Name'}
      );
    });

    it("end of game shall not happen, no message shall be shown", ()=> {
      const currentMapLevelResult =
        levelManager.checkEndOfLevelCondition(currentMapLevel, players);

      expect(window.alert).not.toHaveBeenCalled();
      expect(currentMapLevelResult).toBe(null);
    });
  });

  describe(
    "when there aren't any barbarian units and there are no more levels left",
    ()=> {
      beforeEach(()=> {
        players.human.units.mobs.push(
          {player: 'human', type: 'Soldier', name: 'Mock Name'}
        );

        players.human.units.towns.push(
          {player: 'human', type: 'Town', name: 'Mock Name'}
        );
      });

      it("next map shall be shown and victory message shall appear", ()=> {
        //TODO wrap location.reload() on a custom class so we can mock it instead of resetGame
        spyOn(levelManager, 'resetGame');

        const win_message_eng =
          'Congratulations, you completed the game! Those Barbarians won\'t be a threat for our beloved Rome anymore... right?';
        const currentMapLevel = mapDesign.blueprints.length - 1;

        const currentMapLevelResult = levelManager.checkEndOfLevelCondition(
          currentMapLevel, players
        );

        expect(window.alert).toHaveBeenCalledWith(win_message_eng);
        expect(levelManager.resetGame).toHaveBeenCalled();
      });
  });
});
