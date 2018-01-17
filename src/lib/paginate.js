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
       datas.forEach(saveDataToFile)
       log.success('DONE.')
     })
   } else {
     fetchData(config, false, fetchOptions).then((data) => {
       saveDataToFile(data)
       log.success('DONE.')
     })
   }
  // fetchAllLanguages(config)

  function saveDataToFile (data) {
    const dataClone = cloneDeep(data)
    const count = 10
    const total = dataClone.posts.length
    const slice = Math.ceil(total / count)
    let from = 0
    for (var i = 1; i <= slice; i++) {
      saveFiles(
        {
          total: total,
          from: from,
          count: count,
          language: data.language,
          posts: data.posts.slice(from, i*10)
        }, bundleName, config, i)
      log.info(`${from}, ${count*i} neu`)
      from = from + count
    }

    // creates json for every single post
    // data.posts.forEach(function(post, i) {
    //  saveFiles(data, bundleName, config, i)
    // })
  }
}
