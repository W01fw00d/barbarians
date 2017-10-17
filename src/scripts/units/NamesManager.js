function NamesManager() {
    this.unitNames = new UnitNames();
}

NamesManager.prototype.unitNames;

// Returns a name string, chosen randomly from the names array 
NamesManager.prototype.getRandomName = function(type, faction) {
    let names, randomNumber;

    switch(type){
        case 'Soldier':
            names = faction === 'human' ? 
                this.unitNames.romanSoldierNames : this.unitNames.barbarianSoldierNames;

            break;

        case 'Town':
            names = faction === 'human' ? 
                this.unitNames.romanTownNames : this.unitNames.barbarianTownNames;

            break;
    }

    randomNumber = Math.floor(Math.random() * (names.length - 1));
    names.splice(randomNumber, 1);

    return names[randomNumber];
}