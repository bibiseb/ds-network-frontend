import http from '../http/ds-network-api'

export default {
    send(payload) {
        return new Promise((resolve, reject) => {
            http.post('contact', payload).then(() => {
                resolve()
            }).catch((error) => {
                reject(error)
            })
        });
    }
}