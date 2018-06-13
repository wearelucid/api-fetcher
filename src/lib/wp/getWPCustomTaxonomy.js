import makeRequest from '../makeRequest'

export default function getWPCustomTaxonomy (config, lang, options = {}) {
  console.log('options: ', options)
  // TODO: Check if categories can be fetched by language as well
  return makeRequest(
    config, 
    `/wp/v2/${options.taxonomy}`
  ).then((data) => {
    return data
  })
}