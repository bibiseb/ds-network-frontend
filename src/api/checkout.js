import http from '../http/ds-network-api'

export default {
    order(payload) {
        return new Promise((resolve, reject) => {
            http.post('checkout', payload).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        });
    },
    view(orderId) {
        return new Promise((resolve, reject) => {
            http.get(`checkout/${orderId}`).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        });
    },
    own(orderId) {
        return new Promise((resolve, reject) => {
            http.patch(`checkout/${orderId}`).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        });
    }
}