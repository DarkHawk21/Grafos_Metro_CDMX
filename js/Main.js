//Creando el grafo de tipo 1 (Grafo dirigido).
const grafo = new Grafo(1);

//Matríz de adyacencia (vértices [<ID_vertice>, <Nombre_vertice>]).
let vertices = [
    [1,"1"],
    [2,"2"],
    [3,"3"],
    [4,"4"],
    [5,"5"],
    [6,"6"]
];

//Matríz de adyacencia (aristas [<vertice_inicial>, <vertice_final>, <costo_de_conexión>]).
let edges = [
    [1,2,5],
    [1,3,6],
    [2,3,3],
    [2,4,8],
    [3,5,2],
    [3,6,11],
    [4,5,0],
    [4,6,1],
    [5,6,12]
];

//Añadir los vértices al grafo.
for (let i = 0; i < vertices.length; i++) {
    //addVertex(VertexID, VertexName)
    grafo.addVertex(vertices[i][0], vertices[i][1]);
}

//Añadir las aristas al grafo.
for (let i = 0; i < edges.length; i++) {
    //addEgde(Nodo_actual, Nodo_vecino_a_conectar, Costo_de_conexión)
    grafo.addEdge(edges[i][0], edges[i][1], edges[i][2]);
}

//Función en JQuery; cuando el navegador cargue por completo el sitio web, se ejecuta esta función.
$(document).ready(function() {
    let origen = document.getElementById("origen"); //Select de origen.
    let destino = document.getElementById("destino"); //Select de destino.

    //Iteramos cada vértice en el grafo para llenar los select con options.
    for (value in grafo.vertices) {
        let optionOrigen = document.createElement("option"); //Creamos el option.
        optionOrigen.text = grafo.vertices[value].name; //Añadimos texto al option.
        optionOrigen.value = grafo.vertices[value].id; //Damos valor al option.
        origen.add(optionOrigen); //Añadimos el option al select.

        let optionDestino = document.createElement("option");
        optionDestino.text = grafo.vertices[value].name;
        optionDestino.value = grafo.vertices[value].id;
        destino.add(optionDestino);
    }

    grafo.bfs(1,6);
});

//Función que controla el click del botón.
// $("#btnBuscarRuta").click(function() {
//     let origen = $("#origen").val();
//     let destino = $("#destino").val();

//     if (origen != null && origen != "" && destino != null && destino != "") {
//         if (origen != destino) {
//             $("#alert").slideUp(300);
//             $("#sectionMapa").html('');
//             grafo.bfs(origen, destino);
//         } else {
//             $("#alert").slideDown(300);
//         }
//     } else {
//         if (origen == null || origen == "") {
//             alert("Por favor selecciona un punto de partida.");
//         }

//         if (destino == null || destino == "") {
//             alert("Por favor selecciona un destino.");
//         }
//     }
// });