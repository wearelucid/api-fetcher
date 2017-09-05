import flattenACF from './flattenACF'
import normalizeWordpress from './normalizeWordpress'
import makeRequest from '../makeRequest'

export default function getWPPostType (config, lang, options) {
  return makeRequest(
    config,
    `/wp/v2/${options.postType}?per_page=${config.perPage}&lang=${lang}`,
    { ...options, transforms: [flattenACF, normalizeWordpress ...(options.transforms || [])] }
  )
}
