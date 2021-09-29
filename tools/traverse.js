const fs = require('fs')
const path = require('path')

const traverseDir = dir =>
  fs.readdirSync(dir).flatMap(file => {
    let fullPath = path.join(dir, file)
    if (fs.lstatSync(fullPath).isDirectory()) return traverseDir(fullPath)
    else return fullPath
  })

module.exports = traverseDir