export const state = () => ({
  booking: null,
})

export const mutations = {
  createBooking(state, { place, date, timeStart, timeEnd }) {
    state.booking = {
      place,
      date,
      timeStart,
      timeEnd,
    }
  },

  reset(state) {
    state.places = places
  },
}
