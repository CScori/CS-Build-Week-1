import React from 'react'

const Customs = (props) => {
    const {setColor,
    setSpeed, setRow, setCol, color, speed,rows, col}= props
    
    
    const handleChange = e => {
     setColor({ color: e.target.value})
     setSpeed({ speed: e.target.value})
     setRow({ row: e.target.value}) 
     setCol({ col: e.target.value})
    }
    const handleSubmit = e => {
      e.preventDefault()

    }
    
    return (
     <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
                Change speed:
                <input className="input" type="text" value={speed} onChange={handleChange} />
              </label>

              <label>
                Change square color:
                <input className="input" type="text" value={color} onChange={handleChange}  />
              </label>
              </div>
              <div> 
               <label>
                Rows:
                <input className="input" type="number" value={rows} onChange={handleChange}  />
              </label>

              <label>
                Columns:
                <input className="input" type="number" value={col} onChange={handleChange}  />
              </label>

              <input type="submit" value="Submit"/>
              </div>
        </form>
            
        </div>
    )
}

export default Customs
