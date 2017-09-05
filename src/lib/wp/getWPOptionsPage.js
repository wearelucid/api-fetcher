import flattenACF from './flattenACF'
import makeRequest from '../makeRequest'

export default function getWPOptionsPage (config, lang, options = {}) {
  return makeRequest(
    config,
    `/acf/v3/options/${options.slug}?lang=${lang}`,
    { ...options, transforms: [flattenACF, ...(options.transforms || [])] })
}
