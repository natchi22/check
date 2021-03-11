import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
    new VuexPersistence({
        key: 'check',
        reducer: (state) => ({
            auth: state.auth,
        }),
    }).plugin(store)
}
