import React, {useState, useCallback, useRef } from 'react';
import produce from 'immer'
import Headers from './Styles/style'
import Displays from './Styles/style'
import Grid from './Styles/style'



const App = () => {
  const [bRows, setbRows] = useState(25)
  const [bCols, setbCols] = useState(25)
  const [cellClr, setCellclr] = useState('blue')
  const [speed, setSpeed] = useState(100)
  const [running, setRunning] = useState(false )
  const [generation, setGeneration]= useState(0)
  

//grid span
  const generate = () => {
  const rows = []
  for (let i = 0; i < bRows; i++){
    rows.push(Array.from(Array(bCols), () => 0))
     }
     return rows
    }
//randomly fills the grid
    const randomizer = () => {
      const rows = []
  for (let i = 0; i < bRows; i++){
    rows.push(Array.from(Array(bCols), () => Math.random() > .7 ? 1 : 0
    ))
     }
     setGrid(rows)
    }
  
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

//state
const [grid, setGrid] = useState(generate)

//simulator run conditions 
const runningRef= useRef(running)
runningRef.current = running

//simulator
const runLife = useCallback(
  () => {
    //kill condition
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
                // setGeneration(generation+=1)
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
    {/* <Headers> */}
      <button onClick={() => {
        setRunning(!running)
        if(!running){
          runningRef.current = true
          runLife()
        }}}>{running ? 'Stop' : 'Start'}</button>

      <button onClick={()=> {setGrid(generate())}}>Clear</button>

      <button onClick={()=> {randomizer()}}>Random</button>

    {/* </Headers>
    <Displays> */}
      <div>Generation : {generation}</div>
    {/* </Displays>
    <Grid> */}
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
            backgroundColor: grid[z][a] ? `${cellClr}` : undefined,
            border: 'solid 1px navy'
          }}
          />
        ))
        )}
      </div>
    {/* </Grid> 
    <Adjust>
  
      will have update forms for color, speed and row coll
    </Adjust> */}
    </>
  )
}

export default App


  