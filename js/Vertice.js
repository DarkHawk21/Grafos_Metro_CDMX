class Vertice {
    constructor(id, name) {
        this.id = id; //Almacena el espacio en memoria del navegador
        this.name = name; //Yucatan, multiplicacion, 1, tacubaya.
        this.neighbors = []; //Conexiones con los otros vértices.
    };
    
    addNeighbour(neighbour, costo) {
        //Si el arreglo neighbors contiene al vecino que mandas, entonces no lo agregas, de lo contrario lo agregas al final del arreglo.
        if (!this.neighbors.includes(neighbour)) {
            //Creamos el vecino (arista / conexión) con la información correspondiente (costo).
            //vecino(vecino_en_cuestión, costo_de_la_conexión)
            let vecino = [neighbour, costo];
            this.neighbors.push(vecino);
            //Ordenamos los vecinos de acuerdo al ID del vecino conexión.
            this.neighbors.sort((a,b) => (a[0] >= b[0]) ? 1 : -1);
        }
    }
}
