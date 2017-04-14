'use strict';
const fs = require('fs');
const monk = require('monk');
const db = monk('mongodb://localhost:27017/dbName');
const Col = db.get('collectionName');

const create = (result) => {
  const buf = new Buffer(result);

  fs.writeFile('test.txt', buf, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log('Created!');
  });
};

console.log('Starting retrieval');
try {
  Col.find({}).then((results)=> {
    console.log('find complete');
    if (results) {
      console.log('Found: ', results.length);
      create(JSON.stringify(results));
    } else {
      console.error('not found');
    }
    console.log('done');
    db.close();
  });
} catch(e) {
  db.close();
  console.error('Error: ', e);
}
