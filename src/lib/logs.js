import bows from 'bows'
import figlet from 'figlet'

bows.config({
  padding: false,
  separator: ''
})

function printText (text = 'Lucid', font = 'Isometric1') {
  console.log('')
  console.log('\x1b[32m%s\x1b[0m', figlet.textSync(text, { font }))
  console.log('')
  console.log('')
}

function printConfig (config, configName) {
  console.log(`Config: ${configName || ''}`)
  const maxLength = Object.keys(config).reduce((n, k) => (k.length > n) ? k.length : n, 0)
  Object.keys(config).forEach(c => {
    if (c === 'languages') return console.log(`🔧 \x1b[36m ${c.padEnd(maxLength + 1)}: \x1b[0m ${config[c].map(l => `${l.lang} (${l.locale})`).join(', ')}`)
    console.log(`🔧 \x1b[36m ${c.padEnd(maxLength + 1)}: \x1b[0m ${config[c]} `)
  })
  console.log('')
}

const log = {
  printText,
  printConfig,
  info: bows('fetcher 👉'),
  request: bows('fetcher 🚀'),
  error: bows('fetcher ❌'),
  success: bows('fetcher ✅')
}

export default log
