import axios from 'axios'
import makeRequest from '../makeRequest'

/**
 * Fetch All Menus and embed items
 * Requires wp-api-menus plugin
 */
export default function getWPMenus (config, lang) {
  return axios.all([
    makeRequest(config, `/wp-api-menus/v2/menus?lang=${lang}`),
    makeRequest(config, `/wp-api-menus/v2/menu-locations?lang=${lang}`)
  ])
  .then(axios.spread((menuList, locations) => {
    return axios.all(
      menuList.map(m => makeRequest(config, `/wp-api-menus/v2/menus/${m.ID}?lang=${lang}`))
    )
    .then(axios.spread((...menus) => {
      const menuListWithChildren = menuList.map(m => {
        const matchMenu = menus.find((detailedMenu) => detailedMenu.ID === m.ID)
        return {
          ...m,
          items: matchMenu ? matchMenu.items : []
        }
      })

      const obj = {}
      Object.keys(locations).map(l => {
        obj[l] = { ...locations[l] }
        delete obj[l].meta
        obj[l].menu = menuListWithChildren.find(m => m.ID === obj[l].ID) || false
      })

      return obj
    }))
  }))
}
