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

var reset = false;
sequelize.sync({
  force: reset // force: true will drop the table if it already exists
  //logging:console.log
}).then(() => {
  if (reset) {
    db['Industry'].bulkCreate([
      { IndustryID: 1, IndustryName: 'Aerospace / Aviation', Synonyms: '["Aerospace", "Aviation"]' },
      { IndustryID: 2, IndustryName: 'Agriculture / Forestry / Fishing', Synonyms: '["Agriculture", "Forestry", "Fishing"]' },
      { IndustryID: 3, IndustryName: 'Automotive', Synonyms: '["Automotive"]' },
      { IndustryID: 4, IndustryName: 'Broadcast / Media / Entertainment', Synonyms: '["Broadcast", "Media", "Entertainment"]' },
      { IndustryID: 5, IndustryName: 'Charities / Social Services / NGOs', Synonyms: '["Charities", "Social Services", "NGOs"]' },
      { IndustryID: 6, IndustryName: 'Construction / Building Services / Real Estate', Synonyms: '["Construction", "Building Services", "Real Estate"]' },
      { IndustryID: 7, IndustryName: 'Education / Training Institutes', Synonyms: '["Education", "Training Institutes"]' },
      { IndustryID: 8, IndustryName: 'Energy / Power / Environmental', Synonyms: '["Energy", "Power", "Environmental"]' },
      { IndustryID: 9, IndustryName: 'Fast Moving Consumer Goods', Synonyms: '[]' },
      { IndustryID: 10, IndustryName: 'Human Resources Management / Consultancy', Synonyms: '["Human Resources Management", "Consultancy"]' },
      { IndustryID: 11, IndustryName: 'Government / Civil Service / GLC (Govt-Linked Co.)', Synonyms: '["Government", "Civil Service", "GLC (Govt-Linked Co.)"]' },
      { IndustryID: 12, IndustryName: 'Hospital / Healthcare', Synonyms: '["Hospital", "Healthcare"]' },
      { IndustryID: 13, IndustryName: 'Hospitality / Food & Beverages / Retail', Synonyms: '["Hospitality", "Food", "Beverages", "Retail"]' },
      { IndustryID: 14, IndustryName: 'Industrial / Engineering', Synonyms: '["Industrial", "Engineering"]' },
      { IndustryID: 15, IndustryName: 'Information Technology / Telecommunications', Synonyms: '["Information Technology", "Telecommunications", "IT"]' },
      { IndustryID: 16, IndustryName: 'Manufacturing', Synonyms: '["Manufacturing"]' },
      { IndustryID: 17, IndustryName: 'Oil & Gas / Chemical / Mining', Synonyms: '["Oil & Gas", "Chemical", "Mining"]' },
      { IndustryID: 18, IndustryName: 'Pharmaceutical / Medical', Synonyms: '["Pharmaceutical", "Medical"]' },
      { IndustryID: 19, IndustryName: 'Professional Services (e.g. Accounts & Audit, Legal, Consulting)', Synonyms: '["Professional"]' },
      { IndustryID: 20, IndustryName: 'Shipbuilding / Marine Services', Synonyms: '["Shipbuilding", "Marine Services"]' },
      { IndustryID: 21, IndustryName: 'Transportation / Logistics', Synonyms: '["Transportation", "Logistics"]' },
      { IndustryID: 22, IndustryName: 'Others', Synonyms: '["Others"]' },
      { IndustryID: 23, IndustryName: 'Banking / Financial Services / Insurance', Synonyms: '["Banking", "Financial Services", "Insurance"]' },
      { IndustryID: 24, IndustryName: 'Executive Search & Recruitment Agencies', Synonyms: '["Executive Search", "Recruitment Agencies"]' }
    ]).then(() => {
      console.log("Industries Added");
      db['JobFunction'].bulkCreate([
        { JobFunctionID: 1, JobFunctionName: 'Top Management (e.g. CEO / CFO / COO, etc.)', Synonyms: '["Top Management"]' },
        { JobFunctionID: 2, JobFunctionName: 'Senior Management (e.g. VP / Director, etc.)', Synonyms: '["Senior Management"]' },
        { JobFunctionID: 3, JobFunctionName: 'Administrator / Office Manager', Synonyms: '["Administrator", "Office Manager"]' },
        { JobFunctionID: 4, JobFunctionName: 'Architect / Interior Design / Builder', Synonyms: '["Architect", "Interior Design", "Builder"]' },
        { JobFunctionID: 5, JobFunctionName: 'Banking, Financial Services & Insurance', Synonyms: '["Banking", "Financial Services", "Insurance"]' },
        { JobFunctionID: 6, JobFunctionName: 'Customer Service & Contact Centre', Synonyms: '["Customer Service", "Contact Centre"]' },
        { JobFunctionID: 7, JobFunctionName: 'Educator / Trainer', Synonyms: '["Educator", "Trainer"]' },
        { JobFunctionID: 8, JobFunctionName: 'Finance & Accounting', Synonyms: '["Finance", "Accounting"]' },
        { JobFunctionID: 9, JobFunctionName: 'Healthcare & Wellness', Synonyms: '["Healthcare", "Wellness"]' },
        { JobFunctionID: 10, JobFunctionName: 'Human Resources', Synonyms: '["Human Resources", "HR"]' },
        { JobFunctionID: 11, JobFunctionName: 'Information Technologies', Synonyms: '["Information Technologies", "IT"]' },
        { JobFunctionID: 12, JobFunctionName: 'Legal & Compliance', Synonyms: '["Legal", "Compliance"]' },
        { JobFunctionID: 13, JobFunctionName: 'Manufacturing / Production / Engineering', Synonyms: '["Manufacturing", "Production", "Engineering"]' },
        { JobFunctionID: 14, JobFunctionName: 'Marketing, Public Relations & Communications', Synonyms: '["Marketing", "Public Relations", "Communications"]' },
        { JobFunctionID: 15, JobFunctionName: 'Media & Entertainment', Synonyms: '["Media", "Entertainment"]' },
        { JobFunctionID: 16, JobFunctionName: 'Professionals (e.g. Pilot / Diver / Military, etc.)', Synonyms: '["Professionals"]' },
        { JobFunctionID: 17, JobFunctionName: 'Research & Development', Synonyms: '["Research", "Development"]' },
        { JobFunctionID: 18, JobFunctionName: 'Sales & Business Development', Synonyms: '["Sales", "Business Development"]' },
        { JobFunctionID: 19, JobFunctionName: 'Supply Chain, Procurement, Transportation & Logistics', Synonyms: '["Supply Chain", "Procurement", "Transportation", "Logistics"]' },
        { JobFunctionID: 20, JobFunctionName: 'Telecom / Service Provider', Synonyms: '["Telecom", "Service Provider"]' },
        { JobFunctionID: 21, JobFunctionName: 'Headhunter & Recruiter', Synonyms: '["Headhunter", "Recruiter"]' }
      ]).then(() => {
        console.log("JobFunctions Added");
        db['JobType'].bulkCreate([
          { JobTypeID: 1, JobType: 'Full Time', Synonyms: '["Full Time"]' },
          { JobTypeID: 2, JobType: 'Part Time', Synonyms: '["Part Time"]' },
          { JobTypeID: 3, JobType: 'Internship', Synonyms: '["Internship"]' }
        ]).then(() => {
          console.log("JobTypes Added");
          db['Currency'].bulkCreate([
            { CurrencyID: '1', CurrencyCode: 'SGD', Symbol: '$' },
            { CurrencyID: '2', CurrencyCode: 'JPY', Symbol: '¥' },
            { CurrencyID: '3', CurrencyCode: 'USD', Symbol: '$' },
            { CurrencyID: '4', CurrencyCode: 'KRW', Symbol: '₩' },
            { CurrencyID: '5', CurrencyCode: 'EUR', Symbol: '€' },
            { CurrencyID: '6', CurrencyCode: 'AUD', Symbol: '$' },
            { CurrencyID: '7', CurrencyCode: 'MYR', Symbol: 'RM' },
            { CurrencyID: '8', CurrencyCode: 'CNY', Symbol: '¥' }
          ]).then(() => {
            console.log("Currencies Added");
            db['Country'].bulkCreate([
              { CountryID: '1', CountryName: 'Singapore' },
              { CountryID: '2', CountryName: 'Japan' },
              { CountryID: '3', CountryName: 'Korea' },
              { CountryID: '4', CountryName: 'Malaysia' },
              { CountryID: '5', CountryName: 'Indonesia' },
              { CountryID: '6', CountryName: 'Australia' }
            ]).then(() => {
              console.log("Countries Added");
            })
          })
        })
      })
    })
  }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
