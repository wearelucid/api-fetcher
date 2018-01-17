import mkdirp from 'mkdirp'
import log from './logs'
import saveFiles from './saveFiles'
import fetchData from './fetchData'

export default function bundle (bundleName, fetchOptions, _config) {
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

  function saveDataToFile (data) {
    saveFiles(data, bundleName, config)
  }
}
