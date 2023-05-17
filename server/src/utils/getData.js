const lodash = require('lodash')

function getData({object = {}, fields = []}){
  return lodash.pick(object, fields)
}

module.exports = {getData}