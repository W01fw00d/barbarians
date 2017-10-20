describe("Map", ()=> {
    let mapDesign,
        namesManager,
        iconTemplates,
        map,
        id,
        cell,
        name,
        player,
        resultObject;

    beforeEach(()=> {
        mapDesign = new MapDesign();
        namesManager = new NamesManager();
        iconTemplates = new IconTemplates();
        map = new Map(mapDesign, namesManager, iconTemplates);

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
            },
            neutral: {
                units: {
                    mobs: [],
                    towns: []
                }
            }
        };
    });

    //  generateCell

    describe("when cell is N", ()=> {
        beforeEach(()=> {            
            cell = 'N';
            id = '11N';
            resultObject = {
                cell: 'icon' + id, 
                player: 'neutral', 
                name: 'Free Town', 
                typeTag: 'Town', 
                factionTag: 'Nature',
                stats: {
                    quantity: 1, 
                    quality: 1, 
                    quantityUpgradePrice: 1, 
                    qualityUpgradePrice: 1
                }
            }
        });

        it("a Neutral Town shall be created", ()=> {
            spyOn(iconTemplates, 'getNeutralTown');

            map.generateCell(players, cell, 1, 1);
            expect(iconTemplates.getNeutralTown).toHaveBeenCalledWith(id);
            expect(JSON.stringify(players.neutral.units.towns[0])).toBe(JSON.stringify(resultObject));
        });
    });

    describe("when cell is A", ()=> {
        beforeEach(()=> {            
            cell = 'A';
            id = '11A';
            name = 'Test Human Town';
            player = 'human';
            resultObject = {
                cell: 'icon' + id, 
                player: player, 
                name: name, 
                typeTag: 'Town', 
                factionTag: 'Roman',
                stats: {
                    quantity: 1, 
                    quality: 1, 
                    quantityUpgradePrice: 1, 
                    qualityUpgradePrice: 1
                }
            }
        });

        it("a Roman Human Town shall be created", ()=> {
            spyOn(namesManager, 'getRandomName').and.returnValue(name);
            spyOn(iconTemplates, 'getHumanTown');

            map.generateCell(players, cell, 1, 1);
            expect(namesManager.getRandomName).toHaveBeenCalledWith('town', player);
            expect(iconTemplates.getHumanTown).toHaveBeenCalledWith(id, name);
            expect(JSON.stringify(players.human.units.towns[0])).toBe(JSON.stringify(resultObject));
        });
    });

    describe("when cell is E", ()=> {
        beforeEach(()=> {            
            cell = 'E';
            id = '11E';
            name = 'Test Barbarian Town';
            player = 'ai';
            resultObject = {
                cell: 'icon' + id, 
                player: player, 
                name: name, 
                typeTag: 'Town', 
                factionTag: 'Barbarian',
                stats: {
                    quantity: 1, 
                    quality: 1, 
                    quantityUpgradePrice: 1, 
                    qualityUpgradePrice: 1
                }
            }
        });

        it("a Barbarian AI Town shall be created", ()=> {
            spyOn(namesManager, 'getRandomName').and.returnValue(name);
            spyOn(iconTemplates, 'getAITown');

            map.generateCell(players, cell, 1, 1);
             expect(namesManager.getRandomName).toHaveBeenCalledWith('town', player);
            expect(iconTemplates.getAITown).toHaveBeenCalledWith(id, name);
            expect(JSON.stringify(players.ai.units.towns[0])).toBe(JSON.stringify(resultObject));
        });
    });

    describe("when cell is n", ()=> {
        beforeEach(()=> {            
            cell = 'n';
            id = '11n';
            resultObject = {
                cell: 'icon' + id, 
                player: 'neutral', 
                name: 'Wolf', 
                typeTag: 'Beast', 
                factionTag: 'Nature',
                totalMovements: 0,
                movements: 0,
                strength: 1
            }
        });

        it("a Neutral Wolf Pack shall be created", ()=> {
            spyOn(iconTemplates, 'getNeutralMob');

            map.generateCell(players, cell, 1, 1);
            expect(iconTemplates.getNeutralMob).toHaveBeenCalledWith(id);
            expect(JSON.stringify(players.neutral.units.mobs[0])).toBe(JSON.stringify(resultObject));
        });
    });

    describe("when cell is a", ()=> {
        beforeEach(()=> {            
            cell = 'a';
            id = '11a';
            player = 'human';
            name = 'Test Human Soldier';
            resultObject = {
                cell: 'icon' + id, 
                player: player, 
                name: name, 
                typeTag: 'Soldier', 
                factionTag: 'Roman',
                totalMovements: 2,
                movements: 2,
                strength: 1
            }
        });

        it("a Roman Human Soldier shall be created", ()=> {
            spyOn(namesManager, 'getRandomName').and.returnValue(name);
            spyOn(iconTemplates, 'getStarterHumanMob');

            map.generateCell(players, cell, 1, 1);
            expect(namesManager.getRandomName).toHaveBeenCalledWith('mob', player);
            expect(iconTemplates.getStarterHumanMob).toHaveBeenCalledWith(id, name);
            expect(JSON.stringify(players.human.units.mobs[0])).toBe(JSON.stringify(resultObject));
        });
    });
    
    describe("when cell is e", ()=> {
        beforeEach(()=> {            
            cell = 'e';
            id = '11e';
            player = 'ai';
            name = 'Test AI Soldier';
            resultObject = {
                cell: 'icon' + id, 
                player: player, 
                name: name, 
                typeTag: 'Soldier', 
                factionTag: 'Barbarian',
                totalMovements: 1,
                movements: 1,
                strength: 1
            }
        });

        it("a Roman Human Soldier shall be created", ()=> {
            spyOn(namesManager, 'getRandomName').and.returnValue(name);
            spyOn(iconTemplates, 'getStarterAIMob');

            map.generateCell(players, cell, 1, 1);
            expect(namesManager.getRandomName).toHaveBeenCalledWith('mob', player);
            expect(iconTemplates.getStarterAIMob).toHaveBeenCalledWith(id, name);
            expect(JSON.stringify(players.ai.units.mobs[0])).toBe(JSON.stringify(resultObject));
        });
    });
});
