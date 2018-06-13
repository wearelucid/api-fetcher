import bundle from './lib/bundle'
import paginate from './lib/paginate'
import eachItem from './lib/eachItem'
import log from './lib/logs'
import makeRequest from './lib/makeRequest'
import getWPMenus from './lib/wp/getWPMenus'
import getWPCategories from './lib/wp/getWPCategories'
import getWPCustomTaxonomy from './lib/wp/getWPCustomTaxonomy'
import getWPPostType from './lib/wp/getWPPostType'
import getWPOptionsPage from './lib/wp/getWPOptionsPage'
import applyToOneOrMany from './lib/util/applyToOneOrMany'

export const fetcher = {
  bundle,
  paginate,
  eachItem,
  log,
  makeRequest,
  getWPMenus,
  getWPCategories,
  getWPCustomTaxonomy,
  getWPPostType,
  getWPOptionsPage,
  applyToOneOrMany,
  test: true
}

export default fetcher
