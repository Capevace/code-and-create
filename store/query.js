export const state = () => ({
  query: {
    date: '2021-11-19',
    timeStart: '14:20',
    timeEnd: '16:20',
    features: ['Drucker'],
  },
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
