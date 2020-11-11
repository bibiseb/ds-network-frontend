import http from '../http/ds-network-api'

export default {
    get() {
        return new Promise((resolve, reject) => {
            http.get('videos').then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        });
    },
    authorize(videoId) {
        return new Promise((resolve, reject) => {
            http.post(`video/${videoId}/authorize`).then(() => {
                resolve()
            }).catch((error) => {
                reject(error)
            })
        });
    }
}