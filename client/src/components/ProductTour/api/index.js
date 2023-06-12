import axios from 'axios'

// Adds empty collection and deck to user's account
export const completeUserStartingData = async () => {
    await axios.post('/api/collection/')
    await axios.post('/api/deck/')
}

export const incrementOnboardingStage = async (userOnboardingStage) => {
    await axios.put('/api/profile/onboarding', {
        onboardingStage: userOnboardingStage + 1,
    })
}
