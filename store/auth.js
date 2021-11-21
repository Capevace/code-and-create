export const state = () => {
  let user = null

  if (typeof window !== 'undefined') {
    const userJSON = window.localStorage.getItem('user')
    if (userJSON) {
      user = JSON.parse(userJSON)
    }

    console.log(user)
  }

  return {
    user: user,
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user

    window.localStorage.setItem('user', JSON.stringify(user))
  },

  //   reset(state) {
  //     state.user = null
  //     window.localStorage.removeItem('user')
  //   },
}
