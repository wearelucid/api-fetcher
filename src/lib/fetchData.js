import axios from 'axios'
import makeRequest from './makeRequest'
import log from './logs'

/**
 * Fetch data
 */
export default function fetchData (config, language, fetchRoutes) {
  const { lang, locale } = language
  /**
   * Make All Requests
   */
  return axios.all(
    Object.keys(fetchRoutes).map(f => {
      const { method, endpoint } = fetchRoutes[f]
      if (typeof method === 'function') {
        return method(config, lang, fetchRoutes[f])
      } else if (endpoint) {
        return makeRequest(config, endpoint)
      } else {
        return log.error(`No route found for: "${f}"`)
      }
    })
  )
  .then((_results) => {
    const results = {}

    Object.keys(fetchRoutes).map((f, i) => {
      results[f] = _results[i]
    })

    return {
      dateGenerated: Date.now(),
      dateGeneratedHuman: new Date().toISOString().slice(0, 19).replace('T', ' '),
      apiUrl: config.apiUrl,
      language: lang,
      locale,
      ...results
    }
  })
}
