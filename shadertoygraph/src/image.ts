import { Format } from './type'

const FOLDER = '/textures/'

type ImageConfig = {
    name: string
    url: string
    channel: number
    format: Format
}

function createImageConfig(file: string, channel: number): ImageConfig {
    return {
        name: file.split('.')[0],
        url: FOLDER + file,
        channel,
        format: channel === 1 ? 'C1I8' : 'C4I8',
    }
}

export default [
    createImageConfig('Abstract1.jpeg', 3),
    createImageConfig('Abstract2.jpeg', 3),
    createImageConfig('Abstract3.jpeg', 3),
    createImageConfig('Bayer.png', 1),
    createImageConfig('BlueNoise.png', 4),
    createImageConfig('Font1.png', 4),
    createImageConfig('GrayNoiseMedium.png', 1),
    createImageConfig('GrayNoiseSmall.png', 1),
    createImageConfig('Lichen.jpeg', 3),
    createImageConfig('London.jpeg', 3),
    createImageConfig('Nyancat.png', 4),
    createImageConfig('Organic1.jpeg', 3),
    createImageConfig('Organic2.jpeg', 3),
    createImageConfig('Organic3.jpeg', 3),
    createImageConfig('Pebbles.png', 1),
    createImageConfig('RGBANoiseMedium.png', 4),
    createImageConfig('RGBANoiseSmall.png', 4),
    createImageConfig('RockTiles.jpeg', 3),
    createImageConfig('RustyMetal.jpeg', 3),
    createImageConfig('Stars.jpeg', 3),
    createImageConfig('Wood.jpeg', 3),
]
