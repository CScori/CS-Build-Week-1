import React from 'react'
import Data from './GridData'

const Display = () => {
    return (
        <div>
            {Data.map(cell, i) => (
                <div></div>
            )}
        </div>
    )
}

export default Display
