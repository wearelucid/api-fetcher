import axios from 'axios'
import makeRequest from '../makeRequest'

/**
 * Fetch All Menus and embed items
 * Requires wp-api-menus plugin
 */
export default function getWPMenus (config, lang) {
  return axios.all([
    makeRequest(config, `/menus/v1/menus${lang ? `?lang=${lang}` : ''}`),
    makeRequest(config, `/menus/v1/locations${lang ? `?lang=${lang}` : ''}`)
  ])
  .then(axios.spread((menuList, locations) => {
    return axios.all(
      menuList.map(m => makeRequest(config, `/menus/v1/menus/${m.slug}${lang ? `?lang=${lang}` : ''}`))
    )
    .then(axios.spread((...menus) => {
      const menuListWithChildren = menuList.map(m => {
        const matchMenu = menus.find((detailedMenu) => detailedMenu.slug === m.slug)
        return {
          ...m,
          items: matchMenu ? matchMenu.items : []
        }
      })

      const obj = {}
      Object.keys(locations).map(l => {
        obj[l] = { ...locations[l] }
        delete obj[l].meta
        obj[l].menu = menuListWithChildren.find(m => m.slug === obj[l].slug) || false
      })

      return obj
    }))
  }))
}
