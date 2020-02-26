import figlet from 'figlet'

const printText = (text = 'Lucid', font = 'Isometric1') => {
  console.log('')
  console.log('\x1b[32m%s\x1b[0m', figlet.textSync(text, { font }))
  console.log('')
  console.log('')
}

const printConfig = (config, configName) => {
  console.log(`Config: ${configName || ''}`)
  const maxLength = Object.keys(config).reduce((n, k) => (k.length > n) ? k.length : n, 0)
  Object.keys(config).forEach(c => {
    if (c === 'languages' && config[c] && config[c].length) {
      return console.log(`🔧 \x1b[36m ${c.padEnd(maxLength + 1)}: \x1b[0m ${config[c].map(l => `${l.lang} (${l.locale})`).join(', ')}`)
    }
    console.log(`🔧 \x1b[36m ${c.padEnd(maxLength + 1)}: \x1b[0m ${config[c]} `)
  })
  console.log('')
}

const info = (t) => {
  console.log(`fetcher 👉 | ${t}`)
}

const request = (t) => {
  console.log(`fetcher 🚀 | ${t}`)
}

const error = (t) => {
  console.log(`fetcher ❌ | ${t}`)
}

const success = (t) => {
  console.log(`fetcher ✅ | ${t}`)
}

const log = {
  printText,
  printConfig,
  info,
  request,
  error,
  success
}

export default log
