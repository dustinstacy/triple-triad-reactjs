import { commonPack, uncommonPack, rarePack } from '../assets/packs'

export const marketItems = [
    {
        name: 'Common Pack',
        type: 'pack',
        contents: { count: 1, chance: 'common' },
        image: commonPack,
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
        name: 'Uncommon Pack',
        type: 'pack',
        contents: { count: 1, chance: 'uncommon' },
        image: uncommonPack,
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
        name: 'Rare Pack',
        type: 'pack',
        contents: { count: 1, chance: 'rare' },
        image: rarePack,
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
