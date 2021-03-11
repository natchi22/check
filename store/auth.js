export const state = () => ({
    sessionToken: null,
    refreshToken: null,
})

export const mutations = {
    setToken(state, authData) {
        state.sessionToken = authData.sessionToken
        state.refreshToken = authData.refreshToken
    },
    resetToken(state) {
        state.sessionToken = null
        state.refreshToken = null
    },
}
