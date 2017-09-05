import applyToOneOrMany from '../util/applyToOneOrMany'

export default function flattenACF (data) {
  return applyToOneOrMany(_flattenPost, data)
}

function _flattenPost (post) {
  const flatPost = { ...post, ...post.acf }
  delete flatPost.acf
  return flatPost
}
