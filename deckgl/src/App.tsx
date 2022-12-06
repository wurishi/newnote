import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ArcLayer from './layers/arc-layer'
import ContourLayer from './layers/contour-layer'

function App() {
    return (
        <div className="App">
            <ContourLayer />
        </div>
    )
}

export default App
