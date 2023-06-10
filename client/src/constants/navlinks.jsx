import {
    GiAbstract062,
    GiAbstract021,
    GiAbstract088,
    GiAbstract112,
    GiAbstract120,
    GiAbstract116,
} from 'react-icons/gi'

// The case of the names is intentionally varied to achieve different letter stylings
const navlinks = [
    {
        name: 'HoMe',
        path: '/',
        image: <GiAbstract021 />,
    },
    {
        name: 'BAttLe',
        path: '/opponentSelect',
        image: <GiAbstract088 />,
    },
    {
        name: 'COlleCtiON',
        path: '/collection',
        image: <GiAbstract062 />,
    },
    {
        name: 'MarKet',
        path: '/market',
        image: <GiAbstract120 />,
    },
    {
        name: 'OpeN PacKs',
        path: '/packs',
        image: <GiAbstract112 />,
    },
    {
        name: 'HoW to pLAy',
        path: '/rules',
        image: <GiAbstract116 />,
    },
]

export default navlinks
