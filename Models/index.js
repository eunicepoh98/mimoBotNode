'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var config = require('../config.js').dbCredentials;

//Initialize Connection with db
var sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize
  .authenticate()
  .then(function () {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.error('Unable to connect to the database:', err);
  });


var db = {};
fs.readdirSync(__dirname)
  .filter(function (file) {
    //return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
    //console.log('Imported model:', model.name);
  });

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    //console.log('Setting relationship for:', modelName);
    db[modelName].associate(db);
  }
});

sequelize.sync({
  force: true // force: true will drop the table if it already exists
  //logging:console.log
})
// .then(() => {
//   return [
//     db['Job'].bulkInsert([
//       { JobTitle: 'Job1', JobDescription: 'This Job 1' },
//       { JobTitle: 'Job2', JobDescription: 'This Job 2' }
//     ]),
//     db['Industry'].bulkCreate([
//       { IndustryName: 'Aerospace / Aviation' },
//       { IndustryName: 'Agriculture / Forestry / Fishing' }
//     ])
//   ];
// })

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
