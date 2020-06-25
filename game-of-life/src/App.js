import React, {useState } from 'react';

import './App.scss';

import React from 'react'

const bRows = 50
const bCols = 50

const App = () => {


const [grid, setGrid] = useState(() => {
  const rows = []
  for (let i = 0; i < bRows; i++){
    rows.push(Array.from(Array(bCols), () => 0))
}})


  return (
    <div>
      
    </div>
  )
}

export default App


  