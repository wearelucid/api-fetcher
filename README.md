# Api fetcher
Generates multiple JSON files from fetching API endpoints (i18n supported) 🚀

## Installation
```bash
yarn add git+ssh://git@github.com:wearelucid/vue-mq#1.0.7
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
  "fetch": "babel-node --presets env -- fetchData.js"
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
  postsPerPage: 10, // set for paginated posts (default will automatically be 10)
  languages: [
    { lang: 'de', locale: 'de_CH' },
    { lang: 'en', locale: 'en_US' }
  ],
  apiUrl: 'https://your-backend/api'
}

fetcher.log.printText('Lucid')
fetcher.log.printConfig(config)

// fetch paginated posts
fetcher.paginate('posts', { posts: { method: fetcher.getWPPostType, postType: 'posts', transforms: [removeFieldsFromPost] } },

// fetch bundled data
fetcher.bundle('basic', {
  pages: { method: fetcher.getWPPostType, postType: 'pages', transforms: [removeFieldsFromPost], filters: [showOnlyPublished] },
  menus: { method: fetcher.getWPMenus },
  options: { method: fetcher.getWPOptionsPage, slug: 'options' }
}, config)

/**
* Filter (Note: This filter is an example. It is not needed. Wordpress by default only delivers published posts and pages)
*/
function showOnlyPublished (data) {
  return (data && data.length) ? data.filter(p => p.status === 'publish') : data
}

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

### Generating Paginated Collections
You can also generated paginated collections like so
```javascript
fetcher.paginate('posts', { posts: { method: fetcher.getWPPostType, postType: 'posts', transforms: [removeFieldsFromPost] } }, config)
fetcher.paginate('pages', { pages: { method: fetcher.getWPPostType, postType: 'pages', transforms: [removeFieldsFromPost] } }, config)
```
Default posts per page will be set to `10`.
You can provide the variable `postsPerPage` inside your config.
```
postsPerPage: 10
```
This will generate a collection of json files:
```bash
posts.de.1.json
posts.de.2.json
posts.de.3.json
```
