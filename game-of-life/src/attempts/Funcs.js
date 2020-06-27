const generate = (gridSize) => {
    const rows = []
  for (let i = 0; i < gridSize; i++){
    rows.push(Array.from(Array(gridSize).fill(0)))
     }
   return rows
}

const randomizer = (gridSize) => {
    const rows = []
    for (let i = 0; i < bRows; i++){
    rows.push(Array.from(Array(gridSize), () => Math.random() > .7 ? 1 : 0 ))
   }
 setGrid(rows)
}

const operations = [
    [0,1],
    [0,-1],
    [1,-1],
    [-1,1],
    [1,1],
    [-1,-1],
    [1,0],
    [-1,0]
  ]

const isAlive = () => {
    
}