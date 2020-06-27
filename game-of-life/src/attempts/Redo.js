import React, {useState, useCallback, useRef } from 'react';
import produce from 'immer'
import {Switch, Route, NavLink} from 'react-router-dom'
import Customs from './Customs'
import Rules from '../cmps/Rules'
import Headers from './Styles/style'
import Displays from './Styles/style'
import Grid from './Styles/style'
import './App.css'



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
const [grid, setGrid] = useState(() => {
  return generate()
})

//simulator run conditions 
const runningRef= useRef(running)
runningRef.current = running

//simulator
const runLife = useCallback(() => {
    //kill condition
    if(!runningRef.current){
      return
    }
    setGrid((cg) => {
      //going through grid start
      return produce(cg, gridCopy => {
        for(let i=0; i< bRows; i++){
          for(let j=0; i< bCols; j++){
            let neighbors = 0
            //calculating neighbors 
            operations.forEach(([x,y]) => {
              const newI = i+x
              const newJ = j+y
              if(newI >= 0 && newI < bRows && newJ >=0 && newJ < bCols){
                neighbors += cg[newI][newJ]
              }
            })
            //live or die determine
            if (cg[i][j] === 1)
            {if (neighbors < 2 || neighbors > 3){
              gridCopy[i][j] = 0
            } else if(cg[i][j] === 0 && neighbors === 3){
              gridCopy[i][j] = 1
              
            } }
          }
        }
        setGeneration(generation += 1)
      })
    })
    
    setTimeout(runLife, 100)
  }, [bCols, bRows, speed])



  return (
    <>
    
    {/* <Headers> */}
      <button onClick={() => {
        console.log('is it running', running)
        setRunning(!running)
        if(!running){
          runningRef.current = true
          runLife()
        }}}>{running ? 'Stop' : 'Start'}</button>

      <button onClick={()=> {setGrid(generate())}}>Clear</button>

      <button onClick={()=> {randomizer()}}>Random</button>

    {/* </Headers>
    <Displays> */}
      <div>
        Generation : {generation} 
        
      </div>
    {/* </Displays>*/}
      <div style={{
        display:'grid',
        gridTemplateColumns: `repeat(${bCols},20px)`
      }}>
        {grid.map((rows, i) =>
        rows.map((cols, j) => (
          <div
          key={`${i}-${j}`}
          onClick={() =>{
            const newGrid = produce(grid, gridCopy => {
              gridCopy[i][j] = grid[i][j] ? 0 : 1
            })
            setGrid(newGrid)
          }}
          style={{
            width: 20,
            height: 20,
            backgroundColor: grid[i][j] ? `${cellClr}` : undefined,
            border: 'solid 1px navy'
          }}
          />
        ))
        )}
      </div>
    {/*  
    <Adjust>
  
      will have update forms for color, speed and row coll
    </Adjust> */}
    <Customs
    setColor={setCellclr}
    setSpeed={setSpeed}
    setRow={setbRows}
    setCol={setbCols}
    color={cellClr}
    speed={speed}
    rows={bRows}
    col={bCols}

    />
    <Rules/>
    </>
  )
}

export default App


  