describe("Encounter", ()=> {
    let iconTemplates,
        namesManager,
        soundManager,
        encounter;

    beforeEach(()=> {
        iconTemplates = new IconTemplates();
        namesManager = new NamesManager();
        soundManager = new SoundManager();
        
        encounter = new Encounter(iconTemplates, namesManager, soundManager);
    });

    //  compareStrengths
    describe("when unit strength is at least 2 points higher that adversary", ()=> {
        it("unit shall always win", ()=> {
            spyOn(Math, 'random');
            unit = {strength: 3};
            adversary = {strength: 1};
            
            let result = encounter.compareStrengths(unit, adversary);
            
            expect(result.winner).toBe(unit);
        });
    });
    
    describe("when unit strength is at least 2 points lower that adversary", ()=> {
        it("unit shall always loose", ()=> {
            spyOn(Math, 'random');
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
    
    //check TODO
    
    //destroyUnit TODO
});
