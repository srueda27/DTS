//CommonJS
  //The way to share functionality without polluting global scope

var module1 = require('module1')

function fight() {

}

module.exports = {
  fight: fight
}



//AMD -- specifically for browsers

define([
  'module1',
  'module2'
], function(module1Import, module2Import) {
  function dance() {

  }
  
  return {
    dance: dance,
  }
});