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
    mongoose.connect(`mongodb+srv://${host}:${port}/${name}`)
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