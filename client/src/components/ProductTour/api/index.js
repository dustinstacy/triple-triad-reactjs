import axios from 'axios'

export const completeUserStartingData = async () => {
    await axios.post('/api/collection/')
    await axios.post('/api/deck/')
}

export const incrementOnboardingStage = async (user) => {
    await axios.put('/api/profile/onboarding', {
        onboardingStage: user.onboardingStage + 1,
    })
}
