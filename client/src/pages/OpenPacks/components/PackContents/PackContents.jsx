import React from 'react'

import { Button, Card } from '@components'

import './PackContents.scss'

const PackContents = ({ cards, setPackContents }) => (
    <div className='packs-container center'>
        {cards.map((card) => (
            <Card key={card._id} card={card} isShowing />
        ))}
        <Button label='Go Back' onClick={() => setPackContents(null)} />
    </div>
)

export default PackContents
