function resolveApiBaseURL() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/'
  }

  return 'https://api.ds-network.be/'
}

function resolveVideosBaseURL() {
  return 'https://videos.ds-network.be/'
}

export default {
  api: {
    baseURL: resolveApiBaseURL()
  },
  videos: {
    baseURL: resolveVideosBaseURL()
  }
}