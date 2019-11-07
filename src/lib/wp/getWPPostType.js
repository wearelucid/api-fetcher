import normalizeWordpress from './normalizeWordpress'
import makeRequest from '../makeRequest'

export default function getWPPostType (config, lang, options) {
  let additionalQueryParams = ''
  if (options.additionalQueryParams) {
    additionalQueryParams = options.additionalQueryParams.reduce((acc, cur) => {
      return `${acc}&${cur.key}=${cur.value}`
    }, '')
  }
  const requestUrl = `/wp/v2/${options.postType}?per_page=${config.perPage}${lang ? `&lang=${lang}` : ''}${additionalQueryParams}`
  return makeRequest(
    config,
    requestUrl,
    { ...options, transforms: [normalizeWordpress, ...(options.transforms || [])] }
  )
}
