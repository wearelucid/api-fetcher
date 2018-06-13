import makeRequest from '../makeRequest'

export default function getWPCategories (config) {
    
  // TODO: Check if categories can be fetched by language as well
  return makeRequest(
    config, 
    '/wp/v2/categories'
  ).then((data) => {
    return data
  })
}