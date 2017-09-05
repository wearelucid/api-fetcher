# Api fetcher
Generates multiple JSON files from fetching API endpoints (i18n supported) 🚀

## Installation
```
yarn add github.com/wearelucid/api-fetcher#v0.1 #VERIFY
```

## Usage
```
yarn fetch
```

## Example

```
import fetcher from './fetcher'

const config = {
  savePath: './static/data',
  compressJSON: true, // setting this to false may help debugging :-)
  perPage: 5000, // arbitrary
  languages: [
    { lang: 'de', locale: 'de_CH' },
    { lang: 'en', locale: 'en_US' }
  ],
  apiUrl: 'https://your-backend/api'
}

fetcher.log.printText('Lucid')
fetcher.log.printConfig(config)

fetcher.bundle('basic', {
  pages: { method: fetcher.getWPPostType, postType: 'pages', transforms: [removeFieldsFromPost] },
  menus: { method: fetcher.getWPMenus },
  options: { method: fetcher.getWPOptionsPage, slug: 'options' }
}, config)

/**
* Delete fields we don't need (anymore)
*/
function removeFieldsFromPost (data) {
  return fetcher.applyToOneOrMany(_removeFieldsFromPost, data)
}

function _removeFieldsFromPost (data) {
  delete data._links
  return data
}

```

if you want to use it on multiple posts:

```
fetcher.bundle('pro', {
  posts: { method: fetcher.getWPPostType, postType: 'posts', transforms: [removeFieldsFromPost] },
  pages: { method: fetcher.getWPPostType, postType: 'pages', transforms: [removeFieldsFromPost] }
}, config)

posts.de.1.json
posts.de.2.json
posts.de.3.json

fetcher.paginateWP('posts', { endpoint: '/wp/v2/posts' }, config)
fetcher.paginateWP('page', { endpoint: '/wp/v2/posts' }, config)
```
