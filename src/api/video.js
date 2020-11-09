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
    play(videoId) {
        return new Promise((resolve, reject) => {
            http.post(`videos/${videoId}/play`).then(() => {
                resolve()
            }).catch((error) => {
                reject(error)
            })
        });
    }
}