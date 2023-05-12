import { smallPack, mediumPack, largePack } from '../assets/packs'

export const marketItems = [
    {
        name: 'Common Discovery',
        details: 'Enter Item Description here',
        type: 'discovery',
        contents: { count: 1, chance: 'common' },
        price: 150,
        quantities: [
            { amount: 1, discount: '0' },
            { amount: 5, discount: '10%' },
            { amount: 10, discount: '15%' },
        ],
        image: smallPack,
        level: 1,
    },
    {
        name: 'Uncommon Discovery',
        details: 'Enter Item Description here',
        type: 'discovery',
        contents: { count: 1, chance: 'uncommon' },
        price: 400,
        quantities: [
            { amount: 1, discount: '0' },
            { amount: 5, discount: '10%' },
            { amount: 10, discount: '15%' },
        ],
        image: mediumPack,
        level: 1,
    },
    {
        name: 'Rare Discovery',
        details: 'Enter Item Description here',
        type: 'discovery',
        contents: { count: 1, chance: 'rare' },
        price: 1000,
        quantities: [
            { amount: 1, discount: '0' },
            { amount: 5, discount: '10%' },
            { amount: 10, discount: '15%' },
        ],
        image: largePack,
        level: 1,
    },
]
