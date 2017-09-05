import axios from 'axios'
import log from './logs'

/**
 * Create basic GET request
 */
export default function makeRequest (config, path, options = {}) {
  return axios.get(config.apiUrl + path)
  .then((response) => {
    log.request(response.status, ' ' + response.request.path)
    if (options.transforms) {
      const newData = options.transforms.reduce((data, t) => t(data), response.data)
      response.data = newData
    }
    return response.data
  })
  .catch((error) => {
    log.error(error)
    log.error(error.response.status, ' ' + error.request.path)
    // log.error(error.response.statusText, error.response.data)
  })
}
