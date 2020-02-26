import makeRequest from '../makeRequest'

export default function getWPCustomTaxonomy (config, lang, options = {}) {
  return makeRequest(
    config, 
    `/wp/v2/${options.taxonomy}${lang ? `?lang=${lang}` : ''}`,
    { ...options, transforms: [...(options.transforms || [])] }
  )
}