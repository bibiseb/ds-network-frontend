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
    }
}