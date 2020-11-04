import authApi from '../api/auth'

export default {
  getUser({ commit }) {
    return new Promise((resolve, reject) => {
      authApi.get().then((user) => {
        commit('setUser', user)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      authApi.login(payload).then((user) => {
        commit('setUser', user)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      authApi.logout().then(() => {
        commit('setUser', null)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  }
}