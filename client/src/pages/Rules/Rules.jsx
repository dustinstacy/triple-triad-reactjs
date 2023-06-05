import React from 'react'

import { useGlobalContext } from '@context'
import { ProductTour } from '@components'
import { howToPlay } from '@constants'

import './Rules.scss'

const Rules = () => {
    const { user } = useGlobalContext()
    const stage = user?.onboardingStage

    return (
        <div className='rules page'>
            {stage === 3 && <ProductTour step={5} />}
            {howToPlay.map((panel) => (
                <div key={panel.header} className='panel'>
                    <h1>{panel.header}</h1>
                    <div className='panel-body'>
                        {panel.body.map((section) => (
                            <div key={section.title} className='panel-section'>
                                <h2>{section.title}</h2>
                                <ul className='panel-section-content'>
                                    {section.content.map((content, i) => (
                                        <li key={content.line.slice(0, 10)}>
                                            {content.line}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Rules
