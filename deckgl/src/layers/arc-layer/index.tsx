import React, { useEffect, useMemo, useState } from 'react'
import DeckGL from '@deck.gl/react' // eslint-disable-line
import { scaleQuantile } from 'd3-scale'
import StaticMap from 'react-map-gl'
import { GeoJsonLayer, ArcLayer } from '@deck.gl/layers'

import DATA from '../../assets/arc/counties.json' // eslint-disable-line
const MAP_STYLE =
    'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json'

export const inFlowColors = [
    [255, 255, 204],
    [199, 233, 180],
    [127, 205, 187],
    [65, 182, 196],
    [29, 145, 192],
    [34, 94, 168],
    [12, 44, 132],
]

export const outFlowColors = [
    [255, 255, 178],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    [227, 26, 28],
    [177, 0, 38],
]

const INITIAL_VIEW_STATE = {
    longitude: -100,
    latitude: 40.7,
    zoom: 3,
    maxZoom: 15,
    pitch: 30,
    bearing: 30,
}

function calculateArcs(data: any[], selectedCountry: any) {
    if (!data || !data.length) {
        return null
    }
    if (!selectedCountry) {
        selectedCountry = data.find(
            (f) => f.properties.name === 'Los Angeles, CA'
        )
    }
    const { flows, centroid } = selectedCountry.properties

    const arcs = Object.keys(flows).map((toId) => {
        const f = data[Number(toId)]
        return {
            source: centroid,
            target: f.properties.centroid,
            value: flows[toId],
        }
    })

    const scale = scaleQuantile()
        .domain(arcs.map((a) => Math.abs(a.value)))
        .range(inFlowColors.map((c, i) => i))

    arcs.forEach((a: any) => {
        a.gain = Math.sign(a.value)
        a.quantile = scale(Math.abs(a.value))
    })

    return arcs
}

function getTooltip(d: any) {
    return d?.object?.properties?.name
}

const MyArcLayer: React.FC = () => {
    const data = DATA.features
    const strokeWidth = 1
    const [selectedCountry, selectCountry] = useState<any>(null)
    const arcs = useMemo(() => calculateArcs(data, selectedCountry), [
        data,
        selectedCountry,
    ])

    const layers = [
        new GeoJsonLayer({
            id: 'geojson',
            data,
            stroked: false,
            filled: true,
            getFillColor: [0, 0, 0, 0],
            pickable: true,
            onClick: (data: any) => selectCountry(data?.object),
        }),
        new ArcLayer({
            id: 'arc',
            data: arcs,
            getSourcePosition: (d: any) => d.source,
            getTargetPosition: (d: any) => d.target,
            getSourceColor: (d: any) =>
                (d.gain > 0 ? inFlowColors : outFlowColors)[d.quantile],
            getTargetColor: (d: any) =>
                (d.gain > 0 ? outFlowColors : inFlowColors)[d.quantile],
            getWidth: strokeWidth,
        }),
    ]
    return (
        <>
            <DeckGL
                layers={layers}
                initialViewState={INITIAL_VIEW_STATE}
                controller
                getTooltip={getTooltip}
            >
                <StaticMap reuseMaps mapStyle={MAP_STYLE} />
            </DeckGL>
        </>
    )
}

export default MyArcLayer
