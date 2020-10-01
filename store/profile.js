export const state = () => ({
  profile: {},
  image: null,
  userId: null,
  nameLine: null

})
export const mutations = {
  saveProfile (state, profile) {
    // state.image = profile.userId
    // state.userId = profile.pictureUrl
    // state.nameLine = profile.displayName
    state.profile = profile
  }
}
