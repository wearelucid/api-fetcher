import applyToOneOrMany from '../util/applyToOneOrMany'

export default function normalizeWordpress (data) {
  return applyToOneOrMany(_normalizeWordpressPost, data)
}

function _normalizeWordpressPost (post) {
  if (post.title && post.title.rendered) post.title = post.title.rendered
  if (post.content && post.content.rendered) post.content = post.content.rendered
  return post
}
