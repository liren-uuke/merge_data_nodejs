require('dotenv').config();
const database = require('./database');
const path = require('path');

let list = new jake.FileList();
list.include('tasks/*.js');

for (let file of list.toArray()) {
  const name = path.basename(file, '.js');
  const action = require('./' + file);
  task(name, { async: true }, async () => {
    console.log(`Running ${name}...`);
    const start = Date.now();
    await action(database);
    const ms = Date.now() - start;
    console.log(`Finished ${name} in ${ms / 1000} seconds.`);
  });
}
