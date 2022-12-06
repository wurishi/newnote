import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ArcLayer from './layers/arc-layer'
import ContourLayer from './layers/contour-layer'
import GeoJsonLayer from './layers/geojson'

function App() {
    return (
        <div className="App">
            <GeoJsonLayer />
        </div>
    )
}

export default App
