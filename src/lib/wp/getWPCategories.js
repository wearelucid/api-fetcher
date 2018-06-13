import makeRequest from '../makeRequest'

export default function getWPCategories (config, lang, options = {}) {
  return makeRequest(
    config, 
    '/wp/v2/categories'
  )
}