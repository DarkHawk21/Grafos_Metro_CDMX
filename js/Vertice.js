class Vertice {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.neighbors = [];
    };
    
    addNeighbour(neighbour) {
        if (!this.neighbors.includes(neighbour)) {
            this.neighbors.push(neighbour);
            this.neighbors.sort((a, b) => a - b);
        }
    }
}
