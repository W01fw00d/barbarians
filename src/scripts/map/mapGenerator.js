// Generates a map using the desing array as input
function mapGenerator(array){
    const array_length = array.length,
          imageRoute = './src/images/board/',
          iconTagClosing = '.png"></img>',
          neutralIconTitle = 'Hungry wolfs';
    
	let i = 0,
        j = 0,
        cell = '',
        icon = ' ',
        backgroundColor = '',
        iconColor = '',
        iconShape = '',
        display = '',
        ground = 'H_def.png';

    document.getElementById("music-bar").pause();
    
    units = [];
    gold = [1, 1];
    
    $('#gold').val(gold[0]);
    $('#info').hide();
    $('#map').html('');
    
    for (i = 0; i < array_length; i++){

        $('#map').append('<tr id="row' + i + '"></tr>');

        row_length = array[i].length;
        for (j = 0; j < row_length; j++){

            cell = array[i].charAt(j);
            icon = '<img id="icon' + i + j + cell + '" src="' + imageRoute;

            switch(cell){

                case ' ':
                    display = 'none';
                    cell = '_';
                    icon = '';
                    break;
                    
                case 'x':
                    display = 'none';
                    cell = 'x';
                    icon += 'MS_def' + iconTagClosing;
                    display = 'block';
                    break;
                    
                case 'I':
                    display = 'none';
                    cell = 'x';
                    icon += 'MI_defl' + iconTagClosing;
                    display = 'block';
                    break;
                    
                case 'X':
                    display = 'none';
                    cell = 'x';
                    icon += 'M_def' + iconTagClosing;
                    display = 'block';
                    break;
                    
                case 'D':
                    display = 'none';
                    cell = 'x';
                    icon += 'MD_def' + iconTagClosing;
                    display = 'block';
                    break;
                    
                case 'V':
                    display = 'none';
                    cell = 'x';
                    icon += 'A_def' + iconTagClosing;
                    display = 'block';
                    break;

                case 'N':
                    iconShape = '0px 0px 0px 0px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, player: 'Neutral', type: 'Town', name: 'Libre', stats: {quantity: 1, quality: 1, quantityUpgradePrice: 1, qualityUpgradePrice: 1}});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="Free Town"><img class="icon" id="icon'+i+''+j+cell+'" src="' + imageRoute + 'AN_del_def.png"></img></a>';
                    break;
                    
                case 'A':
                    iconShape = '0px 0px 0px 0px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, player: 'Roman', type: 'Town', name: getRandomName('Town', 'Roman'), stats: {quantity: 1, quality: 1, quantityUpgradePrice: 1, qualityUpgradePrice: 1}});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+units[units.length - 1].name+']. quantity: [1], quality: [1]">'
                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="' + imageRoute + 'AR_del_def.png"></img></a>';
                    break;
                    
                case 'E':
                    iconShape = '0px 0px 0px 0px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, player: 'Barbarian', type: 'Town', name: getRandomName('Town', 'Barbarian'), stats: {quantity: 1, quality: 1, quantityUpgradePrice: 1, qualityUpgradePrice: 1}});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+units[units.length - 1].name+']">'
                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="' + imageRoute + 'AB_del_def.png"></img></a>';
                    break;
                    
                case 'n':
                    backgroundColor = 'Green';
                    iconColor = 'Grey';
                    iconShape = '50px 50px 50px 50px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, player: 'Neutral', type: 'Pack', name: 'Wolf', totalMovements: 0, movements: 0, strength: 1});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="' + neutralIconTitle + '">'
                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="' + imageRoute + 'L_del_def.png"></img></a>';
                    break;
                    
                case 'a':
                    backgroundColor = 'Green';
                    iconColor = 'Blue';
                    iconShape = '50px 50px 50px 50px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, player: 'Roman', type: 'Soldier', name: getRandomName('Soldier', 'Roman'), totalMovements: 2, movements: 2, strength: 1});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+units[units.length - 1].name+']. movements: [2], strength: [1]">'
                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="' + imageRoute + 'SR_del_def.png"></img></a>';
                    break;
                    
                case 'e':
                    color = 'Green';
                    backgroundColor = 'Green';
                    iconColor = 'Red';
                    iconShape = '50px 50px 50px 50px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, player: 'Barbarian', type: 'Soldier', name: getRandomName('Soldier', 'Barbarian'), totalMovements: 1, movements: 1, strength: 1});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+units[units.length - 1].name+']. movements: [1]. strength: [1]">'
                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="' + imageRoute + 'SB_del_def.png"></img></a>';
                    break;

                default:
                    icon = '';
                    display = 'none';
                    cell = '_';
                    break;
            }

            $('#row' + i).append('<th class="cell" id="cell' + i + '' + j + '">' + icon + '</th>');

            $('#cell' + i + '' + j).css({'background-image': 'url(' + imageRoute + ground + ')'});
            $('#icon' + i + j + cell).css({'display' : display});
        }
    }

    $('.icon').click(showIconData);
}