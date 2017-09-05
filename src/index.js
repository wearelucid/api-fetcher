import bundle from './lib/bundle'
import log from './lib/logs'
import makeRequest from './lib/makeRequest'
import getWPMenus from './lib/wp/getWPMenus'
import getWPPostType from './lib/wp/getWPPostType'
import getWPOptionsPage from './lib/wp/getWPOptionsPage'
import applyToOneOrMany from './lib/util/applyToOneOrMany'

export const fetcher = {
  bundle,
  log,
  makeRequest,
  getWPMenus,
  getWPPostType,
  getWPOptionsPage,
  applyToOneOrMany,
  test: true
}

export default fetcher
