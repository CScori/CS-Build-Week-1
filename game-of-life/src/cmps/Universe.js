export default class Universe {
    constructor(generation = 0, liveCells = new Map()){
        this.generation = generation;
        this.liveCells = liveCells;
        this.nextGeneration = new Map();
        this.deadCells = new Map();
    }
//sets the count of new renders based on live neighbors
    getGeneration() {
        return this.generation;
    }
//deermines live cells
    getLiveCells() {
        return this.liveCells;
    }
//verifies cell has valid grid positon
    addCell(position) {
        this.liveCells.set(position.x + " , " + position.y, {x: position.x, y: position.y});
    }
//
    removeCell(position) {
        this.liveCells.delete(position);
    }
    
    isAlive(position) {
        return this.liveCells.has(position);
    }
// stores cell values for checks
    storeCell(position) {
        if(this.isAlive(position.x + " , " + position.y)) {
            this.removeCell(position.x + " , " + position.y);
        } else {
            this.addCell(position);
        }
    
        return new Universe(this.generation, this.liveCells);
    }
//determines if new gens available
    addGeneration(){
        this.liveCells.forEach((item) => {
            this.validNeighbors(item);
        })
    
        this.deadCells.forEach((item) => {
            this.deadNeighbors(item);
        })
    
        this.generation++;
    
        return new Universe(this.generation, this.nextGeneration)
    }
//calculates live neighbors
    validNeighbors(position) {
        let liveNeighbors = 0;
        
        for(let i = position.x - 1; i <= position.x + 1; i++){
            for(let j = position.y - 1; j <= position.y + 1; j++){
                
                if(i === position.x && j === position.y)
                continue;
        
                if(this.isAlive(i + " , " + j)){
                    liveNeighbors++;
                } else {
                    this.deadCells.set(i + " , " +j, {x: i, y: j})
                }
            }
        }
        
        if((liveNeighbors === 2 || liveNeighbors === 3))
            this.nextGeneration.set(position.x + " , " + position.y, {x: position.x, y: position.y});
    }

//determines cell death
    deadNeighbors(position) {
        let liveNeighbors = 0;
    
        for(let i = position.x - 1; i <= position.x + 1; i++){
            for(let j = position.y - 1; j <= position.y + 1; j++){
    
            if(i === position.x && j === position.y)
                continue;
    
            if(this.isAlive(i + " , " + j)){
                liveNeighbors++;
            }
            }
        }
        
        if(liveNeighbors === 3)
            this.nextGeneration.set(position.x + " , " + position.y, {x: position.x, y: position.y});
    }
}