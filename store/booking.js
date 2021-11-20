export const state = () => ({
  booking: null,
})

export const mutations = {
  createBooking(state, { place, date, timeStart, timeEnd, user }) {
    state.booking = {
      place,
      date,
      timeStart,
      timeEnd,
      user: user || null,
    }
  },

  reset(state) {
    state.places = places
  },
}
