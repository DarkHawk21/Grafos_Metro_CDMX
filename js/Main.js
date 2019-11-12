const grafo = new Grafo(2);

let vertices = [
    [1, "El Rosario"], [2, "Instituto del Petróleo"], [3, "Deportivo 18 de Marzo"],
    [4, "Martín Carrera"], [5, "La Raza"], [6, "Consulado"], [7, "Tacuba"], [8, "Guerrero"],
    [9, "Garibaldi / Lagunilla"], [10, "Hidalgo"], [11, "Bellas Artes"], [12, "Morelos"],
    [13, "Oceanía"], [14, "Tacubaya"], [15, "Balderas"], [16, "Salto del agua"],
    [17, "Pino Suárez"], [18, "Candelaria"], [19, "San Lázaro"], [20, "Pantitlán"],
    [21, "Mixcoac"], [22, "Centro Médico"], [23, "Chabacano"], [24, "Jamaica"],
    [25, "Santa Anita"], [26, "Zapata"], [27, "Ermita"], [28, "Atlalilco"]
];

let edges = [
    [1,7], [7,14], [14,21], [1,2], [2,3], [2,5], [3,4], [4,6], [5,6], [6,13], [13,20], [5,8], [8,9], [9,12], [12,19], [13,19], [8,10], [7,10], [10,11], [11,17], [12,18], [14, 15], [15,16], [16,17], [17,18], [18,19], [19,20], [14,22], [15,22], [22,23], [16,23], [17,23], [23,24], [18,24], [24,20], [21,26], [22,26], [26,27], [27,28], [23,27], [23,25], [25,28], [24,25], [6,12], [9,11], [11,16], [10,15], [3,5]
];

for (let i = 0; i < vertices.length; i++) {
    grafo.addVertex(vertices[i][0], vertices[i][1]);
}

for (let i = 0; i < edges.length; i++) {
    grafo.addEdge(edges[i][0], edges[i][1]);
}

$(document).ready(function() {
    let origen = document.getElementById("origen");
    let destino = document.getElementById("destino");

    for (value in grafo.vertices) {
        let optionOrigen = document.createElement("option");
        optionOrigen.text = grafo.vertices[value].name;
        optionOrigen.value = grafo.vertices[value].id;
        origen.add(optionOrigen);

        let optionDestino = document.createElement("option");
        optionDestino.text = grafo.vertices[value].name;
        optionDestino.value = grafo.vertices[value].id;
        destino.add(optionDestino);
    }
});

$("#btnBuscarRuta").click(function() {
    let origen = $("#origen").val();
    let destino = $("#destino").val();

    if (origen != null && origen != "" && destino != null && destino != "") {
        if (origen != destino) {
            $("#alert").slideUp(300);
            $("#sectionMapa").html('');
            grafo.bfs(origen, destino);
        } else {
            $("#alert").slideDown(300);
        }
    } else {
        if (origen == null || origen == "") {
            alert("Por favor selecciona un punto de partida.");
        }

        if (destino == null || destino == "") {
            alert("Por favor selecciona un destino.");
        }
    }
});