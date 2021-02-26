export const state = () => ({
    profileData: {}

})
export const mutations = {
    saveProfile (state, profile) {
        state.profileData = profile
    }
}
