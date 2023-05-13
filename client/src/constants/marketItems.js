import { smallPack, mediumPack, largePack } from '../assets/packs'

export const marketItems = [
    {
        name: 'Beginner Discovery',
        type: 'discovery',
        contents: { count: 1, chance: 'common' },
        image: smallPack,
        level: 1,
        details: 'Enter Item Description here',
        price: 150,
        quantities: [
            { amount: 1, discount: '0' },
            { amount: 5, discount: '10%' },
            { amount: 10, discount: '15%' },
        ],
    },
    {
        name: 'Novice Discovery',
        type: 'discovery',
        contents: { count: 1, chance: 'uncommon' },
        image: mediumPack,
        level: 3,
        details: 'Enter Item Description here',
        price: 400,
        quantities: [
            { amount: 1, discount: '0' },
            { amount: 5, discount: '10%' },
            { amount: 10, discount: '15%' },
        ],
    },
    {
        name: 'Amateur Discovery',
        type: 'discovery',
        contents: { count: 1, chance: 'rare' },
        image: largePack,
        level: 5,
        details: 'Enter Item Description here',
        price: 1000,
        quantities: [
            { amount: 1, discount: '0' },
            { amount: 5, discount: '10%' },
            { amount: 10, discount: '15%' },
        ],
    },
]
