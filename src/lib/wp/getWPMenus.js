import axios from 'axios'
import makeRequest from '../makeRequest'

/**
 * Fetch All Menus and embed items
 * Requires wp-api-menus plugin
 */
export default function getWPMenus (config, lang, options = {}) {
  return axios.all([
    makeRequest(config, `/menus/v1/menus${lang ? `?lang=${lang}` : ''}`),
    makeRequest(config, `/menus/v1/locations${lang ? `?lang=${lang}` : ''}`)
  ])
  .then(axios.spread((menuList, locations) => {
    return axios.all(
      menuList.map(m => makeRequest(
        config, 
        `/menus/v1/menus/${m.slug}${lang ? `?lang=${lang}` : ''}`,
        { ...options, transforms: [...(options.transforms || [])] }
      ))
    )
    .then(axios.spread((...menus) => {
      const menuListWithChildren = menuList.map(m => {
        const matchMenu = menus.find((detailedMenu) => detailedMenu.slug === m.slug)
        return {
          ...m,
          items: matchMenu ? matchMenu.items : []
        }
      })

      const menuToBeReturned = {}
      Object.keys(locations).map(l => {
        menuToBeReturned[l] = { ...locations[l] }
        delete menuToBeReturned[l].meta

        // Find the matching menu.
        // Otherwise fall back to match a localized menu like 'main_de' or 'main_fr' by providing the `lang` separated with an underscore. Menu locations in WordPress should be named accordingly!
        // Otherwise return null
        menuToBeReturned[l].menu = menuListWithChildren.find(m => m.slug === menuToBeReturned[l].slug) ||
          menuListWithChildren.find(m => m.slug.startsWith(`${menuToBeReturned[l].slug}_${lang}`)) ||
          null
      })

      return menuToBeReturned
    }))
  }))
}
