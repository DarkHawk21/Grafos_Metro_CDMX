class Grafo {
    constructor(type) {
        this.vertices = [];
        this.type = type;
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

    addEdge(u,v) {
        let existeU = false, existeV = false;
        let nodoU = null, nodoV = null;

        for (let i = 0; i < this.vertices.length; i++) {
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
                nodoU.addNeighbour(v);
            } else {
                nodoU.addNeighbour(v);
                nodoV.addNeighbour(u);
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
        let startId = this.getVertexIndex(startVertex);
        let finalId = this.getVertexIndex(finalVertex);

        if (startId >= 0 && finalId >= 0) {
            //Iniciamos la cola rutas con el primer elemento a analizar
            let rutas = [];
            rutas.push([startVertex]);

            //Almacenamos los elementos ya explorados en el grafo
            let explorados = [];
            explorados.push(startVertex);
            let nueva_ruta, ruta_actual, nodo_actualID, nodo_actual, vecino_actualID, vecino_actual, salida = ``;

            //Mientras hayan rutas por explorar
            while (rutas.length > 0) {
                ruta_actual = rutas.shift();
                nodo_actualID = ruta_actual[ruta_actual.length-1];
                nodo_actual = this.vertices[this.getVertexIndex(nodo_actualID)];

                //Analizamos cada uno de los vecinos del nodo actual en la ruta
                for (let i = 0; i < nodo_actual.neighbors.length; i++) {
                    vecino_actualID = nodo_actual.neighbors[i];
                    vecino_actual = this.vertices[this.getVertexIndex(vecino_actualID)];
                    
                    if (explorados.includes(vecino_actualID)) {
                    } else {
                        //Preguntamos si el nodo actual es el nodo destino
                        if (vecino_actualID == finalVertex) {
                            salida += `<h3>La ruta más corta de ` + this.vertices[startId].name + ` a ` + this.vertices[finalId].name + `</h3><div class='ruta'>`;
                            
                            for (let j = 0; j < ruta_actual.length; j++) {
                                salida += `<span class='vertice'>` + this.vertices[this.getVertexIndex(ruta_actual[j])].name + `</span>`;
                            }

                            salida += `<span class='vertice'>` + this.vertices[this.getVertexIndex(vecino_actualID)].name + `</span></div>`;
                            
                            $("#sectionMapa").append("<img src='img/Loading.gif'>");

                            setTimeout(() => {
                                $("#sectionMapa").html("");
                                $("#sectionMapa").append(salida);
                            }, 1500);
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