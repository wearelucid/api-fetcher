import bundle from './lib/bundle'
import log from './lib/logs'
import makeRequest from './lib/makeRequest'
import getWPMenus from './lib/wp/getWPMenus'
import getWPPostType from './lib/wp/getWPPostType'
import getWPOptionsPage from './lib/wp/getWPOptionsPage'
import applyToOneOrMany from './lib/util/applyToOneOrMany'

function fetcher (bundleName, fetchOptions, config) {
  bundle(bundleName, fetchOptions, config)
}

fetcher.bundle = bundle
fetcher.log = log
fetcher.makeRequest = makeRequest
fetcher.getWPMenus = getWPMenus
fetcher.getWPPostType = getWPPostType
fetcher.getWPOptionsPage = getWPOptionsPage
fetcher.applyToOneOrMany = applyToOneOrMany

export default fetcher
