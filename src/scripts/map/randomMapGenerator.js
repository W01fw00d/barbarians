// ON DEVELOPMENT (WIP)

// Randomly generates a map using arguments (shall sum 64)
function randomMapGenerator(x, A, E, N, a, e, n){
    var planes = [
        {type: 'x', num: x}, 
        {type: 'A', num: A}, 
        {type: 'E', num: E}, 
        {type: 'N', num: N}, 
        {type: 'a', num: a}, 
        {type: 'e', num: e}, 
        {type: 'n', num: n}
    ];

    var total = planes[0].num + planes[1].num + planes[2].num + planes[3].num + planes[4].num + planes[5].num + planes[6].num;
    var blueprint = blueprints[0];
    var i = 0;
    var j = 0;
    var columnas = blueprint.length;
    var filas = blueprint[0].length;
    var plan_random = '';

    while (total > 0){

        for (i = 0; (i < columnas && total > 0) ; i++){

            for (j = 0; (j < filas && total > 0) ; j++){

                plan_random = Math.floor((Math.random() * planes.length));

                if ( (planes[plan_random].num > 0) && comprobarIncompatibilidad(i, j, planes[plan_random].type, blueprint) ){;
                    blueprint[i] = blueprint[i].replaceAt(j, planes[plan_random].type);
                    planes[plan_random].num--;
                    total--;
                }
            }
        }
    }

    return blueprint;
}

// Checks that colindant cells there aren't any incompatible units with the new unit we are placing
function comprobarIncompatibilidad(i, j, type, blueprint){
    let k = 0,
        incompatibles
        alwaysCompatible = false
        iteration = [
            [i+1,j], [i-1,j], [i,j+1], [i,j-1]
        ];

    //var iterationLength = iteration.length;

    for (k = 0; k < iteration.length; k++){

        if (iteration[k][0] < 0 || iteration[k][1] < 0){
            iteration.splice(k, 1);
        }
    }

    var iterationLength = iteration.length;

    // 1 or 2 types are incompatibles, we repeat two times to simplify the algorythm
    switch(type){
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
            alwaysCompatible = true;
            break;
    }

    if (!alwaysCompatible){

        for (k = 0; k < iteration.length; k++){

            if ( (blueprint[iteration[k][0]].charAt(iteration[k][1]) === incompatibles[0])
            || (blueprint[iteration[k][0]].charAt(iteration[k][1]) === incompatibles[1])
            || (blueprint[iteration[k][0]].charAt(iteration[k][1]) === incompatibles[2])
            ){
                return false;
            }
        }
    }
    return true;
}