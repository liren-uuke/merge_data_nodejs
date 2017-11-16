const fs = require('fs');


function processData(database){
  let date = new Date(1500788332000);
  console.log(date.getTimezoneOffset());
  console.log(date);
}
module.exports = processData;
