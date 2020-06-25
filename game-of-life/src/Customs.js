import React from 'react'

const Customs = (props) => {
    const {setColor,
    setSpeed, setRow, setCol, color, speed,rows, col}= props
    
    
    const handleChange = e => {

    }
    
    return (
     <div>
        <form>
        <label>
                Rows:
                <input className="input" type="text" value={rows} onChange={setRow} />
              </label>

              <label>
                Columns:
                <input className="input" type="text" value={cols} onChange={setCol} />
              </label>

              <label>
                Change speed:
                <input className="input" type="text" value={speed} onChange={setSpeed} />
              </label>

              <label>
                Change square color:
                <input className="input" type="text" value={color} onChange={setColor} />
              </label>
        </form>
            
        </div>
    )
}

export default Customs
