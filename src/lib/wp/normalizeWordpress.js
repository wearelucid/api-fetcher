import applyToOneOrMany from '../util/applyToOneOrMany'

export default function normalizeWordpress (data) {
  return applyToOneOrMany(_normalizeWordpressPost, data)
}

function _normalizeWordpressPost (post) {
  if (post.title && post.title.rendered) post.title = post.title.rendered
  post.content = post.content && post.content.rendered ? post.content.rendered : false
  return post
}
