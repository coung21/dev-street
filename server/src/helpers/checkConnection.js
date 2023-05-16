const mongoose = require('mongoose')
const os = require('os')
const process = require('process')

const checkOverload = () => {
  setInterval(() => {
    const numOfConnect = mongoose.connections.length
    const numCores = os.cpus().length
    const memoryUsage = process.memoryUsage().rss

    const maxConnections = numCores * 5
    if(numOfConnect > numCores){
      console.log('------Overload-------')
    }
    console.log(`\nMemory Usage::${memoryUsage / 1024 / 1024}MB`)
    console.log(`Number of Connections::${numOfConnect}\n`)
  }, 10000)
}

module.exports = checkOverload