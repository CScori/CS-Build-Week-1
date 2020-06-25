import React, {useState, useCallback, useRef } from 'react';
import produce from 'immer'


const bRows = 25
const bCols = 25

const App = () => {
  const bRows = 25
  const bCols = 25
  // neigbor checks
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
//might change to usestate later
//grid span
  const generate = () => {
  const rows = []
  for (let i = 0; i < bRows; i++){
    rows.push(Array.from(Array(bCols), () => 0))
     }
     return rows
    }

    const randomizer = () => {
      const rows = []
  for (let i = 0; i < bRows; i++){
    rows.push(Array.from(Array(bCols), () => Math.random() > .7 ? 1 : 0
    ))
     }
     setGrid(rows)
    }
  

const [grid, setGrid] = useState(generate)
const [running, setRunning] = useState(false )


const runningRef= useRef(running)
runningRef.current = running

//kill condition
const runLife = useCallback(
  () => {
    if(!runningRef.current){
      return
    }
    setGrid((g) => {
      //going through grid start
      return produce(g, gridCopy => {
        for(let i=0; i<bRows; i++){
          for(let j=0; i<bCols; j++){
            let neighbors = 0
            //calculating neighbors 
            operations.forEach(([x,y]) => {
              const newI = i+x
              const newJ = j+y
              if(newI >= 0 && newI< bRows && newJ >=0 && newJ < bCols){
                neighbors += g[newI][newJ]
              }
            })
            //live or die determine
            if (neighbors < 2 || neighbors > 3){
              gridCopy[i][j] = 0
            } else if(g[i][j] === 0 && neighbors === 3){
              gridCopy[i][j] = 1
            } 
          }
        }
      })
    })
    
    setTimeout(runLife, 100)
  }, [])


  return (
    <>
    <Headers>
      <button onClick={() => {
        setRunning(!running)
        if(!running){
          runningRef.current = true
          runLife()
        }}}>Start</button>

      <button onClick={()=> {
        setGrid(generate())}}>Clear</button>

      <button onClick={()=> {
        randomizer()}}>Random</button>

    </Headers>
    <Displays>
      <div>Generation : {}</div>
    </Displays>
    <Grid>
      <div style={{
        display:"grid",
        gridTemplateColumns: `repeat(${bCols},20px)`
      }}>
        {grid.map((rows, z) =>
        rows.map((cols, a) => (
          <div
          key={`${z}-${a}`}
          onClick={() =>{
            const newGrid = produce(grid, gridCopy => {
              gridCopy[z][a] = grid[z][a] ? 0 : 1
            })
            setGrid(newGrid)
          }}
          style={{
            width: 20,
            height: 20,
            backgroundColor: grid[z][a] ? "blue" : undefined,
            border: 'solid 1px navy'
          }}
          />
        ))
        )}
      </div>
    </Grid>
    
    
    </>
  )
}

export default App


  