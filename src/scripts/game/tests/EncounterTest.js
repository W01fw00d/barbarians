describe("LevelManager", ()=> {
    let currentMapLevel,
        levelManager,
        players;

    beforeEach(()=> {
        currentMapLevel = 1;

        mapDesign = new MapDesign();
        levelManager = new LevelManager(mapDesign);

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

            let currentMapLevelResult;

            spyOn(levelManager, 'announceEndOfLevel');
            spyOn(levelManager, 'showNextMapMsg');

            currentMapLevelResult = levelManager.checkEndOfLevelCondition(currentMapLevel, players);

            expect(levelManager.announceEndOfLevel).toHaveBeenCalledWith('victory', victory_message_eng);
            expect(levelManager.showNextMapMsg).toHaveBeenCalledWith(currentMapLevelResult);

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
            const defeat_message_eng = 'The Barbarians are everywhere! Rome will fall...';

            let currentMapLevelResult;

            spyOn(levelManager, 'announceEndOfLevel');

            currentMapLevelResult = levelManager.checkEndOfLevelCondition(currentMapLevel, players);

            expect(levelManager.announceEndOfLevel).toHaveBeenCalledWith('defeat', defeat_message_eng);

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
            spyOn(levelManager, 'announceEndOfLevel');

            currentMapLevelResult = levelManager.checkEndOfLevelCondition(currentMapLevel, players);

            expect(levelManager.announceEndOfLevel).not.toHaveBeenCalled();

            expect(currentMapLevelResult).toBe(null);
        });
    });

    describe("when there are no more levels left", ()=> {

        it("next map shall be shown and victory message shall appear", ()=> {
            const win_message_eng = 'Congratulations, you completed the game! Those Barbarians won\'t be a threat for our beloved Rome anymore... right?'; 

           spyOn(levelManager, 'resetGame'); levelManager.showNextMapMsg(mapDesign.blueprints.length);

            expect(window.alert).toHaveBeenCalledWith(win_message_eng);

            expect(levelManager.resetGame).toHaveBeenCalledWith();
        });
    });
});
