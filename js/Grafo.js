class Grafo {
    constructor(type) {
        this.vertices = [];
        this.type = type; //Grafos dirigidos o grafos no dirigidos (1 y 2)
    }

    addVertex(vertexID, vertexName) {
        if (this.vertices.length == 0) {
            this.vertices.push(new Vertice(vertexID, vertexName));
        } else {
            let existe = false;
            let i = 0;

            while(!existe && i < this.vertices.length) {
                if (this.vertices[i].id == vertexID) {
                    existe = true;
                }

                i++;
            }

            if (!existe) {
                this.vertices.push(new Vertice(vertexID, vertexName));
            }
        }    
    }

    addEdge(u, v, costo) {
        let existeU = false, existeV = false;
        let nodoU = null, nodoV = null;

        //Validamos que los vértices que se quieren conectar existan en el grafo.
        for (let i = 0; i < this.vertices.length; i++) {
            //Si existen los dos vértices en el grafo; entonces podemos hacer la conexión (Es decir, crear la arista), de lo contrario no.
            if (this.vertices[i].id == u) {
                nodoU = this.vertices[i];
                existeU = true;
            }

            if (this.vertices[i].id == v) {
                nodoV = this.vertices[i];
                existeV = true;
            }
        }

        if (existeU && existeV) {
            if (this.type == 1) {
                //El grafo es dirigido.
                nodoU.addNeighbour(v, costo);
            } else {
                //El grafo no es dirigido.
                nodoU.addNeighbour(v, costo);
                nodoV.addNeighbour(u, costo);
            }
        }
    }

    printGraph() {
        for (let i = 0; i < this.vertices.length; i++) {
            document.writeln(this.vertices[i].id + ".- ");

            for (let j = 0; j < this.vertices[i].neighbors.length; j++) {
                document.write(this.vertices[i].neighbors[j] + " ");
            }

            document.writeln("<br>");
        }
    }

    bfs(startVertex, finalVertex) {
        let startId = this.getVertexIndex(startVertex); //Te imprime el nodo. (La posición)
        let finalId = this.getVertexIndex(finalVertex); //Te imprime el nodo. (La posición)

        if (startId >= 0 && finalId >= 0) {
            //Iniciamos la cola "rutas" con el primer elemento a analizar.
            let rutas = [];
            rutas.push([startVertex]);

            //Almacenamos los vértices ya explorados en el grafo.
            let explorados = [];
            explorados.push(startVertex);

            let nueva_ruta; 
            let ruta_actual;
            let nodo_actualID;
            let nodo_actual;
            let vecino_actualID;
            let vecino_actual;
            let salida = ``;

            //Mientras hayan rutas por explorar
            while (rutas.length > 0) {
                ruta_actual = rutas.shift(); //Ruta actual

                nodo_actualID = ruta_actual[ruta_actual.length-1]; //Imprime el ID del nodo actual.

                nodo_actual = this.vertices[this.getVertexIndex(nodo_actualID)]; //Imprime el nodo como tal.

                // Analizamos cada uno de los vecinos del nodo actual en la ruta
                for (let i = 0; i < nodo_actual.neighbors.length; i++) {
                    vecino_actualID = nodo_actual.neighbors[i][0]; //Imprime el ID de los vecinos del nodo.

                    vecino_actual = this.vertices[this.getVertexIndex(vecino_actualID)]; //Imprime los nodos vecinos.
                    
                    if (explorados.includes(vecino_actualID)) {
                        //Verifica si ya se encuentra el nodo actual en los explorados.
                        //Si ya se encuentra no se hace nada.
                    } else {
                        //Preguntamos si el nodo actual es el nodo destino
                        if (vecino_actualID == finalVertex) {
                            for (let j = 0; j < ruta_actual.length; j++) {
                                salida += `<span class='vertice'>` + this.vertices[this.getVertexIndex(ruta_actual[j])].name + `</span>`;
                            }

                            salida += `<span class='vertice'>` + this.vertices[this.getVertexIndex(vecino_actualID)].name + `</span></div>`;
                        } else {
                            nueva_ruta = ruta_actual.slice();
                            nueva_ruta.push(vecino_actualID);
                            rutas.push(nueva_ruta);
                        }

                        explorados.push(vecino_actualID);
                    }
                }
            }
        }
    }

    getVertexIndex(vertexID) {
        let existe = false;
        let contador = 0;

        for (let i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i].id == vertexID) {
                existe = true;
                contador = i;
            }
        }   

        if (existe) {
            return contador;
        } else {
            return -1;
        }
    }
}