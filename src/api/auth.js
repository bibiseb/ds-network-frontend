import http from '../http/ds-network-api'

export default {
  login(payload) {
    return new Promise((resolve, reject) => {
      http.post('auth', payload).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    });
  },
  get() {
    return new Promise((resolve, reject) => {
      http.get('auth').then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    });
  },
  logout() {
    return new Promise((resolve, reject) => {
      http.delete('auth').then(() => {
        resolve()
      }).catch((error) => {
        reject(error)
      })
    });
  }
}