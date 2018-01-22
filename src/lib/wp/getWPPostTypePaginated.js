import flattenACF from './flattenACF'
import normalizeWordpress from './normalizeWordpress'
import makeRequest from '../makeRequest'

export default function getWPPostTypePaginated (config, lang, options) {
  console.log('confi', config, options)
  return makeRequest(
    config,
    // TODO use correct entpoint and minify post object
    // currently we use a custom endpoint on feature branch `feature/custom-endpoint`
    `/nuxt/v1/posts`,
    { ...options, transforms: [flattenACF, normalizeWordpress, ...(options.transforms || [])] }
  )
}
