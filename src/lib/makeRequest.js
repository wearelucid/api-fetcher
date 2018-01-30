import axios from 'axios'
import log from './logs'

/**
 * Create basic GET request
 */
export default function makeRequest (config, path, options = {}) {
  return axios.get(config.apiUrl + path)
  .then((response) => {
    log.request(response.status, ' ' + response.request.path)
    if (options.filters) {
      const filteredData = options.filters.reduce((data, filter) => filter(data), response.data)
      response.data = filteredData
    }
    if (options.transforms) {
      const transformedData = options.transforms.reduce((data, transform) => transform(data), response.data)
      response.data = transformedData
    }
    return response.data
  })
  .catch((error) => {
    log.error(error)
    log.error(error.response.status, ' ' + error.request.path)
    // log.error(error.response.statusText, error.response.data)
  })
}
