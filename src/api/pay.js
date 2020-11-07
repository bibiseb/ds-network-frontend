import http from '../http/ds-network-api'

export default {
    pay(payload) {
        return new Promise((resolve, reject) => {
            http.post('pay', payload).then(() => {
                resolve()
            }).catch((error) => {
                reject(error)
            })
        });
    }
}