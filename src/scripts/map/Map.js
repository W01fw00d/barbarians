function Map(namesManager, iconTemplates) {
    this.namesManager = namesManager;
    this.iconTemplates = iconTemplates;
}

Map.prototype.namesManager;

// Generates a map using the desing array as input
Map.prototype.generate = function(level, players) {
    const designArray = new MapDesign().blueprints[level], 
          designArrayLength = designArray.length,
          imageRoute = './src/images/board/',
          iconTagClosing = '.png"></img>';
    //          neutralIconTitle = 'Hungry wolfs';

    let id, randomName, i, j, cell, icon, units,
        //        backgroundColor = '',
        //        iconColor = '',
        //        iconShape = '',
        display,
        ground = 'H_def.png';

    // Pause the music by default, TODO improve the UX with an options menu with sound / song mute option
    document.getElementById("music-bar").pause();

    // Print starting gold on screen
    players.human.setGold(players.human.gold);
    $('#info').hide();
    $('#map').html('');

    for (i = 0; i < designArrayLength; i++) {
        $('#map').append('<tr id="row' + i + '"></tr>');
        row_length = designArray[i].length;

        for (j = 0; j < row_length; j++) {
            cell = designArray[i].charAt(j);
            icon = '<img id="icon' + i + j + cell + '" src="' + imageRoute;
            id = i + '' + j + cell;
            display = 'block';

            switch(cell){
                case ' ':
                    display = 'none';
                    cell = '_';
                    icon = '';
                    break;

                case 'x':
                    cell = 'x';
                    icon += 'MS_def' + iconTagClosing;
                    //                    display = 'block';
                    break;

                case 'I':
                    cell = 'x';
                    icon += 'MI_defl' + iconTagClosing;
                    //                    display = 'block';
                    break;

                case 'X':
                    cell = 'x';
                    icon += 'M_def' + iconTagClosing;
                    //                    display = 'block';
                    break;

                case 'D':
                    cell = 'x';
                    icon += 'MD_def' + iconTagClosing;
                    //                    display = 'block';
                    break;

                case 'V':
                    cell = 'x';
                    icon += 'A_def' + iconTagClosing;
                    //                    display = 'block';
                    break;

                    //TODO
                case 'N':
                    units = players.neutral.units.towns;
                    //                    iconShape = '0px 0px 0px 0px';
                    //                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, player: 'neutral', type: 'Town', name: 'Libre', stats: {quantity: 1, quality: 1, quantityUpgradePrice: 1, qualityUpgradePrice: 1}});
                    icon = this.iconTemplates.getNeutralTown(id);
                    //                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="Free Town"><img class="icon" id="icon'+i+''+j+cell+'" src="' + imageRoute + 'AN_del_def.png"></img></a>';
                    break;

                case 'A':
                    units = players.human.units.towns;
                    //                    iconShape = '0px 0px 0px 0px';
                    //                    display = 'block';
                    randomName = this.namesManager.getRandomName('Town', 'Roman');
                    units.push(
                        {cell: 'icon'+i+j+cell, player: 'human', type: 'Town', name: randomName, stats: {quantity: 1, quality: 1, quantityUpgradePrice: 1, qualityUpgradePrice: 1}});
                    icon = this.iconTemplates.getHumanTown(id, randomName);
                    //                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+units[units.length - 1].name+']. quantity: [1], quality: [1]">'
                    //                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="' + imageRoute + 'AR_del_def.png"></img></a>';
                    break;

                case 'E':
                    units = players.ai.units.towns;
                    //                    iconShape = '0px 0px 0px 0px';
                    //                    display = 'block';
                    randomName = this.namesManager.getRandomName('Town', 'Barbarian');
                    units.push(
                        {cell: 'icon'+i+j+cell, player: 'ai', type: 'Town', name: randomName, stats: {quantity: 1, quality: 1, quantityUpgradePrice: 1, qualityUpgradePrice: 1}});
                    icon = this.iconTemplates.getAITown(id, randomName);
                    //                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+units[units.length - 1].name+']">'
                    //                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="' + imageRoute + 'AB_del_def.png"></img></a>';
                    break;

                case 'n':
                    units = players.neutral.units.mobs;
                    //                    backgroundColor = 'Green';
                    //                    iconColor = 'Grey';
                    //                    iconShape = '50px 50px 50px 50px';
//                                        display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, player: 'neutral', type: 'Pack', name: 'Wolf', totalMovements: 0, movements: 0, strength: 1});
                    icon = this.iconTemplates.getNeutralMob(id);
                    //                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="' + neutralIconTitle + '">'
                    //                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="' + imageRoute + 'L_del_def.png"></img></a>';
                    break;

                case 'a':
                    units = players.human.units.mobs;
                    //                    backgroundColor = 'Green';
                    //                    iconColor = 'Blue';
                    //                    iconShape = '50px 50px 50px 50px';
                    //                    display = 'block';
                    randomName = this.namesManager.getRandomName('Soldier', 'Roman');
                    units.push(
                        {cell: 'icon'+i+j+cell, player: 'human', type: 'Soldier', name: randomName, totalMovements: 2, movements: 2, strength: 1});
                    icon = this.iconTemplates.getStarterHumanMob(id, randomName);
                    //                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+units[units.length - 1].name+']. movements: [2], strength: [1]">'
                    //                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="' + imageRoute + 'SR_del_def.png"></img></a>';
                    break;

                case 'e':
                    units = players.ai.units.mobs;
                    //                    color = 'Green';
                    //                    backgroundColor = 'Green';
                    //                    iconColor = 'Red';
                    //                    iconShape = '50px 50px 50px 50px';
                    //                    display = 'block';
                    randomName = this.namesManager.getRandomName('Soldier', 'Barbarian');
                    units.push(
                        {cell: 'icon'+i+j+cell, player: 'ai', type: 'Soldier', name: randomName, totalMovements: 1, movements: 1, strength: 1});
                    icon = this.iconTemplates.getStarterAIMob(id, randomName);
                    //                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+units[units.length - 1].name+']. movements: [1]. strength: [1]">'
                    //                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="' + imageRoute + 'SB_del_def.png"></img></a>';
                    break;

                default:
                    icon = '';
                    display = 'none';
                    cell = '_';
                    break;
                       };

            $('#row' + i).append('<th class="cell" id="cell' + i + '' + j + '">' + icon + '</th>');

            $('#cell' + i + '' + j).css({'background-image': 'url(' + imageRoute + ground + ')'});
            $('#icon' + id).css({'display' : display});
        }
    }
}