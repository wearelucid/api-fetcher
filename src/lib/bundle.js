import fs from 'fs'
import mkdirp from 'mkdirp'
import log from './logs'
import fetchData from './fetchData'

export default function bundle (bundleName, fetchOptions, _config) {
  const config = {
    languages: [{ lang: 'en', locale: 'en_US' }],
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
      datas.forEach(saveFile)
      log.success('DONE.')
    })
  } else {
    fetchData(config, false, fetchOptions).then((data) => {
      saveFile(data)
      log.success('DONE.')
    })
  }

  function saveFile (data) {
    const json = JSON.stringify(data, null, config.compressJSON ? null : 2)
    const jsonSizeKB = (Math.round((Buffer.byteLength(json, 'utf8') / 1024) * 100)) / 100
    const fileName = `${bundleName}${data.language ? `.${data.language}` : ''}.json`

    log.info(`Writing ${fileName} (Length: ${json.length}, Size: ${jsonSizeKB}kB)`)

    fs.writeFile(
      `${config.savePath}/${fileName}`,
      json,
      'utf-8',
      function (err) {
        if (err) return console.error(err)
        log.success(`Wrote to ${config.savePath}/${fileName} successfully!`)
      }
    )
  }
}
