const mongoose = require('mongoose')
const {db: {host, port, name}} = require('../config/config')
const checkOverload = require('../helpers/checkConnection')

class Database{
  constructor(){
    this.connect()
  }

  connect(type = 'mongo'){
    // mongoose.set('debug', true)
    // mongoose.set('debug', {color: true})
    mongoose.connect(`mongodb+srv://dchunter7771414:dc25072004@devstreet.ut78nad.mongodb.net/?retryWrites=true&w=majority`)
    // console.log(`mongodb+srv://${host}:${port}/${name}`)
    // mongoose.connect(`mongodb://${host}:${port}/${name}`)
    .then(() => {
      console.log('Connect to MongoDB successfully')
      // checkOverload()
    }).catch(() => {
      console.log('Cannot connect to MongoDB')
    })
  }

  static getInstance(){
    if(!Database.instance){
      Database.instance = new Database()
    }
    return Database.instance
  }
}

const MongoInstance = Database.getInstance()

module.exports = MongoInstance