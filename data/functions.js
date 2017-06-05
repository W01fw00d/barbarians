//BABEL: jquery, random,

//v1.1

/* TO DO LIST
+ Permitir anular modo movimiento y volver a la seleccion sin haber consumido movs
+ Permitir que el soldado a veces no complete su movimiento cuando está en automatico
+ Crear un array aleatorio para la mejora de ciudades random, para que vaya variando el orden de mejora.
? La IA realice decisiones lógicas, del tipo mover sus soldados en direccion a los del enemigo o a las ciudades neutrales/amigas.
+ Sonidos de 'muerto' (grito epico de muerte cine) e 'inicio turno'(gallo). Musica romana de fondo y sonido de victoria.
+ La IA no mejora aldeas por alguna razon.
- Modificar el atributo "casilla" en el array de unidades, para que solo contenga los dos numeros de la casilla, y nada más (simplificar busqueda de casilla correcta)
- Marcar el borde de la unidad seleccionada en cada momento.
+ Poner una ayuda flotante que ponga el nombre, fuerza y movs de los soldados y pueblos; al dejar el ratón encima (bootstrap). Ponerle esa ayuda al título también.
- Las unidades pueden atravesar obstaculos, pueden "saltar por encima": como evitarlo?
+ Botón de resetear el mapa.
- Más nombres romanos: se agotan en los últimos mapas.
+ "info" que tenga un color de fondo dependiendo del bando: rojo, azul o gris.
- Hacer que el turno de la IA pase 'a camara lenta' con un Timer?
- Cuando pierdes, a veces se reinicia el mapa con más soldados de los que tocan: creo que se generar los soldados que tocaria al finalizar turno??
- Permitir que cuando un soldado es generado al lado de una aldea enemiga, o un soldado enemigo, actue y conquiste/pelee.
- Permitir elegir niveles, ya que el sistema de guardado con cookies no funciona en almacenamiento local.
- Permitir mejorar cantidad hasta un maximo de 4, ya que luego es inútil.
- Idear un sistema en caso de encontrarse con dos soldados enemigos al moverse: enfrentarse al más fuerte? a los dos? elegir?
- Sistema de niveles para los soldados. Que suba la fuerza y el movimiento a medida que matan soldados enemigos.
*/

/*
LEYENDA

Obstaculos:
x = montaña solitaria
I = inicio (Izquierda) de cordillera horizontal
X = centro de cordillera
D = fin (Derecha) de cordillera
V = vegetación

' ' = vacio

Unidades:
N = pueblo neutral
A = pueblo romano
E = pueblo bárbaro
n = criatura neutral
a = soldado romano
e = soldado bárbaro


OTROS (NO IMPLEMENTADOS)

'-' = camino
'S' = rio
'=' = puente
'[' = muro

*/


//mapas 8x8 (64 casillas), 10 mapas y 1 plantilla

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

var mapa_actual = 1;

var unidades = [];

//Oro [Romanos, Bárbaros];
var oro = [1, 1];

//Movimientos (ahora en objeto Soldado)
//var movs = 0;


$(document).ready(ini);

function ini() {
	//console.log(generadorPlanoRandom(10, 2, 2, 3, 5, 5, 5));
    /////////generadorPlanoRandom(x, A, E, N, a, e, n)///////
    //mapeador(generadorPlanoRandom(10, 2, 2, 3, 2, 3, 2)); // <= 64
    //mapa_actual = 7;//
    mapeador(planos[mapa_actual]);

    $('#cerrar').click(function(){

        $('.casilla').off();
        $('.icono').off();
        $('.icono').click(seleccionIcono);
        $('#info').hide();
    });

    $('#resetMapa').click(function(){
        if (confirm('¿Reiniciar el mapa actual?')){
            mapeador(planos[mapa_actual]);
        }else{

        }
    });
    // mapeador(parseInt(document.cookie.replace('mapa=','')));
    //$('.icono').click(seleccionIcono);
    //$('#cerrar').click(cerrarInfo);

    $('#pasarTurno').click(pasarTurno);
    // alert ('Has sido informado de que unos bárbaros están asaltando los pueblos de los alrededores de Roma. ¡Utiliza tus soldados para acabar con el enemigo y recupera esos pueblos!');
}

//A partir del array con el diseño, genera un mapa del escenario
function mapeador(array){
	var i = 0;
    var j = 0;
    var casilla = '';
    var icono = ' ';
    var color_fondo = '';
    var color_icono = '';
    var forma_icono = '';
    var display = '';
    var suelo = '';

    document.getElementById("musica").pause();

    $('#info').hide();

    $('#mapa').html('');
    unidades = [];
    oro = [1, 1];
    $('#oro').val(oro[0]);
    console.log('unidades debería estar vacío: '+unidades[0]);

    var array_length = array.length;
    for (i = 0; i < array_length; i++){

        $('#mapa').append('<tr id="linea'+i+'"></tr>');
        //$('#mapa').append('<div id="linea'+i+'" class="row">');

        linea_length = array[i].length;
        for (j = 0; j < linea_length; j++){

            casilla = array[i].charAt(j);
            //console.log(casilla);

            switch(casilla){

                case ' ':
                    display = 'none';
                    casilla = '_';
                    icono = '';
                    break;
                case 'x':
                    display = 'none';
                    casilla = 'x';
                    icono = '<img id="icono'+i+''+j+casilla+'" src="images/MS_def.png"></img>';
                    display = 'block';
                    break;
                case 'I':
                    display = 'none';
                    casilla = 'x';
                    icono = '<img id="icono'+i+''+j+casilla+'" src="images/MI_defl.png"></img>';
                    display = 'block';
                    break;
                case 'X':
                    display = 'none';
                    casilla = 'x';
                    icono = '<img id="icono'+i+''+j+casilla+'" src="images/M_def.png"></img>';
                    display = 'block';
                    break;
                case 'D':
                    display = 'none';
                    casilla = 'x';
                    icono = '<img id="icono'+i+''+j+casilla+'" src="images/MD_def.png"></img>';
                    display = 'block';
                    break;
                case 'V':
                    display = 'none';
                    casilla = 'x';
                    icono = '<img id="icono'+i+''+j+casilla+'" src="images/A_def.png"></img>';
                    display = 'block';
                    break;

                case 'N':
                    forma_icono = '0px 0px 0px 0px';
                    display = 'block';
                    unidades.push(
                        {casilla: 'icono'+i+j+casilla, jugador: 'Neutral', tipo: 'Pueblo', nombre: 'Libre', stats: {cantidad: 1, calidad: 1, precio_mej_cant: 1, precio_mej_cal: 1}});
                    icono = '<a id="tooltip'+i+''+j+casilla+'" href="#" data-toggle="tooltip" title="Pueblo sin reclamar"><img class="icono" id="icono'+i+''+j+casilla+'" src="images/AN_del_def.png"></img></a>';
                    //icono = '<img class="icono" id="icono'+i+''+j+casilla+'" src="images/AN_del_def.png"></img>';
                    break;
                case 'A':
                    forma_icono = '0px 0px 0px 0px';
                    display = 'block';
                    unidades.push(
                        {casilla: 'icono'+i+j+casilla, jugador: 'Romanos', tipo: 'Pueblo', nombre: nombresRandom('Pueblo', 'Romanos'), stats: {cantidad: 1, calidad: 1, precio_mej_cant: 1, precio_mej_cal: 1}});
                    icono = '<a id="tooltip'+i+''+j+casilla+'" href="#" data-toggle="tooltip" title="['+unidades[unidades.length - 1].nombre+']. Cantidad: [1], Calidad: [1]">'
                        +'<img class="icono" id="icono'+i+''+j+casilla+'" src="images/AR_del_def.png"></img></a>';
                    //icono = '<img class="icono" id="icono'+i+''+j+casilla+'" src="images/AR_del_def.png"></img>';
                    break;
                case 'E':
                    forma_icono = '0px 0px 0px 0px';
                    display = 'block';
                    unidades.push(
                        {casilla: 'icono'+i+j+casilla, jugador: 'Bárbaros', tipo: 'Pueblo', nombre: nombresRandom('Pueblo', 'Bárbaros'), stats: {cantidad: 1, calidad: 1, precio_mej_cant: 1, precio_mej_cal: 1}});
                    icono = '<a id="tooltip'+i+''+j+casilla+'" href="#" data-toggle="tooltip" title="['+unidades[unidades.length - 1].nombre+']">'
                        +'<img class="icono" id="icono'+i+''+j+casilla+'" src="images/AB_del_def.png"></img></a>';
                    //icono = '<img class="icono" id="icono'+i+''+j+casilla+'" src="images/AB_del_def.png"></img>';
                    break;
                case 'n':
                    color_fondo = 'Green';
                    color_icono = 'Grey';
                    forma_icono = '50px 50px 50px 50px';
                    display = 'block';
                    unidades.push(
                        {casilla: 'icono'+i+j+casilla, jugador: 'Neutral', tipo: 'Manada', nombre: 'Lobos', mueve_total: 0, mueve: 0, fuerza: 1});
                    icono = '<a id="tooltip'+i+''+j+casilla+'" href="#" data-toggle="tooltip" title="Lobos salvajes">'
                        +'<img class="icono" id="icono'+i+''+j+casilla+'" src="images/L_del_def.png"></img></a>';
                    //icono = '<img class="icono" id="icono'+i+''+j+casilla+'" src="images/L_del_def.png"></img>';
                    break;
                case 'a':
                    color_fondo = 'Green';
                    color_icono = 'Blue';
                    forma_icono = '50px 50px 50px 50px';
                    display = 'block';
                    unidades.push(
                        {casilla: 'icono'+i+j+casilla, jugador: 'Romanos', tipo: 'Soldado', nombre: nombresRandom('Soldado', 'Romanos'), mueve_total: 2, mueve: 2, fuerza: 1});
                    icono = '<a id="tooltip'+i+''+j+casilla+'" href="#" data-toggle="tooltip" title="['+unidades[unidades.length - 1].nombre+']. Mueve: [2], Fuerza: [1]">'
                        +'<img class="icono" id="icono'+i+''+j+casilla+'" src="images/SR_del_def.png"></img></a>';
                    //icono = '<img class="icono" id="icono'+i+''+j+casilla+'" src="images/SR_del_def.png"></img>';
                    break;
                case 'e':
                    color = 'Green';
                    color_fondo = 'Green';
                    color_icono = 'Red';
                    forma_icono = '50px 50px 50px 50px';
                    display = 'block';
                    unidades.push(
                        {casilla: 'icono'+i+j+casilla, jugador: 'Bárbaros', tipo: 'Soldado', nombre: nombresRandom('Soldado', 'Bárbaros'), mueve_total: 1, mueve: 1, fuerza: 1});
                    icono = '<a id="tooltip'+i+''+j+casilla+'" href="#" data-toggle="tooltip" title="['+unidades[unidades.length - 1].nombre+']. Mueve: [1]. Fuerza: [1]">'
                        +'<img class="icono" id="icono'+i+''+j+casilla+'" src="images/SB_del_def.png"></img></a>';
                    //icono = '<img class="icono" id="icono'+i+''+j+casilla+'" src="images/SB_del_def.png"></img>';
                    break;

                default:
                    icono = '';
                    display = 'none';
                    casilla = '_';
                    break;
            }

            //icono = '<div class="icono" id="icono'+i+''+j+casilla+'">'+casilla+'</div>';

            //console.log('i= '+i+'j= '+j);
            //$('#linea'+i).append('<div id="casilla'+i+''+j+'" class="col-sm-1">'+icono+'</div>');
            $('#linea'+i).append('<th class="casilla" id="casilla'+i+''+j+'">'+icono+'</th>');
            //$('#casilla'+i+''+j).css({'background': color_fondo});

            suelo = 'H_def.png';
            $('#casilla'+i+''+j).css({'background-image': 'url(images/'+suelo+')'});

            //console.log('hago append sobre mapa linea '+i);

            $('#icono'+i+j+casilla).css({/*'background': color_icono, 'border-radius' : forma_icono, */'display' : display});
        }
    }

    $('.icono').click(seleccionIcono);
}

// Genera aleatoriamente un plano de mapa según argumentos (entre todos deben sumar <= 64) {EN PRUEBAS}
function generadorPlanoRandom(x, A, E, N, a, e, n){

    var planes = [
        {tipo: 'x', num: x}, {tipo: 'A', num: A}, {tipo: 'E', num: E}, {tipo: 'N', num: N}, {tipo: 'a', num: a}, {tipo: 'e', num: e}, {tipo: 'n', num: n}
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
                console.log ('Plan random: ' + plan_random);
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

//PENDIENTE DE REVISION
//Comprueba que en las casillas colindantes no haya ninguna unidad incompatible con la que se pretende colocar
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
    console.log(iteracion_length);

    //Los que solo son incompatibles con 1 o 2 tipo de unidad, se repite dos veces para simplificar el algoritmo
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
            //console.log(iteracion[k]);

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


/////////////////////NOMBRES///////////////////////////

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


// Devuelve un string con un nombre, seleccionado aleatoriamente de un array de nombres
function nombresRandom(tipo, bando){

    var nombres;

    switch(tipo){

        case 'Soldado':

            if (bando === 'Romanos'){

                nombres = nombres_sold_rom;

            }else if (bando === 'Bárbaros'){

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
    //console.log('antes:'+nombres[random])
    nombres.splice(random, 1);
    //console.log('despues:'+nombres[random])
    return resultado;
}

// Finaliza el turno actual del jugador, y otorga 3 de oro a los jugadores
function pasarTurno(){

    var i = 0;
    var unidades_length = unidades.length;
    var id = '';

    generarSoldados('Romanos');
    turnoIA();
    generarSoldados('Bárbaros');
    oro[1] += 3;
    oro[0] += 3;
    $('#oro').val(oro[0]);

    for (i = 0; i < unidades.length; i++){

        var unidad_i = unidades[i];

        //Para que los soldados capturen los pueblos adyacentes automáticamete si se encuentran cerca al terminar turno.
        encuentro(unidad_i);

        if (unidad_i.tipo === 'Soldado'){

            unidad_i.mueve = unidad_i.mueve_total;

            //Si es romano, se colorea para indicar que puede moverse de nuevo
            if (unidad_i.jugador === 'Romanos'){
                //alert(unidad_i.casilla);
                id = $('#'+unidad_i.casilla).attr('id').replace('icono', '').split("");
                //console.log(id[0] + id[1]);
                $('#casilla'+id[0]+id[1]).html('<a id="tooltip'+id[0]+id[1]
                    +'a" href="#" data-toggle="tooltip" title="['+unidad_i.nombre+']. Mueve: ['+unidad_i.mueve+'], Fuerza: ['+unidad_i.fuerza+']">'
                        +'<img class="icono" id="icono'+id[0]+id[1]+'a" src="images/SR_del_def.png"></img></a>');
            }
        }
    }

    $('.icono').off();
    $('.icono').click(seleccionIcono);

    comprobarVictoria();
}

// Lleva a cabo el turno del enemigo mediante una 'IA' de comportamiento aleatorio, como si fuera un jugador
function turnoIA(){

    var i = 0;
    var pueblos = [];
    var num_iter = 0;
    var iguales = true;
    var pueblo_aux = '';

    var pueblos_length = '';
    var unidades_length = unidades.length;
    var vago = 0;


    // Mover soldados
    for (i = 0; i < unidades_length; i++){

        //Si es 1, ese soldado no se moverá en este turno
        vago = Math.round(Math.random() * 5);

        if ( (unidades[i] !== undefined) && (unidades[i].tipo === 'Soldado') && (unidades[i].jugador === 'Bárbaros') && (vago != 1) ){
            console.log('i='+i+'unidades[i].tipo='+unidades[i].tipo);
            autoMoverSoldadoRandom(unidades[i]);
        }
    }

    // Crear array de pueblos solamente
    for (i = 0; i < unidades.length; i++){

        if ((unidades[i].tipo === 'Pueblo') && (unidades[i].jugador === 'Bárbaros')){

            pueblos.push(unidades[i]);
        }
    }

    // Reordenar aleatoriamente la array de pueblos
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

    // Mejorar los pueblos
    for (i = 0; i < pueblos_length; i++){
    //console.log('checkeando pueblos');

        //Si es 1 0 2, no se mejorará cal o cant, respectivamente
        vago = Math.round(Math.random() * 5);

        if ((oro[1] >= pueblos[i].stats.precio_mej_cal) && (vago !== 1)){
            //console.log('Mejorando cal pueblo!');
            modoMejorar(pueblos[i], 'mej_cal');
        }

        if ((oro[1] >= pueblos[i].stats.precio_mej_cant) && (vago !== 2)){

            modoMejorar(pueblos[i], 'mej_cant');
        }
    }
}

// Mueve aleatoriamente a todos los soldados enemigos
function autoMoverSoldadoRandom(unidad){

    var randomIndex = 0;
    var casilla_random = '';
    var iguales = true;
    var casilla_aux = '';

    var casilla = unidad.casilla.replace('icono', '').split("");

    var iteracion = [
        ('casilla' + (parseInt(casilla[0]) + 1) + '' + parseInt(casilla[1])), ('casilla' + parseInt(casilla[0]) + '' + (parseInt(casilla[1]) + 1)),
        ('casilla' + (parseInt(casilla[0]) - 1) + '' + parseInt(casilla[1])), ('casilla' + parseInt(casilla[0]) + '' + (parseInt(casilla[1]) - 1))
    ];

    //Evitar que se muevan fuera del tablero, a casillas inexistentes
    if (parseInt(casilla[0]) === 7){
        iteracion.splice(0, 1);
    }else if (parseInt(casilla[0]) === 0){
        iteracion.splice(2, 1);
    }

    if (parseInt(casilla[1]) === 7){
        iteracion.splice(1, 1);
    }else if (parseInt(casilla[1]) === 0){
        iteracion.splice(3, 1);
    }

    var iteracion_length = iteracion.length;

    // Reordenar aleatoriamente el array de direcciones posibles
    num_iter = Math.round(Math.random() * iteracion_length);

    while (num_iter > 0){

        while (iguales){

            iguales = false;
            casilla_random1 = Math.abs(Math.round(Math.random() * (iteracion.length - 1)))
            casilla_random2 = Math.abs(Math.round(Math.random() * (iteracion.length - 1)))
            if (casilla_random1 == casilla_random2){
                iguales = true;
            }
        }

        casilla_aux = iteracion[casilla_random1];
        iteracion[casilla_random1] = iteracion[casilla_random2];
        iteracion[casilla_random2] = casilla_aux;

        num_iter--;
    }

    var movs = unidad.mueve;

    while ((unidad.mueve === movs) && (iteracion.length > 0)){

        randomIndex = Math.abs(Math.round(Math.random() * (iteracion.length - 1))) ;
        //console.log(':::'+unidad.casilla);
        //console.log(randomIndex);
        casilla_random = iteracion[randomIndex];
        //console.log(casilla_random);f
        moverSoldado(unidad, casilla_random);
        //console.log ('iteracion.length=' + iteracion.length);
        iteracion.splice(randomIndex, 1);

    }
}

// Mueve los soldados intentando acercarse primero a las ciudades neutrales/adversarias y luego a los soldados adversarios.
function autoMoverSoldadoIA(unidad){

    var randomIndex = 0;
    var casilla_random = '';
    var iguales = true;
    var casilla_aux = '';
    var i = 0;
    var casilla_ini = '';
    var casilla_fin = '';
    var objetivo = '';
    var continuar = true;

    var casilla = unidad.casilla.replace('icono', '').split("");

    var iteracion = [
        ('#casilla' + (parseInt(casilla[0]) + 1) + '' + parseInt(casilla[1]) +' a img'), ('#casilla' + parseInt(casilla[0]) + '' + (parseInt(casilla[1]) + 1) +' a img'),
        ('#casilla' + (parseInt(casilla[0]) - 1) + '' + parseInt(casilla[1]) +' a img'), ('#casilla' + parseInt(casilla[0]) + '' + (parseInt(casilla[1]) - 1) +' a img')
    ];

    var iteracion_length = iteracion.length;
    var unidades_length = unidades.length;

    casilla_ini = unidad.casilla.replace('icono','').split('');

    //var movs = unidad.stats.mueve;

    //Primero busca pueblos
    for (i = 0; (i < unidades_length && movs > 0); i++){

        continuar = true;

        if ((unidades[i].tipo === 'Pueblo') && ((unidades[i].jugador === 'Neutral') || (unidades[i].jugador === 'Romanos'))){

            while (continuar && unidad.mueve > 0){
                objetivo = unidades[i];
                casilla_fin = unidades[i].casilla.replace('icono','').split('');

                //Intentará posicionarse en la misma columna que el objetivo, y luego en su misma fila
                if (casilla_ini[1] < casilla_fin[1]){
                    moverSoldado(unidad, iteracion[1]);
                }if (casilla_ini[1] < casilla_fin[1]){
                    moverSoldado(unidad, iteracion[4]);
                }else if (casilla_ini[0] < casilla_fin[0]){
                    moverSoldado(unidad, iteracion[0]);
                }else if (casilla_ini[0] > casilla_fin[0]){
                    moverSoldado(unidad, iteracion[2]);
                }

                //Si nuestra unidad o ya no existe o el pueblo ya fue conquistado, para
                if ( (unidades[i].jugador === 'Romanos') || (unidad === undefined) ){
                    continuar = false;
                }
            }
        }
    }

    //Luego busca soldados
    for (i = 0; i < unidades_length; i++){

        continuar = true;

        if ((unidades[i].tipo === 'Soldado') && ((unidades[i].jugador === 'Neutral') || (unidades[i].jugador === 'Romanos'))){

            while (continuar && unidad.mueve > 0){
                objetivo = unidades[i];
                casilla_fin = unidades[i].casilla.replace('icono','').split('');

                //Intentará posicionarse en la misma columna que el objetivo, y luego en su misma fila
                if (casilla_ini[1] < casilla_fin[1]){
                    moverSoldado(unidad, iteracion[1]);
                }if (casilla_ini[1] < casilla_fin[1]){
                    moverSoldado(unidad, iteracion[4]);
                }else if (casilla_ini[0] < casilla_fin[0]){
                    moverSoldado(unidad, iteracion[0]);
                }else if (casilla_ini[0] > casilla_fin[0]){f
                    moverSoldado(unidad, iteracion[2]);
                }

                //Si nuestra unidad o la adversario ya no existe
                if ( (unidades[i] !== objetivo) || (unidad === undefined) ){
                    continuar = false;
                }
            }
        }
    }
}

// Itera a lo largo de todas als ciudades y, si puede, genera los soldados que pertocan según el stat 'cantidad', con una fuerza igual a 'calidad'
function generarSoldados(jugador){

    var i = 0;
    var j = 0;
    var unidades_length = unidades.length;
    var soldados = 0;
    var calidad = 0;
    var movs = 0;
    var casilla = '';
    var casilla_vacia = '';
    var id = '';
    var nombre_random = '';

    var iteracion = '';
    var iteracion_length = '';

    for(i = 0; i < unidades_length; i++ ){

        if ((unidades[i].tipo === 'Pueblo') && (unidades[i].jugador === jugador)){

            soldados = unidades[i].stats.cantidad;
            calidad = unidades[i].stats.calidad;

            casilla = unidades[i].casilla.replace('icono','').split("");

            iteracion = [
                ('#casilla' + (parseInt(casilla[0]) + 1) + '' + parseInt(casilla[1])), ('#casilla' + parseInt(casilla[0]) + '' + (parseInt(casilla[1]) + 1)),
                ('#casilla' + (parseInt(casilla[0]) - 1) + '' + parseInt(casilla[1])), ('#casilla' + parseInt(casilla[0]) + '' + (parseInt(casilla[1]) - 1))
            ];

            //Evitar que se muevan fuera del tablero, a casillas inexistentes
            if (parseInt(casilla[0]) === 7){
                iteracion.splice(0, 1);
            }else if (parseInt(casilla[0]) === 0){
                iteracion.splice(2, 1);
            }

            if (parseInt(casilla[1]) === 7){
                iteracion.splice(1, 1);
            }else if (parseInt(casilla[1]) === 0){
                iteracion.splice(3, 1);
            }

            iteracion_length = iteracion.length;


            //Generara soldados mientras queden espacios libres, y capacidad del pueblo de generar soldados ese turno.
            for (j = 0; (j < iteracion_length) && (soldados > 0); j++){

                if ( ($(iteracion[j]+' img').attr('id') === undefined ) ){

                    casilla_vacia = iteracion[j].replace('#casilla','').split("");

                    nombre_random = nombresRandom('Soldado', jugador);

                    if (jugador === 'Romanos'){
                        id = 'icono'+casilla_vacia[0]+casilla_vacia[1]+'a';
                        //alert(id);
                        movs = 2;

                        $(iteracion[j]).html('<a id="tooltip'+i+''+j+casilla
                        +'" href="#" data-toggle="tooltip" title="['+nombre_random+']. Mueve: ['+movs+'], Fuerza: ['+unidades[i].stats.calidad+']">'
                        +'<img class="icono" id="'+id+'" src="images/SR_del_def.png"></img></a>');

                    }else if (jugador === 'Bárbaros'){
                        id = 'icono'+casilla_vacia[0]+casilla_vacia[1]+'e';
                        //alert(id);

                        movs = 1;

                        $(iteracion[j]).html('<a id="tooltip'+i+''+j+casilla+'" href="#" data-toggle="tooltip" title="['+nombre_random+']. Mueve: ['+movs+'], Fuerza: ['+unidades[i].stats.calidad+']">'
                        +'<img class="icono" id="'+id+'" src="images/SB_del_def.png"></img></a>');
                    }


                    //$('#'+casilla_vacia).css({'background': color_icono, 'border-radius' : forma_icono, 'display' : display});

                    unidades.push(
                        {casilla: id, jugador: jugador, tipo: 'Soldado', nombre: nombre_random, mueve: movs, mueve_total: movs, fuerza: calidad});

                    //Resolver posibles encuentros que le surjan al ser generado al lado de otra unidad.
                    encuentro(unidades[unidades.length - 1]);

                    soldados--;
                }
            }
        }
    }
}


// Muestra informacion sobre el icono y, según el tipo de icono seleccionado, permite mover soldado o mejorar pueblo
function seleccionIcono(){

    var i = 0;
    var unidad = '';
    var icono = this.id;
    var tipo = icono.charAt(icono.length - 1);
    var color = '';
    //console.log(tipo);

    var unidades_length = unidades.length;

    $('.icono').off();

    for(i = 0; i < unidades_length; i++){
        if (unidades[i].casilla == icono){
            unidad = unidades[i];
            //console.log('encontrado!')
            break;
        }
    }

    switch(tipo){

        case 'A':
            $('#jugador').val(unidad.jugador);
            $('#tipo').val(unidad.tipo);
            $('#nombre').val(unidad.nombre);

            $('#prod_cant').html(unidad.cantidad);
            $('#prod_cal').html(unidad.calidad);
            $('#mej_cant').html(unidad.precio_mej_cant);
            $('#mej_cal').html(unidad.precio_mej_cal);

            $('#form_pueblo').show();
            $('#form_soldado').hide();

            //console.log(unidad.stats.precio_mej_cant);
            //$('#mej_cant').click({unidad : unidad, mejora_auto : ''}, modoMejorar);

            $('#mej_cant').off();
            $('#mej_cant').click(function(){
                modoMejorar(unidad, 'mej_cant');
            });

            $('#mej_cal').off();
            $('#mej_cal').click(function(){
                modoMejorar(unidad, 'mej_cal');
            });

            //$('#mej_cal').click({unidad : unidad}, modoMejorar);

            $("#mej_cant").html('Mejorar cantidad ('+unidad.stats.precio_mej_cant+' Oro)');
            $("#mej_cal").html('Mejorar calidad ('+unidad.stats.precio_mej_cal+' Oro)');
            $("#prod").html('Produciendo ['+unidad.stats.cantidad+'] soldados de fuerza ['+unidad.stats.calidad+'] cada día.');

            color = 'RGB(255, 10, 10)';
            break;

        case 'E':

            $('#jugador').val(unidad.jugador);
            $('#tipo').val(unidad.tipo);
            $('#nombre').val(unidad.nombre);

            $('#form_pueblo').hide();
            $('#form_soldado').hide();

            color = 'RGB(7, 168, 226)';
            break;

        case 'N':
            $('#jugador').val(unidad.jugador);
            $('#tipo').val(unidad.tipo);
            $('#nombre').val(unidad.nombre);

            $('#form_pueblo').hide();
            $('#form_soldado').hide();

            color = 'RGB(135, 135, 135)';
            break;

        case 'a':
            $('#jugador').val(unidad.jugador);
            $('#tipo').val(unidad.tipo);
            $('#nombre').val(unidad.nombre);

            $('#form_pueblo').hide();
            $('#form_soldado').show();
            $('#destruir').show();

            modoMover(icono, unidad);
            $("#mueve").html('Aún puede moverse ['+unidad.mueve+'] casillas este turno.');
            $("#fuerza").html('Tiene una fuerza en combate de ['+unidad.fuerza + '].');

            color = 'RGB(255, 10, 10)';
            break;

        case 'e':
            $('#jugador').val(unidad.jugador);
            $('#tipo').val(unidad.tipo);
            $('#nombre').val(unidad.nombre);

            $('#form_pueblo').hide();
            $('#form_soldado').show();
            $('#destruir').hide();

            $("#mueve").html('Puede moverse ['+unidad.mueve+'] casilla este turno.');
            $("#fuerza").html('Tiene una fuerza en combate de ['+unidad.fuerza + '].');

            color = 'RGB(7, 168, 226)';
            break;

        case 'n':
            $('#jugador').val(unidad.jugador);
            $('#tipo').val(unidad.tipo);
            $('#nombre').val(unidad.nombre);

            $('#form_pueblo').hide();
            $('#form_soldado').show();
            $('#destruir').hide();

            $("#mueve").html('Prefiere defender su territorio');
            $("#fuerza").html('Puede devorar a alguien con poco entrenamiento');

            color = 'RGB(135, 135, 135)';
            break;
    }

    $('#info').css({'background' : color});
    $('#info').show();
}

/*
function cerrarInfo(){
    $('#info').hide();
}
*/

// Permite mover al soldado hasta quedarse sin movimientos
function modoMover(icono, unidad){

    //movs = unidad.mueve;

    //$('#'+icono).html('<form><input readonly>'+movs+'</input></form>');

    $('.casilla').off();
    //movs = movs - $('.casilla').click({unidad: unidad}, moverSoldado).data("result");  //Event handler de mover soldado

    $('.casilla').click(function(){
        //alert(unidad.casilla.replace('icono', '').substring(0, 2) + '=' + this.id.replace('casilla', ''));
        var meta = this.id;
        if ((unidad.mueve > 0) && (unidad.casilla.replace('icono', '').substring(0, 2) !== this.id.replace('casilla', ''))){
            moverSoldado(unidad, meta);
        }

    });

    $('#destruir').off();
    $('#destruir').click(function(){
        if (confirm('¿Suicidar al soldado actual?')){
            destruirUnidad(unidad);
            $('.casilla').off();
            $('#info').hide();
            $('.icono').off();
            $('.icono').click(seleccionIcono);
        }else{

        }
    });

    //$('#'+icono).html('<form><input readonly>'+movs+'</input></form>');

    //$('#casilla').off();
    //$('.icono').click(seleccionIcono);

}

// meta_auto es para cuando al funcion se invoca en el turno de la IA. En otro caso, es invocada por un event_handler
function moverSoldado(unidad, meta) {

    var icono = '';
    var resultado = '';

    switch (unidad.jugador) {
    case 'Romanos':
        color_icono = 'Blue';
        forma_icono = '50px 50px 50px 50px';
        display = 'block';

        break;
    case 'Bárbaros':
        color_icono = 'Red';
        forma_icono = '50px 50px 50px 50px';
        display = 'block';
        break;
    }

    //alert(meta);
    icono = document.getElementById(meta).lastElementChild;
    casilla_ini = unidad.casilla.replace('icono','').split("");
    //alert(casilla_ini[0] + ',' + casilla_ini[1] + ',' + casilla_ini[2]);
    casilla_fin = meta.replace('casilla','').replace('#', '').split("");
    //alert (icono);
    //Determinar cuantas casillas nos hemos movido en total
    mov =  Math.abs(casilla_ini[0] - casilla_fin[0])  + Math.abs(casilla_fin[1] - casilla_ini[1]);
    //console.log(mov);

    if (
        (icono === null)
        && (mov > 0) && (mov <= unidad.mueve)
        /*
        && ((casilla_ini[0] - casilla_fin[0] < unidad.mueve) || (casilla_fin[0] - casilla_ini[0] < unidad.mueve))
        && ((casilla_ini[1] - casilla_fin[1] < unidad.mueve) || (casilla_fin[1] - casilla_ini[1] < unidad.mueve))
        */
        ){

        //Se mueve el icono del soldado de la casilla donde estaba a la elegida, y se calculan los movimientos que le quedan

        //$(unidad.casilla).css({'background': color_icono, 'border-radius' : forma_icono, 'display' : display});
        //unidad.casilla = 'icono'+casilla_ini[2];

        unidad.casilla = 'icono' + casilla_fin[0] + '' + casilla_fin[1] + casilla_ini[2];

        resultado = encuentro(unidad);

        if ( resultado !== 'nada'){
            unidad.mueve = 0;
        }else{
            unidad.mueve -= mov;
        }


        switch (unidad.jugador) {
            case 'Romanos':

                if (resultado === 'pierde'){
                    $('#casilla'+casilla_fin[0]+''+casilla_fin[1]).html('');
                }else if ((resultado === 'gana') || (unidad.mueve === 0)){
                    $('#casilla'+casilla_fin[0]+''+casilla_fin[1]).html('<a id="tooltip'+casilla_fin[0]+''+casilla_fin[1]+casilla_ini[2]
                        +'" href="#" data-toggle="tooltip" title="['+unidad.nombre+']. Mueve: ['+unidad.mueve+'], Fuerza: ['+unidad.fuerza+']">'
                        +'<img class="icono" id="icono'+casilla_fin[0]+''+casilla_fin[1]+casilla_ini[2]+'" src="images/SRUsed_del_def.png"></img></a>');

                }else if (resultado === 'nada'){
                    $('#casilla'+casilla_fin[0]+''+casilla_fin[1]).html('<a id="tooltip'+casilla_fin[0]+''+casilla_fin[1]+casilla_ini[2]
                        +'" href="#" data-toggle="tooltip" title="['+unidad.nombre+']. Mueve: ['+unidad.mueve+'], Fuerza: ['+unidad.fuerza+']">'
                        +'<img class="icono" id="icono'+casilla_fin[0]+''+casilla_fin[1]+casilla_ini[2]+'" src="images/SR_del_def.png"></img></a>');
                }

            break;
            case 'Bárbaros':
                if (resultado === 'pierde'){
                    $('#casilla'+casilla_fin[0]+''+casilla_fin[1]).html('');
                }else{
                    $('#casilla'+casilla_fin[0]+''+casilla_fin[1]).html('<a id="tooltip'+casilla_fin[0]+''+casilla_fin[1]+casilla_ini[2]
                        +'" href="#" data-toggle="tooltip" title="['+unidad.nombre+']. Mueve: ['+unidad.mueve_total+'], Fuerza: ['+unidad.fuerza+']">'
                        +'<img class="icono" id="icono'+casilla_fin[0]+''+casilla_fin[1]+casilla_ini[2]+'" src="images/SB_del_def.png"></img></a>');
                }
            break;
    }

        $('#casilla'+casilla_ini[0]+''+casilla_ini[1]).html('');
        $('.casilla').off();
        $('.icono').click(seleccionIcono);
        $('#info').hide();
        comprobarVictoria();

    }else{

        if (unidad.jugador === 'Romanos'){
            alert('Movimiento no permitido');
        }
    }
}

// Calcula el resultado del encuentro de un soldado con otro soldado o pueblo enemigo/neutral, devuelve true si victoria de unidad
function encuentro(unidad){

    var adversario = '';
    var conquistado = 0;
    var vencedor = '';
    var perdedor = '';
    //alert(unidad.casilla);
    var casilla = unidad.casilla.replace('icono', '').split("");
    //alert(casilla[0] + ',' + casilla[1] + ',' + casilla[2]);

    var iteracion = [
        ('#casilla' + (parseInt(casilla[0]) + 1) + '' + parseInt(casilla[1])), ('#casilla' + parseInt(casilla[0]) + '' + (parseInt(casilla[1]) + 1)),
        ('#casilla' + (parseInt(casilla[0]) - 1) + '' + parseInt(casilla[1])), ('#casilla' + parseInt(casilla[0]) + '' + (parseInt(casilla[1]) - 1))
    ];

    var iteracion_length = iteracion.length;
    var unidades_length = unidades.length;

    var i = 0;
    var j = 0;
    var k = 0;

    var nuevo_id = '';
    var title = '';
    //Se encuentra algo? 'nada', 'vence' 0 'gana'
    var resultado = 'nada';

    var audio = '';

    //console.log($('#casilla33 img').attr('id'));

    //Busca enfrentamientos con otros soldados colindantes
    for (i = 0; i < iteracion_length; i++){
         if ( ($(iteracion[i]+' a img').attr('id') !== undefined)
            && ( (($(iteracion[i]+' a img').attr('id').replace('icono', '').charAt(2) === 'e') && (unidad.jugador === 'Romanos'))
            ||(($(iteracion[i]+' a img').attr('id').replace('icono', '').charAt(2) === 'a') && (unidad.jugador === 'Bárbaros'))
            ||(($(iteracion[i]+' a img').attr('id').replace('icono', '').charAt(2) === 'n') && ((unidad.jugador === 'Romanos')||(unidad.jugador === 'Bárbaros'))) )

            ) {

            //console.log($(iteracion[0]).attr('id'));
            //console.log('entro en if de soldados colindantes')
            resultado = 'nada';

            //combate
            for (j = 0; j < unidades_length; j++){
                //console.log(unidades[j].casilla.replace('icono', '').replace('a', '').replace('e','') + ' ===??? ' + iteracion[i].replace('#casilla', ''));
                if (unidades[j].casilla.replace('icono', '').replace('a', '').replace('e','').replace('n','') === iteracion[i].replace('#casilla', '')) {
                    adversario = unidades[j];
                    break;
                    //console.log('1092-- Adversario encontrado');
                }
            }

            //100%
            if (unidad.fuerza > adversario.fuerza + 1) {

                vencedor = unidad;
                perdedor = adversario;
                resultado = 'gana';
                destruirUnidad(adversario);

            } else if (unidad.fuerza + 1 < adversario.fuerza) {

                vencedor = adversario;
                perdedor = unidad;
                resultado = 'pierde';
                destruirUnidad(unidad);

            } else if (unidad.fuerza === adversario.fuerza) {

                //Se sortea el perdedor (50%)
                if (Math.round(Math.random() * 1) === 1) {

                    console.log('Vence');
                    vencedor = unidad;
                    perdedor = adversario;
                    resultado = 'gana';
                    destruirUnidad(adversario);

                } else {

                    console.log('Pierde');
                    vencedor = adversario;
                    perdedor = unidad;
                    resultado = 'pierde';
                    destruirUnidad(unidad);
                }
            } else if (unidad.fuerza + 1 === adversario.fuerza) {

                // 25%
                if (Math.round(Math.random() * 3) === 0) {

                    console.log('Vence');
                    vencedor = unidad;
                    perdedor = adversario;
                    resultado = 'gana';
                    destruirUnidad(adversario);

                } else {

                    console.log('Pierde');
                    vencedor = adversario;
                    perdedor = unidad;
                    resultado = 'pierde';
                    destruirUnidad(unidad);
                }

            } else if (unidad.fuerza === adversario.fuerza + 1){

                // 25%
                if (Math.round(Math.random() * 3) !== 0) {

                    console.log('Vence');
                    vencedor = unidad;
                    perdedor = adversario;
                    resultado = 'gana';
                    destruirUnidad(adversario);

                } else {

                    console.log('Pierde');
                    vencedor = adversario;
                    perdedor = unidad;
                    resultado = 'pierde';
                    destruirUnidad(unidad);
                }
            }

            //Repartir recompensa por derrota
            if ((vencedor.jugador === 'Romanos')&&(perdedor.jugador !== 'Neutral')){

                oro[0]++;
                $('#oro').val(oro[0]);

            }else if ((vencedor.jugador === 'Bárbaros')&&(perdedor.jugador !== 'Neutral')){

                oro[1]++;
            }

            //Si aún no ha muerto, sigue buscando adversarios.
            if (perdedor === unidad){
                break;
            }
        }
    }

    //Si la unidad aún no ha sido destruida, puede conquistar
    if (resultado !== 'pierde') {

        for (i = 0; i < iteracion_length; i++){

            if (  ($(iteracion[i]+' a img').attr('id') !== undefined)
                && (($(iteracion[i]+' a img').attr('id').replace('icono', '').charAt(2) === 'N')
                || (($(iteracion[i]+' a img').attr('id').replace('icono', '').charAt(2) === 'E') && (unidad.jugador === 'Romanos'))
                || (($(iteracion[i]+' a img').attr('id').replace('icono', '').charAt(2) === 'A') && (unidad.jugador === 'Bárbaros')) )
                ) {

               //.log($(iteracion[0]).attr('id').replace('icono', '').charAt(2));

                resultado = 'gana';

                unidades_length = unidades.length;

                //Encontrar la unidad objetivo en el array
                for (j = 0; j < unidades_length; j++){
                    if (unidades[j].casilla === ($(iteracion[i]+' img').attr('id'))) {
                        conquistado = j;
                        break;
                    }
                }

                unidades[conquistado].jugador = unidad.jugador;
                unidades[conquistado].nombre = nombresRandom('Pueblo', unidad.jugador);

                if (unidad.jugador === 'Romanos'){
                    $(iteracion[i]+' a img').attr('src', 'images/AR_del_def.png');
                    nuevo_id = $(iteracion[i]+' img').attr('id').replaceAt( $(iteracion[i]+' img').attr('id').length - 1, 'A');
                    $(iteracion[i]+' a img').attr('id', nuevo_id);
                    unidades[conquistado].casilla = unidades[conquistado].casilla.replaceAt(unidades[conquistado].casilla.length - 1, 'A');

                    title = '['+unidades[conquistado].nombre+']. Cantidad: ['+unidades[conquistado].stats.cantidad+']. Calidad: ['+unidades[conquistado].stats.calidad+']';

                    //console.log(conquistado.casilla);
                    audio = new Audio('sounds/rom_conquest.mp3');
                }else if (unidad.jugador === 'Bárbaros'){
                    $(iteracion[i]+' a img').attr('src', 'images/AB_del_def.png');
                    nuevo_id = $(iteracion[i]+' img').attr('id').replaceAt( $(iteracion[i]+' img').attr('id').length - 1, 'E');
                    $(iteracion[i]+' a img').attr('id', nuevo_id);
                    unidades[conquistado].casilla = unidades[conquistado].casilla.replaceAt(unidades[conquistado].casilla.length - 1, 'E');
                    audio = new Audio('sounds/bar_conquest.mp3');

                    title = '['+unidades[conquistado].nombre+']';
                }

                $(iteracion[i]+' a').attr('title', title);
                //Un soldado solo puede conquistar un pueblo por turno.
                audio.play();

                //break;

            }
        }
    }
    return resultado;
}

//
function destruirUnidad(unidad){
    console.log($('#casilla' + unidad.casilla.replace('icono','').replace('a', '').replace('e', '').replace('n','')).attr('id'));
    $('#casilla' + unidad.casilla.replace('icono','').replace('a', '').replace('e', '').replace('n','')).html('');
    console.log('antes:'+unidad.nombre);
    unidades.splice(unidades.indexOf(unidad), 1);
    console.log('despues:'+unidad.nombre);

    var audio = '';

    if (unidad.jugador === 'Romanos'){
        audio = new Audio('sounds/scream.mp3');
    }else if (unidad.jugador === 'Bárbaros'){
        audio = new Audio('sounds/kill.mp3');
    }else if (unidad.jugador === 'Neutral'){
        audio = new Audio('sounds/wolf_scream.mp3');
    }

    audio.play();
}

// mejora_auto es para cuando al funcion se invoca en el turno de la IA. En otro caso, es invocada por un event_handler
function modoMejorar(unidad, mejora){

    var money = 0;
    var casilla = '';
    var imagen = '';
    var title = '';
    //alert(unidad.stats.precio_mej_cant);
    if (unidad.jugador === 'Romanos'){
        index = 0;
        imagen = 'AR_del_def';
    }else if (unidad.jugador === 'Bárbaros'){
        index = 1;
        imagen = 'AB_del_def';
    }

    if (mejora === 'mej_cant'){

        if (unidad.stats.precio_mej_cant <= oro[index]){

            oro[index] -= unidad.stats.precio_mej_cant;
            unidad.stats.precio_mej_cant += unidad.stats.precio_mej_cant;
            unidad.stats.cantidad++;
            $('#oro').val(oro[index]);
            //alert('comprado!' + money + ', ' + unidad.stats.cantidad);

        }else{
            alert('¡No te basta el oro!');
        }

    }else if (mejora === 'mej_cal'){

        if (unidad.stats.precio_mej_cal <= oro[index]){

            oro[index] -= unidad.stats.precio_mej_cal;
            unidad.stats.precio_mej_cal += unidad.stats.precio_mej_cal;
            unidad.stats.calidad++;
            $('#oro').val(oro[index]);

        }else{
            alert('¡No te basta el oro!');
        }
    }

    casilla = unidad.casilla.replace('icono', '#casilla')
    casilla = casilla.substring(0, casilla.length - 1);

    if (unidad.jugador === 'Romanos'){
        title = '['+unidad.nombre+']. Cantidad: ['+unidad.stats.cantidad+'], Calidad: ['+unidad.stats.calidad+']';
    }else if (unidad.jugador === 'Bárbaros'){
        title = '['+unidad.nombre+']';
    }

    $(casilla).html('<a id="tooltip'+unidad.casilla.replace('icono','')
            +'" href="#" data-toggle="tooltip" title="'+title+'">'
            +'<img class="icono" id="'+unidad.casilla+'" src="images/'+imagen+'.png"></img></a>');

    $('#info').hide();
    $('.icono').click(seleccionIcono);
}

// Comprueba que aún queden unidades (soldados y pueblos) de los dos jugadores; sino, le concede la victoria a un bando
function comprobarVictoria(){

    var i = 0;
    var unidades_length = unidades.length;
    //Vivos [Romanos, Bárbaros]
    var vivos = [0,0];
    var audio = '';

    //El jugador tiene que destruir todos los soldados y pueblos barbaros. A la IA le basta con destruir a los soldados romanos.
    for (i = 0; i < unidades_length; i++){

        if ( (unidades[i].tipo === 'Soldado') && (unidades[i].jugador === 'Romanos') ){

            vivos[0]++;
        }else if (unidades[i].jugador === 'Bárbaros'){

            vivos[1]++;
        }
    }

    if (vivos[1] === 0){
        audio = new Audio('sounds/victory.mp3');
        alert ('¡Victoria! La zona vuelve a ser segura.');
        audio.play();
        avanzarMapa();

    }else if (vivos[0] === 0){
        audio = new Audio('sounds/loose.mp3');
        alert ('¡Los Bárbaros están por todos lados! Roma caerá...');
        audio.play();
        //location.reload();
        mapeador(planos[mapa_actual]);
    }
}

// Avanza al siguiente plano, excepto si ya no quedan, que da la victoria al jugador
function avanzarMapa(){

    mapa_actual++;

    if (mapa_actual >= planos.length ){

        alert('¡Felicidades, has completado el juego! Esos bárbaros no volverán a amenazar la bella Roma... ¿O tal vez ésto solo sea el principio?');
        document.cookie="mapa="+1+"; expires=Thu, 07 Dec 2017 12:00:00 UTC";
        location.reload();
    }else{
        document.cookie="mapa="+mapa_actual+"; expires=Thu, 07 Dec 2017 12:00:00 UTC";
        mapeador(planos[mapa_actual]);

        if (mapa_actual === 2){
            alert('¡Incluso los pequeños pueblos de las montañas merecen ser protegidos de los sádicos Bárbaros!')
        }else if (mapa_actual === 3){
            alert('Estos malditos incivilizados son siquiera capaces de formar para la batalla...')
        }else if (mapa_actual === 4){
            alert('Tus exploradores te han asegurado que el paso es seguro... pero algo huele mal... como a gente que hace años que no se baña...')
        }else if (mapa_actual === 5){
            alert('¡Maldición! Tu explorador te ha llevado de lleno a la boca del lobo. ¡Hay enemigos por todas partes!')
        }else if (mapa_actual === 6){
            alert('Tu explorador traidor se oculta en algún lugar de este valle lleno de bárbaros... es hora de la venganza')
        }else if (mapa_actual === 7){
            alert('¡Mientras nuestras tropas estaban destacadas en el valle, una manada gigantesca de lobos rodean los poblados cercanos atraidos por la sangre!')
        }else if (mapa_actual === 8){
            alert('Estos bárbaros son buenos tendiendo emboscadas en las montañas... ¡Pero nunca vencerán a la férrea disciplina del ejército Romano!')
        }else if (mapa_actual === 9){
            alert('Al fin... has llegado al campamento principal de los Bárbaros... aunque solo quedas tú. ¡Reúne fuerzas y acaba con ellos!')
        }else if (mapa_actual === 10){
            alert('¡Han llegado los refuerzos que Roma prometió...! Es hora de terminar con los últimos supervivientes bárbaros... ¡Por Roma!')
        }
    }
}
