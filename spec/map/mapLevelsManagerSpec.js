// WIP

describe("mapLevelsManager", function() {
  beforeEach(function() {
    currentMapLevel = 1;
    
    spyOn(window, 'alert');
  });

//  checkEndOfLevelCondition
  describe("when there aren't any barbarian units", function() {
    beforeEach(function() {
      units = [{
        player: 'Roman', 
        type: 'Soldier', 
      }];
    });

    it("next map shall be shown and victory message shall appear", function() {
      const victory_message_eng = 'Victory! The area is safe again.'; 

      spyOn(window, 'announceEndOfLevel');
      spyOn(window, 'goToNextMap');

      checkEndOfLevelCondition();

      expect(announceEndOfLevel).toHaveBeenCalledWith('victory', victory_message_eng);
      expect(goToNextMap).toHaveBeenCalledWith();
    });
  });

  describe("when there aren't any roman soldiers", function() {
    beforeEach(function() {
      units = [];
    });

    it("reset map and defeat message shall appear", function() {
      const defeat_message_eng = 'The Barbarians are everywhere! Rome will fall...'; 

      spyOn(window, 'announceEndOfLevel');
      spyOn(window, 'map');

      checkEndOfLevelCondition();

      expect(announceEndOfLevel).toHaveBeenCalledWith('defeat', defeat_message_eng);
      expect(map).toHaveBeenCalledWith(blueprints[currentMapLevel]);
    });
  });

  describe("when there are roman and barbarian soldiers", function() {
    beforeEach(function() {
      units = [
        {player: 'Roman', type: 'Soldier'},
        {player: 'Barbarian'}
      ];
    });

    it("end of game shall not happen, no message shall be shown", function() {
      spyOn(window, 'announceEndOfLevel');
      spyOn(window, 'map');
      spyOn(window, 'goToNextMap');

      checkEndOfLevelCondition();

      expect(announceEndOfLevel).not.toHaveBeenCalled();
      expect(map).not.toHaveBeenCalled();
      expect(goToNextMap).not.toHaveBeenCalled();
    });
  });
  
//  goToNextMap TODO
  describe("when there are more levels left", function() {
 
    it("next map shall be shown and victory message shall appear", function() {
      const victory_message_eng = 'Victory! The area is safe again.'; 

      spyOn(window, 'announceEndOfLevel');
      spyOn(window, 'goToNextMap');

      goToNextMap();

      expect(announceEndOfLevel).toHaveBeenCalledWith('victory', victory_message_eng);
      expect(goToNextMap).toHaveBeenCalledWith();
    });
  });
});
