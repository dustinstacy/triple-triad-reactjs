import { smallPack, mediumPack, largePack } from '../assets/packs'

export const marketItems = [
    {
        name: 'Common Discovery',
        details: 'Enter Item Description here',
        type: 'discovery',
        contents: { count: 1, chance: 'common' },
        price: 150,
        image: smallPack,
        level: 1,
    },
    {
        name: 'Uncommon Discovery',
        details: 'Enter Item Description here',
        type: 'discovery',
        contents: { count: 1, chance: 'uncommon' },
        price: 400,
        image: mediumPack,
        level: 1,
    },
    {
        name: 'Rare Discovery',
        details: 'Enter Item Description here',
        type: 'discovery',
        contents: { count: 1, chance: 'rare' },
        price: 1000,
        image: largePack,
        level: 1,
    },
]
