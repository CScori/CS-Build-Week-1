import React, {useState } from 'react';
import produce from 'immer'


const bRows = 25
const bCols = 25

const App = () => {

const generate = () => {
  const rows = []
  for (let i = 0; i < bRows; i++){
    rows.push(Array.from(Array(bCols), () => 0))
     }
     return rows
    }

const [grid, setGrid] = useState(generate)
console.log('grid', grid)
  return (
    <div style={{
      display:"grid",
      gridTemplateColumns: `repeat(${bCols},20px)`
    }}>
      {grid.map((rows, z) =>
      rows.map((cols, a) => (
        <div
        key={`${z}-${a}`}
        onClick={() =>{
          setGrid(produce())
        }}
        style={{
          width: 20,
          height: 20,
          backgroundColor: grid[z][a] ? "red" : undefined,
          border: 'solid 1px navy'
        }}
        />
      ))
      )}
    </div>
  )
}

export default App


  