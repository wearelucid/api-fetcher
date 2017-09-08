# Api fetcher
Generates multiple JSON files from fetching API endpoints (i18n supported) 🚀

## Installation
```bash
yarn add git+ssh://git@github.com:wearelucid/vue-mq#1.0.4
```

## Usage
Be aware that this package uses ES6 syntax!

Add a script to your package.json
```JSON
"scripts": {
  "fetch": "node fetchData.js"
}
```
Since node currently does not support es2015 module syntax, we need to install [`babel-cli`](https://yarnpkg.com/en/package/babel-cli) and add the script like so:
```JSON
"scripts": {
  "fetch": "babel-node --presets es2015 -- fetchData.js"
}
```

```bash
yarn fetch
```

## Example

### Full Example (Wordpress)

```javascript
import fetcher from 'api-fetcher'

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

### Generating Multiple Bundles
If you want to generate multiple json bundles you can invoke `fetcher.bundle()` with different a name like so:

```javascript
fetcher.bundle('pro', {
  posts: { method: fetcher.getWPPostType, postType: 'posts', transforms: [removeFieldsFromPost] },
  pages: { method: fetcher.getWPPostType, postType: 'pages', transforms: [removeFieldsFromPost] }
}, config)
```

### TODO: Generating Paginated Collections
You can also generated paginated collections like so
```javascript
fetcher.paginateWP('posts', { endpoint: '/wp/v2/posts' }, config)
fetcher.paginateWP('page', { endpoint: '/wp/v2/posts' }, config)
```
This will generate a collection of json files:
```bash
posts.de.1.json
posts.de.2.json
posts.de.3.json
```
