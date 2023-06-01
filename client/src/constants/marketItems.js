import { commonPack, uncommonPack, rarePack } from '../assets/packs'

export const marketItems = [
    {
        name: 'Common Card',
        image: '',
        type: 'pack',
        level: 2,
        details: 'Enter Item Description here',
        contents: {
            count: 1,
            odds: { Common: 100.0 },
        },
        price: 50,
        quantities: [
            { amount: 1, discount: '0' },
            { amount: 5, discount: '10%' },
            { amount: 10, discount: '15%' },
        ],
    },
    {
        name: 'Uncommon Card',
        image: '',
        type: 'pack',
        level: 4,
        details: 'Enter Item Description here',
        contents: {
            count: 1,
            odds: { Uncommon: 100.0 },
        },
        price: 250,
        quantities: [
            { amount: 1, discount: '0' },
            { amount: 5, discount: '10%' },
            { amount: 10, discount: '15%' },
        ],
    },
    {
        name: 'Rare Card',
        image: '',
        type: 'pack',
        level: 6,
        details: 'Enter Item Description here',
        contents: {
            count: 1,
            odds: { Rare: 100.0 },
        },
        price: 600,
        quantities: [
            { amount: 1, discount: '0' },
            { amount: 5, discount: '10%' },
            { amount: 10, discount: '15%' },
        ],
    },
    {
        name: 'Epic Card',
        image: '',
        type: 'pack',
        level: 8,
        details: 'Enter Item Description here',
        contents: {
            count: 1,
            odds: { Epic: 100.0 },
        },
        price: 1200,
        quantities: [
            { amount: 1, discount: '0' },
            { amount: 5, discount: '10%' },
            { amount: 10, discount: '15%' },
        ],
    },
    {
        name: 'Legendary Card',
        image: '',
        type: 'pack',
        level: 10,
        details: 'Enter Item Description here',
        contents: {
            count: 1,
            odds: { Legendary: 100.0 },
        },
        price: 5000,
        quantities: [
            { amount: 1, discount: '0' },
            { amount: 5, discount: '10%' },
            { amount: 10, discount: '15%' },
        ],
    },
]
