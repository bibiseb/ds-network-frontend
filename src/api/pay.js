import http from '../http/ds-network-api'

export default {
    pay(orderId, payload) {
        return new Promise((resolve, reject) => {
            http.post(`pay/${orderId}`, payload).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        });
    }
}