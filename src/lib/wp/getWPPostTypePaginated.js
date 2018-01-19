import flattenACF from './flattenACF'
import normalizeWordpress from './normalizeWordpress'
import makeRequest from '../makeRequest'

export default function getWPPostTypePaginated (config, lang, options) {
  console.log('confi', config, options)
  return makeRequest(
    config,
    `/nuxt/v1/posts`,
    { ...options, transforms: [flattenACF, normalizeWordpress, ...(options.transforms || [])] }
  )
}
