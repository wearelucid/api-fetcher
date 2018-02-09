import mkdirp from 'mkdirp'
import log from './logs'
import saveFiles from './saveFiles'
import fetchData from './fetchData'

export default function eachItem (bundleName, fetchOptions, _config) {
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

    return Promise.all(
      data[bundleName].map((item, index) => {
        return saveFiles(item, bundleName, config, item.slug)
      })
    ).then(() => log.success('DONE.'))
  }
}
