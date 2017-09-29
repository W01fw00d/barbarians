/*
MAP CREATOR ICON ANNOTATION

Obstacles:
x = lonely mountain
I = start (Left) of horizontal mountain range
X = mountain range center
D = end (Right) of horizontal mountain range
V = vegetation

' ' = empty cell

Units:
N = neutral town
A = roman town
E = barbarian town
n = neutral criature
a = roman soldier
e = barbarian soldier


OTHERS (NOT IMPLEMENTED YET)

'-' = road
'S' = river
'=' = bridge
'[' = wall

*/

//maps 8x8 (64 cells), 10 maps y 1 template
var planos = [
[
	"        ",
	"        ",
    "        ",
    "        ",
    "        ",
    "        ",
    "        ",
    "        "
],

[
	"ID n  ID",
	"xA    Nx",
    "x     ID",
    "  aID   ",
    "    xe  ",
    "ID     x",
    "xN    Ex",
    "IXD  nID"
],

[
	"ID IXXXD",
	"x IXXD x",
    "ID AN ID",
    "ID a aID",
    "IDe e ID",
    "ID eE ID",
    "xE ID  x",
    "IXXXDeID"
],

[
	"IXD IXXD",
	"xaaaaaax",
    "x      x",
    "x      x",
    "x   N  x",
    "xe E  ex",
    "x ee e x",
    "IXXDeIXD"
],

[
	"ID IXXXD",
	"xAa    x",
    "IXXXDN x",
    "xNn    x",
    "x    nNx",
    "x EIXXXD",
    "x     Ex",
    "IXXXXXXD"
],

[
	"xeee VID",
	"V e e eV",
    " e    e ",
    " V AA  n",
    "   aa   ",
    " e    e ",
    " ee  e n",
    "n Ve eeV"
],

[
	"IXXXXXXD",
	"x E V   ",
    "x  eV Ax",
    "x E N ax",
    "x  e  ax",
    "x E V Ax",
    "x e V   ",
    "IXXXXXXD"
],

[
	"V     AV",
	"  VE   V",
    "       n",
    "n n   V ",
    " nVVVNnn",
    "       n",
    "N a     ",
    "VVV VE V"
],

[
	"IXDN IXD",
	"ID   e x",
    "x  A  Ex",
    "xaIXD ID",
    "x x   Ex",
    "x x N  x",
    "xe ex Ex",
    "IDNIXXXD"
],

[
	"V  a   n",
	" N   nV ",
    "    nNn ",
    "VVVV    ",
    "  n eeE ",
    "x   E e ",
    "IDn eeE ",
    "IXD    V"
],

[
	"IXXXXXDn",
	"xe EEVID",
    "x e ee x",
    "nVe   ee",
    "V      V",
    "aaaaaaaa",
    "a  aa  a",
    "aaaaaaaa"
],

];

// You can set here a different starting level, for testing purposes
var currentMapLevel = 1,
    units = [];
//Gold [Romans, Barbarians];
    gold = [1, 1];

$(document).ready(ini);

function ini() {
	//console.log(generadorPlanoRandom(10, 2, 2, 3, 5, 5, 5));
    /////////generadorPlanoRandom(x, A, E, N, a, e, n)///////
    //mapGenerator(generadorPlanoRandom(10, 2, 2, 3, 2, 3, 2)); // <= 64
    //currentMapLevel = 7;
    
    mapGenerator(planos[currentMapLevel]);

    $('#close').click(function(){
        $('.cell').off();
        $('.icon').off();
        $('.icon').click(showIconData);
        $('#info').hide();
    });

    $('#reset_map').click(function(){
        if (confirm('Reset current map?')){
            mapGenerator(planos[currentMapLevel]);
        }
    });

    $('#end_turn').click(endTurn);
}

// Generates a map using the desing array as input
function mapGenerator(array){
	let i = 0,
        j = 0,
        cell = '',
        icon = ' ',
        color_fondo = '',
        color_icon = '',
        forma_icon = '',
        display = '',
        suelo = '';

    document.getElementById("music-bar").pause();

    $('#info').hide();

    $('#map').html('');
    units = [];
    gold = [1, 1];
    $('#gold').val(gold[0]);

    var array_length = array.length;
    for (i = 0; i < array_length; i++){

        $('#map').append('<tr id="linea'+i+'"></tr>');

        linea_length = array[i].length;
        for (j = 0; j < linea_length; j++){

            cell = array[i].charAt(j);

            switch(cell){

                case ' ':
                    display = 'none';
                    cell = '_';
                    icon = '';
                    break;
                case 'x':
                    display = 'none';
                    cell = 'x';
                    icon = '<img id="icon'+i+''+j+cell+'" src="images/MS_def.png"></img>';
                    display = 'block';
                    break;
                case 'I':
                    display = 'none';
                    cell = 'x';
                    icon = '<img id="icon'+i+''+j+cell+'" src="images/MI_defl.png"></img>';
                    display = 'block';
                    break;
                case 'X':
                    display = 'none';
                    cell = 'x';
                    icon = '<img id="icon'+i+''+j+cell+'" src="images/M_def.png"></img>';
                    display = 'block';
                    break;
                case 'D':
                    display = 'none';
                    cell = 'x';
                    icon = '<img id="icon'+i+''+j+cell+'" src="images/MD_def.png"></img>';
                    display = 'block';
                    break;
                case 'V':
                    display = 'none';
                    cell = 'x';
                    icon = '<img id="icon'+i+''+j+cell+'" src="images/A_def.png"></img>';
                    display = 'block';
                    break;

                case 'N':
                    forma_icon = '0px 0px 0px 0px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, jugador: 'Neutral', tipo: 'Pueblo', nombre: 'Libre', stats: {cantidad: 1, calidad: 1, precio_mej_cant: 1, precio_mej_cal: 1}});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="Pueblo sin reclamar"><img class="icon" id="icon'+i+''+j+cell+'" src="images/AN_del_def.png"></img></a>';
                    //icon = '<img class="icon" id="icon'+i+''+j+cell+'" src="images/AN_del_def.png"></img>';
                    break;
                case 'A':
                    forma_icon = '0px 0px 0px 0px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, jugador: 'Romanos', tipo: 'Pueblo', nombre: nombresRandom('Pueblo', 'Romanos'), stats: {cantidad: 1, calidad: 1, precio_mej_cant: 1, precio_mej_cal: 1}});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+units[units.length - 1].nombre+']. Cantidad: [1], Calidad: [1]">'
                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="images/AR_del_def.png"></img></a>';
                    //icon = '<img class="icon" id="icon'+i+''+j+cell+'" src="images/AR_del_def.png"></img>';
                    break;
                case 'E':
                    forma_icon = '0px 0px 0px 0px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, jugador: 'Bárbaros', tipo: 'Pueblo', nombre: nombresRandom('Pueblo', 'Bárbaros'), stats: {cantidad: 1, calidad: 1, precio_mej_cant: 1, precio_mej_cal: 1}});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+units[units.length - 1].nombre+']">'
                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="images/AB_del_def.png"></img></a>';
                    //icon = '<img class="icon" id="icon'+i+''+j+cell+'" src="images/AB_del_def.png"></img>';
                    break;
                case 'n':
                    color_fondo = 'Green';
                    color_icon = 'Grey';
                    forma_icon = '50px 50px 50px 50px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, jugador: 'Neutral', tipo: 'Manada', nombre: 'Lobos', mueve_total: 0, mueve: 0, fuerza: 1});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="Lobos salvajes">'
                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="images/L_del_def.png"></img></a>';
                    //icon = '<img class="icon" id="icon'+i+''+j+cell+'" src="images/L_del_def.png"></img>';
                    break;
                case 'a':
                    color_fondo = 'Green';
                    color_icon = 'Blue';
                    forma_icon = '50px 50px 50px 50px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, jugador: 'Romanos', tipo: 'Soldado', nombre: nombresRandom('Soldado', 'Romanos'), mueve_total: 2, mueve: 2, fuerza: 1});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+units[units.length - 1].nombre+']. Mueve: [2], Fuerza: [1]">'
                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="images/SR_del_def.png"></img></a>';
                    //icon = '<img class="icon" id="icon'+i+''+j+cell+'" src="images/SR_del_def.png"></img>';
                    break;
                case 'e':
                    color = 'Green';
                    color_fondo = 'Green';
                    color_icon = 'Red';
                    forma_icon = '50px 50px 50px 50px';
                    display = 'block';
                    units.push(
                        {cell: 'icon'+i+j+cell, jugador: 'Bárbaros', tipo: 'Soldado', nombre: nombresRandom('Soldado', 'Bárbaros'), mueve_total: 1, mueve: 1, fuerza: 1});
                    icon = '<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+units[units.length - 1].nombre+']. Mueve: [1]. Fuerza: [1]">'
                        +'<img class="icon" id="icon'+i+''+j+cell+'" src="images/SB_del_def.png"></img></a>';
                    //icon = '<img class="icon" id="icon'+i+''+j+cell+'" src="images/SB_del_def.png"></img>';
                    break;

                default:
                    icon = '';
                    display = 'none';
                    cell = '_';
                    break;
            }

            $('#linea'+i).append('<th class="cell" id="cell' + i + '' + j + '">' + icon + '</th>');

            suelo = 'H_def.png';
            $('#cell' + i + '' + j).css({'background-image': 'url(images/'+suelo+')'});

            $('#icon' + i + j + cell ).css({'display' : display});
        }
    }

    $('.icon').click(showIconData);
}

// ON DEVELOPMENT
// Randomly generates a map using arguments (shall sum 64)
function generadorPlanoRandom(x, A, E, N, a, e, n){
    var planes = [
        {tipo: 'x', num: x}, 
        {tipo: 'A', num: A}, 
        {tipo: 'E', num: E}, 
        {tipo: 'N', num: N}, 
        {tipo: 'a', num: a}, 
        {tipo: 'e', num: e}, 
        {tipo: 'n', num: n}
    ];

    var total = planes[0].num + planes[1].num + planes[2].num + planes[3].num + planes[4].num + planes[5].num + planes[6].num;
    var plano = planos[0];
    var i = 0;
    var j = 0;
    var columnas = plano.length;
    var filas = plano[0].length;
    var plan_random = '';

    while (total > 0){

        for (i = 0; (i < columnas && total > 0) ; i++){

            for (j = 0; (j < filas && total > 0) ; j++){

                plan_random = Math.floor((Math.random() * planes.length));

                if ( (planes[plan_random].num > 0) && comprobarIncompatibilidad(i, j, planes[plan_random].tipo, plano) ){;
                    plano[i] = plano[i].replaceAt(j, planes[plan_random].tipo);
                    planes[plan_random].num--;
                    total--;
                }
            }
        }
    }

    return plano;
}

// ON DEVELOPMENT
// Checks that colindant cells there aren't any incompatible units with the new unit we are placing
function comprobarIncompatibilidad(i, j, tipo, plano){
    var k = 0;
    var incompatibles;
    var siempreCompatible = false;
    var iteracion = [
        [i+1,j], [i-1,j], [i,j+1], [i,j-1]
    ];

    //var iteracion_length = iteracion.length;

    for (k = 0; k < iteracion.length; k++){

        console.log(iteracion[k] + ', ' + ((iteracion[k][0]) < 0));

        if (iteracion[k][0] < 0 || iteracion[k][1] < 0){

            console.log('si, es negativo');
            iteracion.splice(k, 1);

        }
    }

    var iteracion_length = iteracion.length;

    // 1 or 2 types are incompatibles, we repeat two times to simplify the algorythm
    switch(tipo){

        case 'A':
            incompatibles = ['e', 'e', 'e'];
            break;
        case 'E':
            incompatibles = ['a', 'a', 'a'];
            break;
        case 'N':
            incompatibles = ['a', 'e', 'e'];
            break;
        case 'a':
            incompatibles = ['E', 'e', 'n'];
            break;
        case 'e':
            incompatibles = ['A', 'a', 'n'];
            break;
        default:
            siempreCompatible = true;
            break;
    }

    if (!siempreCompatible){

        for (k = 0; k < iteracion.length; k++){

            if ( (plano[iteracion[k][0]].charAt(iteracion[k][1]) === incompatibles[0])
            || (plano[iteracion[k][0]].charAt(iteracion[k][1]) === incompatibles[1])
            || (plano[iteracion[k][0]].charAt(iteracion[k][1]) === incompatibles[2])
            ){
                return false;
            }
        }
    }
    return true;
}

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}


// NAMES

var nombres_sold_rom = [
                    'Nerón', 'Victis', 'Caesar', 'Platón', 'Sócrates', 'Aristóteles', 'Augusto', 'Aquiles', 'Ulises', 'Agamenón', 'Arkantos', 'Ajax',
                    'Homero', 'Dante', 'Zeus', 'Helena', 'Apollo', 'Atenea', 'Minerva', 'Fausto', 'Hades', 'Poseidón', 'Júpiter', 'Venus', 'Mercurio',
                    'Galileo', 'Vinci', 'Invictus', 'Titán', 'Atlas', 'Gea', 'Gaia', 'Saturno', 'Urano', 'Dionisio', 'Ares', 'Kratos',
                    'Gaius', 'Lucius', 'Marcus', 'Publius', , 'Quintus', 'Quinta', 'Tidus', 'Tiberius', 'Aulus', 'Spurius', 'Manius', 'Servius', 'Appius', 'Vibius',
                    'Agrippa', 'Aquilinius', 'Balbus', 'Barbatus', 'Cicerón', 'Cilo', 'Corvus', 'Corpus', 'Lapidus', 'Mergus', 'Regulus', 'Scipio', 'Severus', 'Triarius', 'Aureus',
                    'Auron', 'Yuna', 'Riku', 'Niku', 'Wolfwood', 'Nicholas', 'Cibeles',
                    'Aura', 'Austro', 'Asclepio', 'Baco', 'Cupido', 'Legolas', 'Aragorn', 'Diana', 'Libertas', 'Laverna', 'Liber',
                    'Fornax', 'Eón', 'Fauno', 'Osiris', 'Nemauso', 'Egestas', 'Tellus', 'Timor', 'Quirino', 'Proserpina', 'Pax',
                    'Vesta', 'Virtus', 'Volumna', 'Vulturno', 'Europa', 'Pandora', 'Efreet', 'Nova', 'Artemis', 'Bahamut', 'Deux Ex', 'Oraculo', 'El Gran Héroe', 'Rey de los Judios',
                    'Einstein', 'Madara', 'Mandala', 'Rem', 'Alejandro', 'Django', 'Shiva', 'Ánima',
                    'Gabo', 'Jordi','Juanju', 'Iván', 'Marga', 'Nacho',

                    'Nerón', 'Victis', 'Caesar', 'Platón', 'Sócrates', 'Aristóteles', 'Augusto', 'Aquiles', 'Ulises', 'Agamenón', 'Arkantos', 'Ajax',
                    'Homero', 'Dante', 'Zeus', 'Helena', 'Apollo', 'Atenea', 'Minerva', 'Fausto', 'Hades', 'Poseidón', 'Júpiter', 'Venus', 'Mercurio',
                    'Galileo', 'Vinci', 'Invictus', 'Titán', 'Atlas', 'Gea', 'Gaia', 'Saturno', 'Urano', 'Dionisio', 'Ares', 'Kratos',
                    'Gaius', 'Lucius', 'Marcus', 'Publius', , 'Quintus', 'Quinta', 'Tidus', 'Tiberius', 'Aulus', 'Spurius', 'Manius', 'Servius', 'Appius', 'Vibius',
                    'Agrippa', 'Aquilinius', 'Balbus', 'Barbatus', 'Cicerón', 'Cilo', 'Corvus', 'Corpus', 'Lapidus', 'Mergus', 'Regulus', 'Scipio', 'Severus', 'Triarius', 'Aureus',
                    'Auron', 'Yuna', 'Riku', 'Niku', 'Wolfwood', 'Nicholas', 'Cibeles',
                    'Aura', 'Austro', 'Asclepio', 'Baco', 'Cupido', 'Legolas', 'Aragorn', 'Diana', 'Libertas', 'Laverna', 'Liber',
                    'Fornax', 'Eón', 'Fauno', 'Osiris', 'Nemauso', 'Egestas', 'Tellus', 'Timor', 'Quirino', 'Proserpina', 'Pax',
                    'Vesta', 'Virtus', 'Volumna', 'Vulturno', 'Europa', 'Pandora', 'Efreet', 'Nova', 'Artemis', 'Bahamut', 'Deux Ex', 'Oraculo', 'El Gran Héroe', 'Rey de los Judios',
                    'Einstein', 'Madara', 'Mandala', 'Rem', 'Alejandro', 'Django', 'Shiva', 'Ánima',
                    'Gabo', 'Jordi','Juanju', 'Iván', 'Marga', 'Nacho'
                ];

var nombres_sold_bar = [
                    'El Decapitador', 'El DejaViudas', 'El Psicópata', 'Perro Loco', 'Jacobo PechoLobo', 'Champ', 'Chemp', 'Chomp', 'El SajaPerros', 'El ViolaCabras', 'Oso Sin Pelo',
                    'Verganmitorix', 'Harrak el Desmembrador', 'Conan el Bárbaro', 'Thormund', 'Jormungard', 'Fenrir', 'Gullinbursti', 'Bruto', 'CabezaYunke', 'Empalador', 'Bárbara',
                    'Zaratustra', 'CaraCulo', 'Calavera', 'Cráneo', 'Apestoso', 'Max', 'Stomp', 'Stamp', 'CuernoRoto', 'Ano', 'Ulf', 'Udolf', 'Alf', 'Olf', 'HachaGrande', 'LanzaRota',
                    'MataReyes', 'Destructor', 'Abrasador', 'Ensartador', 'Arpía', 'El Gordo', 'BarrilViejo', 'Melody',
                    'Ásterix', 'Obelix', 'Abraracourcix', 'Homeopatix', 'Amerix', 'Amnesix', 'Eponine', 'Odalix', 'Vascongalo', 'Alambix',
                    'Panoramix', 'Karabella', 'Ideafix', 'Franco', 'Anglo', 'Sajón', 'Lombardo', 'CabezaHuevo',
                    'Alberick', 'Alrik', 'Algot', 'Asmund', 'Gunvor', 'Grevor', 'Hallmar', 'Humla', 'Inge', 'Ingo', 'Ingred', 'Maj',
                    'Lunt', 'Leif', 'Majken', 'Lynae', 'Rin', 'Vidhr', 'Ylwa', 'Ursa', 'Yorick', 'Winka', 'Wanka', 'Trygg', 'Masturbatix',
                    'Tove', 'Torborg', 'Thour', 'Thurston', 'Valkyrie', 'Alina', 'Dash La Estampida', 'Trin La Tormenta', 'Odín', 'El Segador', 'Thor', 'Leviatán', 'Brunilda',

                    'El Decapitador', 'El DejaViudas', 'El Psicópata', 'Perro Loco', 'Jacobo PechoLobo', 'Champ', 'Chemp', 'Chomp', 'El SajaPerros', 'El ViolaCabras', 'Oso Sin Pelo',
                    'Verganmitorix', 'Harrak el Desmembrador', 'Conan el Bárbaro', 'Thormund', 'Jormungard', 'Fenrir', 'Gullinbursti', 'Bruto', 'CabezaYunke', 'Empalador', 'Bárbara',
                    'Zaratustra', 'CaraCulo', 'Calavera', 'Cráneo', 'Apestoso', 'Max', 'Stomp', 'Stamp', 'CuernoRoto', 'Ano', 'Ulf', 'Udolf', 'Alf', 'Olf', 'HachaGrande', 'LanzaRota',
                    'MataReyes', 'Destructor', 'Abrasador', 'Ensartador', 'Arpía', 'El Gordo', 'BarrilViejo', 'Melody',
                    'Ásterix', 'Obelix', 'Abraracourcix', 'Homeopatix', 'Amerix', 'Amnesix', 'Eponine', 'Odalix', 'Vascongalo', 'Alambix',
                    'Panoramix', 'Karabella', 'Ideafix', 'Franco', 'Anglo', 'Sajón', 'Lombardo', 'CabezaHuevo',
                    'Alberick', 'Alrik', 'Algot', 'Asmund', 'Gunvor', 'Grevor', 'Hallmar', 'Humla', 'Inge', 'Ingo', 'Ingred', 'Maj',
                    'Lunt', 'Leif', 'Majken', 'Lynae', 'Rin', 'Vidhr', 'Ylwa', 'Ursa', 'Yorick', 'Winka', 'Wanka', 'Trygg', 'Masturbatix',
                    'Tove', 'Torborg', 'Thour', 'Thurston', 'Valkyrie', 'Alina', 'Dash La Estampida', 'Trin La Tormenta', 'Odín', 'El Segador', 'Thor', 'Leviatán', 'Brunilda',
                ];

var nombres_pue_rom = [
                'Roma', 'Polentia', 'Tracia', 'Hispalis', 'Gades', 'Atenas', 'Tiberia', 'Publia',
                'Londinium', 'Agrippina', 'Burgidala', 'Salmantica', 'Tarraco', 'Babel', 'Tingis', 'Tomis', 'Salona', 'Naissus', 'Ancyra', 'Artaxarta',
                'Caesarea', 'Nisibis', 'Tarsus', 'Salamis', 'Bostra', 'Cyrene', 'Alexandria',
                'Zanarkand', 'Ciudad de Paso',
                'Palma', 'Buenos Aires', 'Sa Cabaneta', 'Son Ferriol', 'Banyalbufar', 'Manacor', 'Corrubedo'
                ];

var nombres_pue_bar = [
                    'Tótems', 'VillaLobos', 'Aldea de la Peste', 'Tambor de Piel', 'Campamento de Caza', 'Guarida de Incursores', 'Jotunheim', 'Iggdrassil',
                    'Galia', 'Ostrogodia', 'Cartago', 'Aldea de los Hunos', 'Aldea de los Godos', 'Campamento Franco', 'Pueblo Sajón', 'Tierras de Vándalos',
                    'Campamento de Ostrogodos', 'Tungri', 'Treveri', 'Marsi', 'Camavi', 'Frisonia', 'Usupeti', 'Cherusci', 'Sicambrii', 'Catii', 'Suebi', 'Turones',
                    'Angli', 'Varni', 'Angrivarii', 'Cauces', 'Saxones', 'Sexonia', 'Lemovii', 'Rugii', 'Gothi', 'Vandali', 'Bastarni',
                    'Burgundii', 'Buri', 'Quadi',
                    'Pueblo Paleto', 'Son Banya', 'Gotham', 'Son Gotleu', 'Son Roca'
                ];

//////////////////////////////////////////////////


// Returns a name string, chosen randomly from the names array 
function nombresRandom(tipo, bando){
    var nombres;

    switch(tipo){

        case 'Soldado':

            if (bando === 'Romanos'){

                nombres = nombres_sold_rom;

            } else if (bando === 'Bárbaros'){

                nombres = nombres_sold_bar;

            }

            break;
        case 'Pueblo':

            if (bando === 'Romanos'){

                nombres = nombres_pue_rom;

            }else if (bando === 'Bárbaros'){

                nombres = nombres_pue_bar;
            }
            break;
    }

    var random = Math.floor(Math.random() * (nombres.length - 1) );
    var resultado = nombres[random];
    nombres.splice(random, 1);

    return resultado;
}

// End current player turn, and provides 3 gold to each player
function endTurn(){
    const units_length = units.length;
    
    let i = 0,
        id = '',
        unidad_i;

    generarSoldados('Romanos');
    turnoIA();
    generarSoldados('Bárbaros');
    gold[1] += 3;
    gold[0] += 3;
    $('#gold').val(gold[0]);

    for (i = 0; i < units_length; i++){

        unidad_i = units[i];

        // Soldiers will capture adjacent towns automatically if they are besides them at the end of turn
        encuentro(unidad_i);

        if (unidad_i.tipo === 'Soldado'){
            unidad_i.mueve = unidad_i.mueve_total;

            // If it's a Roman Soldier, colour it in order to indicate that it can move again 
            if (unidad_i.jugador === 'Romanos'){
                id = $('#'+unidad_i.cell).attr('id').replace('icon', '').split("");
                
                $('#cell' + id[0] + id[1]).html('<a id="tooltip' + id[0] + id[1]
                    +'a" href="#" data-toggle="tooltip" title="['+unidad_i.nombre+']. Moves: ['+unidad_i.mueve+'], Strength: ['+unidad_i.fuerza+']">'
                        +'<img class="icon" id="icon'+id[0]+id[1]+'a" src="images/SR_del_def.png"></img></a>');
            }
        }
    }

    $('.icon').off();
    $('.icon').click(showIconData);

    comprobarVictoria();
}

// Performs the AI enemy turn: it behaves quite randomly for now
function turnoIA(){
    var i = 0;
    var pueblos = [];
    var num_iter = 0;
    var iguales = true;
    var pueblo_aux = '';

    var pueblos_length = '';
    var units_length = units.length;
    var vago = 0;

    // Move soldiers
    for (i = 0; i < units_length; i++){

        // If random number is 1, soldier will not move this turn
        vago = Math.round(Math.random() * 5);

        if ( (units[i] !== undefined) && (units[i].tipo === 'Soldado') && (units[i].jugador === 'Bárbaros') && (vago != 1) ){
            autoMoverSoldadoRandom(units[i]);
        }
    }

    // Create only towns array
    for (i = 0; i < units.length; i++){

        if ((units[i].tipo === 'Pueblo') && (units[i].jugador === 'Bárbaros')){
            pueblos.push(units[i]);
        }
    }

    // Randonmy reorder towns array
    num_iter = Math.round(Math.random() * pueblos_length);

    while (num_iter > 0){

        while (iguales){
            iguales = false;
            pueblo_random1 = Math.round(Math.random() * pueblos_length) - 1;
            pueblo_random2 = Math.round(Math.random() * pueblos_length) - 1;
            if (pueblo_random1 === pueblo_random2){
                iguales = true;
            }
        }

        pueblo_aux = pueblos[pueblo_random1];
        pueblos[pueblo_random1] = pueblos[pueblo_random2];
        pueblos[pueblo_random2] = pueblo_aux;

        num_iter--;
    }

    pueblos_length = pueblos.length;

    // Improve towns 
    for (i = 0; i < pueblos_length; i++){

        // If random number is 1, quality won't be improved; if it's 2, quantity won't be improved
        vago = Math.round(Math.random() * 5);

        if ((gold[1] >= pueblos[i].stats.precio_mej_cal) && (vago !== 1)){
            modoMejorar(pueblos[i], 'mej_cal');
        }

        if ((gold[1] >= pueblos[i].stats.precio_mej_cant) && (vago !== 2)){
            modoMejorar(pueblos[i], 'mej_cant');
        }
    }
}

// Move enemy soldiers randomly
function autoMoverSoldadoRandom(unidad){
    var randomIndex = 0;
    var cell_random = '';
    var iguales = true;
    var cell_aux = '';

    var cell = unidad.cell.replace('icon', '').split("");

    var iteracion = [
        ('cell' + (parseInt(cell[0]) + 1) + '' + parseInt(cell[1])), ('cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) + 1)),
        ('cell' + (parseInt(cell[0]) - 1) + '' + parseInt(cell[1])), ('cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) - 1))
    ];

    // Avoid soldiers moving to non-existant cells
    if (parseInt(cell[0]) === 7){
        iteracion.splice(0, 1);
    }else if (parseInt(cell[0]) === 0){
        iteracion.splice(2, 1);
    }

    if (parseInt(cell[1]) === 7){
        iteracion.splice(1, 1);
    }else if (parseInt(cell[1]) === 0){
        iteracion.splice(3, 1);
    }

    var iteracion_length = iteracion.length;

    // Randomly reorder posible directions array
    num_iter = Math.round(Math.random() * iteracion_length);

    while (num_iter > 0){

        while (iguales){

            iguales = false;
            cell_random1 = Math.abs(Math.round(Math.random() * (iteracion.length - 1)))
            cell_random2 = Math.abs(Math.round(Math.random() * (iteracion.length - 1)))
            if (cell_random1 == cell_random2){
                iguales = true;
            }
        }

        cell_aux = iteracion[cell_random1];
        iteracion[cell_random1] = iteracion[cell_random2];
        iteracion[cell_random2] = cell_aux;

        num_iter--;
    }

    var movs = unidad.mueve;

    while ((unidad.mueve === movs) && (iteracion.length > 0)){

        randomIndex = Math.abs(Math.round(Math.random() * (iteracion.length - 1))) ;
        cell_random = iteracion[randomIndex];
        moverSoldado(unidad, cell_random);
        iteracion.splice(randomIndex, 1);
    }
}

// Move soldiers, first try to aproach neutral/human player towns, and then human player soldiers
function autoMoverSoldadoIA(unidad){

    var randomIndex = 0;
    var cell_random = '';
    var iguales = true;
    var cell_aux = '';
    var i = 0;
    var cell_ini = '';
    var cell_fin = '';
    var objetivo = '';
    var continuar = true;

    var cell = unidad.cell.replace('icon', '').split("");

    var iteracion = [
        ('#cell' + (parseInt(cell[0]) + 1) + '' + parseInt(cell[1]) +' a img'), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) + 1) +' a img'),
        ('#cell' + (parseInt(cell[0]) - 1) + '' + parseInt(cell[1]) +' a img'), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) - 1) +' a img')
    ];

    var iteracion_length = iteracion.length;
    var units_length = units.length;

    cell_ini = unidad.cell.replace('icon','').split('');

    // First look for towns
    for (i = 0; (i < units_length && movs > 0); i++){

        continuar = true;

        if ((units[i].tipo === 'Pueblo') && ((units[i].jugador === 'Neutral') || (units[i].jugador === 'Romanos'))){

            while (continuar && unidad.mueve > 0){
                objetivo = units[i];
                cell_fin = units[i].cell.replace('icon','').split('');

                //It will try to position itself on the same column that the target; and after that, on the same row.
                if (cell_ini[1] < cell_fin[1]){
                    moverSoldado(unidad, iteracion[1]);
                }if (cell_ini[1] < cell_fin[1]){
                    moverSoldado(unidad, iteracion[4]);
                }else if (cell_ini[0] < cell_fin[0]){
                    moverSoldado(unidad, iteracion[0]);
                }else if (cell_ini[0] > cell_fin[0]){
                    moverSoldado(unidad, iteracion[2]);
                }

                // If our unit doesn't exist anymore o the town was already conquered, stop
                if ( (units[i].jugador === 'Romanos') || (unidad === undefined) ){
                    continuar = false;
                }
            }
        }
    }

    // Then it searchs for human and neutral soldiers
    for (i = 0; i < units_length; i++){

        continuar = true;

        if ((units[i].tipo === 'Soldado') && ((units[i].jugador === 'Neutral') || (units[i].jugador === 'Romanos'))){

            while (continuar && unidad.mueve > 0){
                objetivo = units[i];
                cell_fin = units[i].cell.replace('icon','').split('');

                //Intentará posicionarse en la misma columna que el objetivo, y luego en su misma fila
                if (cell_ini[1] < cell_fin[1]){
                    moverSoldado(unidad, iteracion[1]);
                }if (cell_ini[1] < cell_fin[1]){
                    moverSoldado(unidad, iteracion[4]);
                }else if (cell_ini[0] < cell_fin[0]){
                    moverSoldado(unidad, iteracion[0]);
                }else if (cell_ini[0] > cell_fin[0]){f
                    moverSoldado(unidad, iteracion[2]);
                }

                // If our unit or human player unit doesn't exist anymore
                if ( (units[i] !== objetivo) || (unidad === undefined) ){
                    continuar = false;
                }
            }
        }
    }
}

// Iterates through towns array and, if possible, generate soldiers equals to the quantity variable; with strength equals to quality variable
function generarSoldados(jugador){
    var i = 0;
    var j = 0;
    var units_length = units.length;
    var soldados = 0;
    var calidad = 0;
    var movs = 0;
    var cell = '';
    var cell_vacia = '';
    var id = '';
    var nombre_random = '';

    var iteracion = '';
    var iteracion_length = '';

    for(i = 0; i < units_length; i++ ){

        if ((units[i].tipo === 'Pueblo') && (units[i].jugador === jugador)){

            soldados = units[i].stats.cantidad;
            calidad = units[i].stats.calidad;

            cell = units[i].cell.replace('icon','').split("");

            iteracion = [
                ('#cell' + (parseInt(cell[0]) + 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) + 1)),
                ('#cell' + (parseInt(cell[0]) - 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) - 1))
            ];

            // Stop soldiers moving to non-existant cells
            if (parseInt(cell[0]) === 7){
                iteracion.splice(0, 1);
            }else if (parseInt(cell[0]) === 0){
                iteracion.splice(2, 1);
            }

            if (parseInt(cell[1]) === 7){
                iteracion.splice(1, 1);
            }else if (parseInt(cell[1]) === 0){
                iteracion.splice(3, 1);
            }

            iteracion_length = iteracion.length;


            //Will generate soldiers while free cells and dependant of quantity var of town 
            for (j = 0; (j < iteracion_length) && (soldados > 0); j++){

                if ( ($(iteracion[j]+' img').attr('id') === undefined ) ){

                    cell_vacia = iteracion[j].replace('#cell','').split("");

                    nombre_random = nombresRandom('Soldado', jugador);

                    if (jugador === 'Romanos'){
                        id = 'icon'+cell_vacia[0]+cell_vacia[1]+'a';
                        movs = 2;

                        $(iteracion[j]).html('<a id="tooltip'+i+''+j+cell
                        +'" href="#" data-toggle="tooltip" title="['+nombre_random+']. Mueve: ['+movs+'], Fuerza: ['+units[i].stats.calidad+']">'
                        +'<img class="icon" id="'+id+'" src="images/SR_del_def.png"></img></a>');

                    }else if (jugador === 'Bárbaros'){
                        id = 'icon'+cell_vacia[0]+cell_vacia[1]+'e';

                        movs = 1;

                        $(iteracion[j]).html('<a id="tooltip'+i+''+j+cell+'" href="#" data-toggle="tooltip" title="['+nombre_random+']. Mueve: ['+movs+'], Fuerza: ['+units[i].stats.calidad+']">'
                        +'<img class="icon" id="'+id+'" src="images/SB_del_def.png"></img></a>');
                    }


                    //$('#'+cell_vacia).css({'background': color_icon, 'border-radius' : forma_icon, 'display' : display});

                    units.push(
                        {cell: id, jugador: jugador, tipo: 'Soldado', nombre: nombre_random, mueve: movs, mueve_total: movs, fuerza: calidad});

                    // Resolve possible encounters when this unit appears besides other enemy unit
                    encuentro(units[units.length - 1]);

                    soldados--;
                }
            }
        }
    }
}

function updateDataLabels(unit) {
    $('#player').val(unit.jugador);
    $('#type').val(unit.tipo);
    $('#name').val(unit.nombre);
};

// Shows data about the icon and, depending of the type of icon, allows to move it (soldier) or improve it (town)
function showIconData(){
    let i = 0,
        unidad = '',
        icon = this.id,
        tipo = icon.charAt(icon.length - 1),
        color = '',
        units_length = units.length;

    $('.icon').off();

    for(i = 0; i < units_length; i++){
        if (units[i].cell == icon){
            unidad = units[i];
            break;
        }
    }

    switch(tipo){

        case 'A':
            updateDataLabels(unidad);

            $('#prod_cant').html(unidad.cantidad);
            $('#prod_cal').html(unidad.calidad);
            $('#mej_cant').html(unidad.precio_mej_cant);
            $('#mej_cal').html(unidad.precio_mej_cal);

            $('#town_info').show();
            $('#soldier_info').hide();

            $('#mej_cant').off();
            $('#mej_cant').click(function(){
                modoMejorar(unidad, 'mej_cant');
            });

            $('#mej_cal').off();
            $('#mej_cal').click(function(){
                modoMejorar(unidad, 'mej_cal');
            });

            //$('#mej_cal').click({unidad : unidad}, modoMejorar);

            $("#mej_cant").html('Quantity ('+unidad.stats.precio_mej_cant+' Gold)');
            $("#mej_cal").html('Quality ('+unidad.stats.precio_mej_cal+' Gold)');
            $("#prod").html('Producing ['+unidad.stats.cantidad+'] soldiers with ['+unidad.stats.calidad+'] strength each turn. Upgrade: ');

            color = 'RGB(255, 10, 10)';
            break;

        case 'E':
            updateDataLabels(unidad);

            $('#town_info').hide();
            $('#soldier_info').hide();

            color = 'RGB(7, 168, 226)';
            break;

        case 'N':
            updateDataLabels(unidad);

            $('#town_info').hide();
            $('#soldier_info').hide();

            color = 'RGB(135, 135, 135)';
            break;

        case 'a':
            updateDataLabels(unidad);

            $('#town_info').hide();
            $('#soldier_info').show();
            $('#destroy').show();

            modoMover(icon, unidad);
            $("#movement").html('Movements left: [' + unidad.mueve + ']');
            $("#strength").html('Combat strength: [' + unidad.fuerza + '].');

            color = 'RGB(255, 10, 10)';
            break;

        case 'e':
            updateDataLabels(unidad);

            $('#town_info').hide();
            $('#soldier_info').show();
            $('#destroy').hide();

//            $("#movement").html('Movements left: [' + unidad.mueve+']');
            $("#strength").html('Combat strength: [' + unidad.fuerza + '].');

            color = 'RGB(7, 168, 226)';
            break;

        case 'n':
            const move_message_eng = 'They protect their territory',
                  move_message_spa = 'Prefiere defender su territorio',
                  strength_message_eng = 'Can devour an undertrained human',
                  strength_message_spa = 'Puede devorar a alguien con poco entrenamiento';
            
            updateDataLabels(unidad);

            $('#town_info').hide();
            $('#soldier_info').show();
            $('#destroy').hide();

            $("#movement").html(move_message_eng);
            $("#strength").html(strength_message_eng);

            color = 'RGB(135, 135, 135)';
            break;
    }

    $('#info').css({'background' : color});
    $('#info').show();
}

// Allows soldier to move while movements left
function modoMover(icon, unidad){
    //movs = unidad.mueve;

    //$('#'+icon).html('<form><input readonly>'+movs+'</input></form>');

    $('.cell').off();
    //movs = movs - $('.cell').click({unidad: unidad}, moverSoldado).data("result");

    $('.cell').click(function(){
        //alert(unidad.cell.replace('icon', '').substring(0, 2) + '=' + this.id.replace('cell', ''));
        var meta = this.id;
        if ((unidad.mueve > 0) && (unidad.cell.replace('icon', '').substring(0, 2) !== this.id.replace('cell', ''))){
            moverSoldado(unidad, meta);
        }

    });

    $('#destroy').off();
    $('#destroy').click(function(){
        if (confirm('¿Suicidar al soldado actual?')){
            destroyUnit(unidad);
            $('.cell').off();
            $('#info').hide();
            $('.icon').off();
            $('.icon').click(showIconData);
        }else{

        }
    });

    //$('#'+icon).html('<form><input readonly>'+movs+'</input></form>');

    //$('#cell').off();
    //$('.icon').click(showIconData);

}

// mejora_auto is for AI turn use of this function. In other case, this is invoked by an event_handler
function moverSoldado(unidad, meta) {
    let icon = '',
        resultado = '';

    switch (unidad.jugador) {
        case 'Romanos':
            color_icon = 'Blue';
            forma_icon = '50px 50px 50px 50px';
            display = 'block';

            break;
        case 'Bárbaros':
            color_icon = 'Red';
            forma_icon = '50px 50px 50px 50px';
            display = 'block';
            break;
    }

    icon = document.getElementById(meta).lastElementChild;
    cell_ini = unidad.cell.replace('icon','').split("");
    cell_fin = meta.replace('cell','').replace('#', '').split("");
    
    //Check how many cells have it move as a total
    mov =  Math.abs(cell_ini[0] - cell_fin[0])  + Math.abs(cell_fin[1] - cell_ini[1]);

    if (
        (icon === null)
        && (mov > 0) && (mov <= unidad.mueve)
        /*
        && ((cell_ini[0] - cell_fin[0] < unidad.mueve) || (cell_fin[0] - cell_ini[0] < unidad.mueve))
        && ((cell_ini[1] - cell_fin[1] < unidad.mueve) || (cell_fin[1] - cell_ini[1] < unidad.mueve))
        */
        ){

        //Move the soldier icon to he selected cell, and calculate movements left 

        //$(unidad.cell).css({'background': color_icon, 'border-radius' : forma_icon, 'display' : display});
        //unidad.cell = 'icon'+cell_ini[2];

        unidad.cell = 'icon' + cell_fin[0] + '' + cell_fin[1] + cell_ini[2];

        resultado = encuentro(unidad);

        if (resultado !== 'nada'){
            unidad.mueve = 0;
            
        }else{
            unidad.mueve -= mov;
        }

        switch (unidad.jugador) {
            case 'Romanos':

                if (resultado === 'pierde'){
                    $('#cell'+cell_fin[0]+''+cell_fin[1]).html('');
                }else if ((resultado === 'gana') || (unidad.mueve === 0)){
                    $('#cell'+cell_fin[0]+''+cell_fin[1]).html('<a id="tooltip'+cell_fin[0]+''+cell_fin[1]+cell_ini[2]
                        +'" href="#" data-toggle="tooltip" title="['+unidad.nombre+']. Mueve: ['+unidad.mueve+'], Fuerza: ['+unidad.fuerza+']">'
                        +'<img class="icon" id="icon'+cell_fin[0]+''+cell_fin[1]+cell_ini[2]+'" src="images/SRUsed_del_def.png"></img></a>');

                }else if (resultado === 'nada'){
                    $('#cell'+cell_fin[0]+''+cell_fin[1]).html('<a id="tooltip'+cell_fin[0]+''+cell_fin[1]+cell_ini[2]
                        +'" href="#" data-toggle="tooltip" title="['+unidad.nombre+']. Mueve: ['+unidad.mueve+'], Fuerza: ['+unidad.fuerza+']">'
                        +'<img class="icon" id="icon'+cell_fin[0]+''+cell_fin[1]+cell_ini[2]+'" src="images/SR_del_def.png"></img></a>');
                }

            break;
            case 'Bárbaros':
                if (resultado === 'pierde'){
                    $('#cell'+cell_fin[0]+''+cell_fin[1]).html('');
                }else{
                    $('#cell'+cell_fin[0]+''+cell_fin[1]).html('<a id="tooltip'+cell_fin[0]+''+cell_fin[1]+cell_ini[2]
                        +'" href="#" data-toggle="tooltip" title="['+unidad.nombre+']. Mueve: ['+unidad.mueve_total+'], Fuerza: ['+unidad.fuerza+']">'
                        +'<img class="icon" id="icon'+cell_fin[0]+''+cell_fin[1]+cell_ini[2]+'" src="images/SB_del_def.png"></img></a>');
                }
            break;
    }

        $('#cell'+cell_ini[0]+''+cell_ini[1]).html('');
        $('.cell').off();
        $('.icon').click(showIconData);
        $('#info').hide();
        comprobarVictoria();

    }else{

        if (unidad.jugador === 'Romanos'){
            alert('Invalid movement');
        }
    }
}

// Calculate the encounter result between a soldier and a soldier, or a soldier and a town; return true if unit wins.
function encuentro(unidad){
    let adversario = '',
        conquistado = 0,
        vencedor = '',
        perdedor = '',
        cell = unidad.cell.replace('icon', '').split(""),
        
        iteracion = [
            ('#cell' + (parseInt(cell[0]) + 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) + 1)),
            ('#cell' + (parseInt(cell[0]) - 1) + '' + parseInt(cell[1])), ('#cell' + parseInt(cell[0]) + '' + (parseInt(cell[1]) - 1))
        ],
        
        iteracion_length = iteracion.length,
        units_length = units.length,
        i = 0,
        j = 0,
        k = 0,
        nuevo_id = '',
        title = '',
    //Finds anything? 'nada', 'vence' 0 'gana'
        resultado = 'nada',
        audio = '';

    // Look for fights with other soldiers next to itself
    for (i = 0; i < iteracion_length; i++){
         if ( ($(iteracion[i]+' a img').attr('id') !== undefined)
            && ( (($(iteracion[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'e') && (unidad.jugador === 'Romanos'))
            ||(($(iteracion[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'a') && (unidad.jugador === 'Bárbaros'))
            ||(($(iteracion[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'n') && ((unidad.jugador === 'Romanos')||(unidad.jugador === 'Bárbaros'))) )

            ) {

            resultado = 'nada';

            // Combat
            for (j = 0; j < units_length; j++){
                //console.log(units[j].cell.replace('icon', '').replace('a', '').replace('e','') + ' ===??? ' + iteracion[i].replace('#cell', ''));
                if (units[j].cell.replace('icon', '').replace('a', '').replace('e','').replace('n','') === iteracion[i].replace('#cell', '')) {
                    adversario = units[j];
                    break;
                }
            }

            // 100% win
            if (unidad.fuerza > adversario.fuerza + 1) {
                vencedor = unidad;
                perdedor = adversario;
                resultado = 'gana';
                destroyUnit(adversario);

            } else if (unidad.fuerza + 1 < adversario.fuerza) {
                vencedor = adversario;
                perdedor = unidad;
                resultado = 'pierde';
                destroyUnit(unidad);

            } else if (unidad.fuerza === adversario.fuerza) {

                // Random winner (50%)
                if (Math.round(Math.random() * 1) === 1) {
                    vencedor = unidad;
                    perdedor = adversario;
                    resultado = 'gana';
                    destroyUnit(adversario);

                } else {
                    vencedor = adversario;
                    perdedor = unidad;
                    resultado = 'pierde';
                    destroyUnit(unidad);
                }
            } else if (unidad.fuerza + 1 === adversario.fuerza) {

                // 25%
                if (Math.round(Math.random() * 3) === 0) {
                    vencedor = unidad;
                    perdedor = adversario;
                    resultado = 'gana';
                    destroyUnit(adversario);

                } else {
                    vencedor = adversario;
                    perdedor = unidad;
                    resultado = 'pierde';
                    destroyUnit(unidad);
                }

            } else if (unidad.fuerza === adversario.fuerza + 1){

                // 25%
                if (Math.round(Math.random() * 3) !== 0) {
                    vencedor = unidad;
                    perdedor = adversario;
                    resultado = 'gana';
                    destroyUnit(adversario);

                } else {
                    vencedor = adversario;
                    perdedor = unidad;
                    resultado = 'pierde';
                    destroyUnit(unidad);
                }
            }

            // Loot for kill
            if ((vencedor.jugador === 'Romanos')&&(perdedor.jugador !== 'Neutral')){
                gold[0]++;
                $('#gold').val(gold[0]);

            }else if ((vencedor.jugador === 'Bárbaros')&&(perdedor.jugador !== 'Neutral')){
                gold[1]++;
            }

            // If not dead yet, keep looking for fights
            if (perdedor === unidad){
                break;
            }
        }
    }

    // If unit is still alive, it can conquest towns
    if (resultado !== 'pierde') {

        for (i = 0; i < iteracion_length; i++){

            if (  ($(iteracion[i]+' a img').attr('id') !== undefined)
                && (($(iteracion[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'N')
                || (($(iteracion[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'E') && (unidad.jugador === 'Romanos'))
                || (($(iteracion[i]+' a img').attr('id').replace('icon', '').charAt(2) === 'A') && (unidad.jugador === 'Bárbaros')) )
                ) {

               //.log($(iteracion[0]).attr('id').replace('icon', '').charAt(2));

                resultado = 'gana';

                units_length = units.length;

                // Find target unit in array 
                for (j = 0; j < units_length; j++){
                    if (units[j].cell === ($(iteracion[i]+' img').attr('id'))) {
                        conquistado = j;
                        break;
                    }
                }

                units[conquistado].jugador = unidad.jugador;
                units[conquistado].nombre = nombresRandom('Pueblo', unidad.jugador);

                if (unidad.jugador === 'Romanos'){
                    $(iteracion[i]+' a img').attr('src', 'images/AR_del_def.png');
                    nuevo_id = $(iteracion[i]+' img').attr('id').replaceAt( $(iteracion[i]+' img').attr('id').length - 1, 'A');
                    $(iteracion[i]+' a img').attr('id', nuevo_id);
                    units[conquistado].cell = units[conquistado].cell.replaceAt(units[conquistado].cell.length - 1, 'A');

                    title = '['+units[conquistado].nombre+']. Cantidad: ['+units[conquistado].stats.cantidad+']. Calidad: ['+units[conquistado].stats.calidad+']';

                    audio = new Audio('sounds/rom_conquest.mp3');
                }else if (unidad.jugador === 'Bárbaros'){
                    $(iteracion[i]+' a img').attr('src', 'images/AB_del_def.png');
                    nuevo_id = $(iteracion[i]+' img').attr('id').replaceAt( $(iteracion[i]+' img').attr('id').length - 1, 'E');
                    $(iteracion[i]+' a img').attr('id', nuevo_id);
                    units[conquistado].cell = units[conquistado].cell.replaceAt(units[conquistado].cell.length - 1, 'E');
                    audio = new Audio('sounds/bar_conquest.mp3');

                    title = '['+units[conquistado].nombre+']';
                }

                $(iteracion[i]+' a').attr('title', title);
                // A soldier can only conquest onw town each turn 
                audio.play();
            }
        }
    }
    return resultado;
}

//
function destroyUnit(unidad){
    $('#cell' + unidad.cell.replace('icon','').replace('a', '').replace('e', '').replace('n','')).html('');
    units.splice(units.indexOf(unidad), 1);

    let audio;

    if (unidad.jugador === 'Romanos'){
        audio = new Audio('sounds/scream.mp3');
        
    }else if (unidad.jugador === 'Bárbaros'){
        audio = new Audio('sounds/kill.mp3');
        
    }else if (unidad.jugador === 'Neutral'){
        audio = new Audio('sounds/wolf_scream.mp3');
    }

    audio.play();
}

// mejora_auto is for AI turn use of this function. In other case, this is invoked by an event_handler
function modoMejorar(unidad, mejora){
    const errorMessage = 'You don\'t have enough gold!';
    
    let money = 0,
        cell = '',
        imagen = '',
        title = '';
    
    if (unidad.jugador === 'Romanos'){
        index = 0;
        imagen = 'AR_del_def';
    }else if (unidad.jugador === 'Bárbaros'){
        index = 1;
        imagen = 'AB_del_def';
    }

    if (mejora === 'mej_cant'){

        if (unidad.stats.precio_mej_cant <= gold[index]){

            gold[index] -= unidad.stats.precio_mej_cant;
            unidad.stats.precio_mej_cant += unidad.stats.precio_mej_cant;
            unidad.stats.cantidad++;
            $('#gold').val(gold[index]);

        }else{
            alert(errorMessage);
        }

    }else if (mejora === 'mej_cal'){

        if (unidad.stats.precio_mej_cal <= gold[index]){

            gold[index] -= unidad.stats.precio_mej_cal;
            unidad.stats.precio_mej_cal += unidad.stats.precio_mej_cal;
            unidad.stats.calidad++;
            $('#gold').val(gold[index]);

        }else{
            alert(errorMessage);
        }
    }

    cell = unidad.cell.replace('icon', '#cell')
    cell = cell.substring(0, cell.length - 1);

    if (unidad.jugador === 'Romanos'){
        title = '['+unidad.nombre+']. Quantity: ['+unidad.stats.cantidad+'], Quality: ['+unidad.stats.calidad+']';
    }else if (unidad.jugador === 'Bárbaros'){
        title = '['+unidad.nombre+']';
    }

    $(cell).html('<a id="tooltip'+unidad.cell.replace('icon','')
            +'" href="#" data-toggle="tooltip" title="'+title+'">'
            +'<img class="icon" id="'+unidad.cell+'" src="images/'+imagen+'.png"></img></a>');

    $('#info').hide();
    $('.icon').click(showIconData);
}

// Check that there are still units in both sides; if not, victory one of the two factions wins 
function comprobarVictoria(){
    const victory_message_eng = 'Victory! The are is safe again.',
          victory_message_spa = '¡Victoria! La zona vuelve a ser segura.',
          defeat_message_eng = 'The Barbarians are everywhere! Rome will fall...',
          defeat_message_spa = '¡Los Bárbaros están por todos lados! Roma caerá...';

    let i = 0,
        units_length = units.length,
    //Alive [Romans, Barbarians]
        vivos = [0,0],
        audio = '';

    // Player have to destroy all barbarians soldiers and towns. AI wins just by killing all roman soldiers. 
    for (i = 0; i < units_length; i++){

        if ( (units[i].tipo === 'Soldado') && (units[i].jugador === 'Romanos') ){

            vivos[0]++;
        }else if (units[i].jugador === 'Bárbaros'){

            vivos[1]++;
        }
    }

    if (vivos[1] === 0){
        audio = new Audio('sounds/victory.mp3');
        alert(victory_message_eng);
        audio.play();
        avanzarMapa();

    }else if (vivos[0] === 0){
        audio = new Audio('sounds/loose.mp3');
        alert(defeat_message_eng);
        audio.play();
        //location.reload();
        mapGenerator(planos[currentMapLevel]);
    }
}

// Advance to the next level. If it's last level, show victory message and end game. Uses cookie for storing current level.
function avanzarMapa(){
    const maps_messages_eng = [
            'Welcome! You are a Roman General and you have been informed that some nasty Barbarians are assaulting little towns outside Rome. Use your soldiers to finish the enemy and recover control over those towns!',
            'Even little mountain towns have the right to be protected against the sadistic Barbarians!',
            'Those damn uncivilized folks! They aren\'t even able to organize for battle...',
            'Your explorer asures you that the road is safe... but something smells bad... it\'s like the smell of people that haven\'t wash for years!',
            'Damn it! Your explorer lured us to the enemy den. There\'re anemies everywhere!',
            'The traitor explorer is hidding somewhore in this barbarian valley... it\'s time for revenge!',
            'While our troops were in the valley, a giant wolf pack is causing chaos on nearby towns, lured by blood!',
            'Those Barbarians sure know how to ambush people on the mountains... but they\'ll never overcome the iron discipline of the Roman army!',
            'Finally... you arrive to the main Barbarian camp... but you are all alone. Regroup and finish the enemy!',
            'Rome reinforcements are here! Time to finish with the lasts of the Barbarians... For Rome!'
        ],
          
        maps_messages_spa = [
            '¡Bienvenido! Has sido informado de que unos bárbaros están asaltando los pueblos de los alrededores de Roma. ¡Utiliza tus soldados para acabar con el enemigo y recupera esos pueblos!',
            '¡Incluso los pequeños pueblos de las montañas merecen ser protegidos de los sádicos Bárbaros!',
            'Estos malditos incivilizados no son siquiera capaces de formar para la batalla...',
            'Tu explorador te ha asegurado que el paso es seguro... pero algo huele mal... como a gente que hace años que no se baña...',
            '¡Maldición! Tu explorador te ha llevado de lleno a la boca del lobo. ¡Hay enemigos por todas partes!',
            'Tu explorador traidor se oculta en algún lugar de este valle lleno de bárbaros... es hora de la venganza',
            '¡Mientras nuestras tropas estaban destacadas en el valle, una manada gigantesca de lobos rodean los poblados cercanos atraidos por la sangre!',
            'Estos bárbaros son buenos tendiendo emboscadas en las montañas... ¡Pero nunca vencerán a la férrea disciplina del ejército Romano!',
            'Al fin... has llegado al campamento principal de los Bárbaros... aunque solo quedas tú. ¡Reúne fuerzas y acaba con ellos!',
            '¡Han llegado los refuerzos que Roma prometió...! Es hora de terminar con los últimos supervivientes bárbaros... ¡Por Roma!'
        ],  
        
        win_message_eng = 'Congratulations, you completed the game! Those Barbarians won\'t be a threat for our beloved Rome anymore... right?',
          
        win_message_spa = '¡Felicidades, has completado el juego! Esos bárbaros no volverán a amenazar la bella Roma... ¿O tal vez ésto solo sea el principio?';
    

    currentMapLevel++;

    if (currentMapLevel >= planos.length ){
        alert(win_message);
        document.cookie = "mapa=" + 1 + "; expires=Thu, 07 Dec 2017 12:00:00 UTC";
        location.reload();
        
    }else{
        document.cookie = "mapa=" + currentMapLevel + "; expires=Thu, 07 Dec 2017 12:00:00 UTC";
        mapGenerator(planos[currentMapLevel]);

        alert(maps_messages_eng[currentMapLevel]);
    }
}
