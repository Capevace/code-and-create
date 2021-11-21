export const state = () => ({
  places: null,
})

export const mutations = {
  setPlaces(state, places) {
    state.places = places
  },

  reset(state) {
    state.places = []
  },
}
