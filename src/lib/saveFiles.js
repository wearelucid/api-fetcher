import log from './logs'
import fs from 'fs'

/**
 * Save files
 */
export default function saveFiles (data, bundleName, config, pageNumber) {
  const json = JSON.stringify(data, null, config.compressJSON ? null : 2)
  const jsonSizeKB = (Math.round((Buffer.byteLength(json, 'utf8') / 1024) * 100)) / 100
  const fileName = `${bundleName}${data.language ? `.${data.language}` : ''}${pageNumber ? `.${pageNumber}` : ''}.json`

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
