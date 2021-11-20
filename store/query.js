export const state = () => ({
  query: null,
})

export const mutations = {
  setQuery(state, query) {
    state.query = query
  },

  setFeatures(state, features) {
    if (!state.query) {
      throw new Error('You need to select dates first')
    }

    state.query.features = features
  },

  reset(state) {
    state.query = {
      date: '',
      timeStart: '',
      timeEnd: '',
      features: [],
    }
  },
}
