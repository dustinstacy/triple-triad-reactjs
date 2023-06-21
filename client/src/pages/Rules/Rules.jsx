import React from 'react'

import { howToPlay } from '@constants'
import { useGlobalContext } from '@context'

import './Rules.scss'

const Rules = () => {
    const { user } = useGlobalContext()
    const stage = user?.onboardingStage ?? {}

    return (
        <div className='rules page center'>
            {howToPlay.map((panel) => (
                <div key={panel.header} className='panel center-column'>
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
