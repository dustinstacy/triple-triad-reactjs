import { smallPack, mediumPack, largePack } from '../assets/packs'

export const marketItems = [
    {
        name: 'Common Discovery',
        details: 'Enter Item Description here',
        type: 'discovery',
        contents: { count: 1, chance: 'common' },
        price: 150,
        quantities: [1, 5, 10],
        image: smallPack,
        level: 1,
    },
    {
        name: 'Uncommon Discovery',
        details: 'Enter Item Description here',
        type: 'discovery',
        contents: { count: 1, chance: 'uncommon' },
        price: 400,
        quantities: [1, 5, 10],
        image: mediumPack,
        level: 1,
    },
    {
        name: 'Rare Discovery',
        details: 'Enter Item Description here',
        type: 'discovery',
        contents: { count: 1, chance: 'rare' },
        price: 1000,
        quantities: [1, 5, 10],
        image: largePack,
        level: 1,
    },
]
