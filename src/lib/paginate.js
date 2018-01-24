import mkdirp from 'mkdirp'
import log from './logs'
import saveFiles from './saveFiles'
import fetchData from './fetchData'
import cloneDeep from 'lodash.clonedeep'

export default function paginate (bundleName, fetchOptions, _config) {
  const config = {
    savePath: './data',
    ..._config
  }

  /**
   * Create directory (synchronously)
   */
  mkdirp(config.savePath, function (err) {
    if (err) return console.error(err)
    log.success(`${config.savePath} created successfully!`)
  })

  /**
   * Fetch all languages
   */
   if (config.languages && config.languages.length) {
     Promise.all(
       config.languages.map(language => fetchData(config, language, fetchOptions))
     ).then((datas) => {
       // for each lang save files
       datas.forEach(saveDataToFile)
       log.success('DONE.')
     })
   } else {
     fetchData(config, false, fetchOptions).then((data) => {
       // if one language, only save this lang
       saveDataToFile(data)
       log.success('DONE.')
     })
   }

   /**
    * Save files (in this case paginated)
    */
  function saveDataToFile (data) {
    const dataClone = cloneDeep(data) // deep clone the data in order to do calculations
    const itemCount = _config.postsPerPage ? _config.postsPerPage : 10 // how many posts per page, default 10
    const itemsTotal = dataClone[bundleName].length // itemsTotal posts length
    const slice = Math.ceil(itemsTotal / itemCount) // round up slices (101 posts will be 11 pages – last page with 1 post)
    let from = 0
    for (var i = 1; i <= slice; i++) {
      // if provied a pagination (i) the file will be saved paginated.
      saveFiles(
        {
          // custom attributes we can set inside postsInformation
          paginatedProps: {
            pagesTotal: slice,
            page: i,
            from: from,
            itemCount: itemCount,
            itemsTotal: itemsTotal
          },
          // language will only be used to create the file name
          language: data.language,
          // all posts as items correctly sliced
          items: data[bundleName].slice(from, i*itemCount)
        }, bundleName, config, i)
      // iterate from value (like: 0, 10, 20, …)
      // the form/itemCount values will be like (0-10, 10-20, 20-30, …)
      from = from + itemCount
    }
  }
}
