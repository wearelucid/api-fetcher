import mkdirp from 'mkdirp'
import log from './logs'
import saveFiles from './saveFiles'
import fetchData from './fetchData'

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
       return Promise.all( // resolves an array of promises
         datas.map((data) => { // returns array of all promises from all saveDataToFile()-calls
           return saveDataToFile(data)
         })
       ).then(() => log.success('DONE.')) // is called when all promises are resolved (here: all files are saved)
       // for each lang save files
     })
   } else {
     fetchData(config, false, fetchOptions).then((data) => {
       // if one language, only save this lang
       return saveDataToFile(data)
     })
   }

   /**
    * Save files (in this case paginated)
    */
  function saveDataToFile (data) {
    const itemCount = _config.itemsPerPage ? _config.itemsPerPage : 10 // how many items per page, default 10
    const itemsTotal = data[bundleName].length // itemsTotal (items length)
    const slices = Math.ceil(itemsTotal / itemCount) // round up slices (101 items will be 11 pages – last page with 1 item)
    let from = 0
    const slicesToArray = data[bundleName].slice(from, itemCount) // we need to build an array with the length of our pages, so we can map and return

    return Promise.all(
      slicesToArray.map((a, index) => { // returns array of all promises from all saveDataToFile()-calls
        index += 1
        return saveFiles(
          {
            // custom attributes we can set inside paginatedProps
            paginatedProps: {
              pagesTotal: slices,
              page: index,
              from: from,
              itemCount: itemCount,
              itemsTotal: itemsTotal
            },
            // language will only be used to create the file name
            language: data.language,
            // all items as items correctly sliced
            items: data[bundleName].slice(from, index*itemCount)
          }, bundleName, config, index)
          // iterate from value (like: 0, 10, 20, …)
          // the form/itemCount values will be like (0-10, 10-20, 20-30, …)
          from = from + itemCount
      })
    ).then(() => log.success('DONE.'))
  }
}
