import http from '../http/ds-network-api'

export default {
  get() {
    return new Promise((resolve, reject) => {
      http.get('todos').then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    });
  },
  create(payload) {
    return new Promise((resolve, reject) => {
      http.post('todos', payload).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    });
  },
  update(todoId, payload) {
    return new Promise((resolve, reject) => {
      http.patch(`todos/${todoId}`, payload).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    });
  },
  remove(todoId) {
    return new Promise((resolve, reject) => {
      http.delete(`todos/${todoId}`).then(() => {
        resolve()
      }).catch((error) => {
        reject(error)
      })
    });
  }
}