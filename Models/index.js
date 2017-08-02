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
              db['Company'].bulkCreate([
                { CompanyID: '1', CompanyName: 'Satair Pte Ltd', CompanyAddress: '12 Seletar Aerospace Link, Singapore', CompanyPostalCode: '048583' },
                { CompanyID: '2', CompanyName: 'P\'nnacle Pte Ltd', CompanyAddress: 'One Raffles Quay North Tower Level 25 Singapore', CompanyPostalCode: '508949' },
                { CompanyID: '3', CompanyName: 'Zodiac Aerospace Services Asia Pte Ltd', CompanyAddress: '36 Loyang Dr, Singapore', CompanyPostalCode: '018961' },
                { CompanyID: '4', CompanyName: 'Pegasus Agriculture Group Pte Ltd', CompanyAddress: '12 Marina View #23-59 Asia Square Tower 2 Singapore', CompanyPostalCode: '118535' },
                { CompanyID: '5', CompanyName: 'Engie Services Singapore Pte Ltd', CompanyAddress: '#05-04 Golden Agri Plaza, 108 Pasir Panjang Rd', CompanyPostalCode: '349315' },
                { CompanyID: '6', CompanyName: 'YM PROJECTS PTE LTD', CompanyAddress: 'YM Projects Pte. Ltd. 35 Kallang Pudding Road Tong Lee Building Blk A, #01-01', CompanyPostalCode: 'Singapore' },
                { CompanyID: '7', CompanyName: 'Project Lighting Design Pte Ltd', CompanyAddress: '1 Commonwealth Lane, One Commonwealth #09-01/02/03', CompanyPostalCode: '149544' },
                { CompanyID: '8', CompanyName: 'Mindlab Tuition Centre Pte. Ltd.', CompanyAddress: '545 Orchard Road #06-01 Far East Shopping Centre', CompanyPostalCode: '238882' },
                //{ CompanyID: '9', CompanyName: '', CompanyAddress: '', CompanyPostalCode: '' },
              ]).then(() => {
                console.log("Companies Added");
                db['Salary'].bulkCreate([
                  { SalaryID: '1', SalaryFrom: 6000, SalaryTo: 12000, CurrencyID: '1' },
                  { SalaryID: '2', SalaryFrom: 2500, SalaryTo: 2650, CurrencyID: '1' },
                  { SalaryID: '3', SalaryFrom: 5833, SalaryTo: 12250, CurrencyID: '1' },
                  { SalaryID: '4', SalaryFrom: 2500, SalaryTo: 3000, CurrencyID: '1' },
                  { SalaryID: '5', SalaryFrom: 2400, SalaryTo: 3500, CurrencyID: '1' },
                  { SalaryID: '6', SalaryFrom: 2200, SalaryTo: 2900, CurrencyID: '1' },
                  { SalaryID: '7', SalaryFrom: 3700, SalaryTo: 4400, CurrencyID: '1' },
                  { SalaryID: '8', SalaryFrom: 2200, SalaryTo: 3400, CurrencyID: '1' },
                  // { SalaryID: '9', SalaryFrom: 1, SalaryTo: 1, CurrencyID: '1' },
                ]).then(() => {
                  console.log("Salary Added");

                  db['Job'].create(
                    {
                      JobID: '1', JobTitle: 'Product Manager', JobDescription: 'For Satair\'s Regional Facility in Singapore we are seeking an experienced Product Manager to grow profitable product lines of business.',
                      JobQualification: '<ul><li>At least 5 years of relevant experience in a technical and commercial background, with a good mix of sales and technical understanding in engineering or aviation applications.</li><li>Degree in Business and/or Engineering discipline</li><li>Strong analytical skills combined with pragmatic application.</li><li>Ability to conduct clear target setting, execution and follow up.</li><li>An effective communicator with a broad range of persuasion and negotiating abilities with excellent written and spoken expression.</li><li>High professional integrity and ethical standards.</li><li>Able to conduct business travels.</li></ul>',
                      JobResponsibilities: '<ul><li>Build strong relationship with principals by ensuring development and maintenance of supplier relations by being the focal point for the supplier.</li><li>Provide high quality marketing support services to Sales and Customer Order Desk.</li><li>Establish, monitor and execute the complete product budget and forecasts.</li><li>Monitor market and product trends.</li><li>Minimize slowmover costs by working closely with Supply Chain to optimize the product lines inventory investment and provide them with necessary market trend intelligence.</li><li>Maintain appropriate product and supplier databases and to maintain cross reference data in Satair\'s transaction system.</li></ul>',
                      JobPostDate: '2017-07-28', JobPostalCode: '508728', JobAddress: '12 Seletar Aerospace Link, Singapore',
                      CompanyID: '1', CountryID: '1', JobTypeID: '1', SalaryID: '1'
                    }).then(function (newjob) {
                      [1].forEach(function (indId) {
                        newjob.addIndustry(indId).then(function (result) { });
                      });
                      [13, 14, 18].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  db['Job'].create(
                    {
                      JobID: '2', JobTitle: 'Aerospace Colour Blending Technician (MNC, WEST)',
                      JobDescription: '',
                      JobQualification: '<ul><li>Min Nitec holder</li><li>Min 3 years of experience in color matching/ blending in the Automotive/ Marine/ Aerospace industry</li><li>Able to work under minimal supervision and possesses initiative</li><li>Fast learner and has a positive attitude and good interpersonal skills</li><li>Basic PC knowledge skills is a must.</li></ul>',
                      JobResponsibilities: '<ul><li>To assist in all color blending activities and also perform other duties as assigned</li><li>To perform regular Preventive Maintenance programs on production machines and equipment to reduce breakdown and achieve smooth/effective color blending operations and on time delivery</li><li>Strict compliance with corporate policies and legal requirements pertaining to Environment, Health and Safety (EHS)</li><li>Ad hoc color blending activities</li></ul>',
                      JobPostDate: '2017-07-28', JobPostalCode: '048583', JobAddress: 'One Raffles Quay North Tower Level 25 Singapore',
                      CompanyID: '2', CountryID: '1', JobTypeID: '1', SalaryID: '2'
                    }).then(function (newjob) {
                      [13].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [1].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  db['Job'].create(
                    {
                      JobID: '3', JobTitle: '6000',
                      JobDescription: '',
                      JobQualification: '<ul><li>Diploma/Degree in Engineering or related field</li><li>At least 5 years of experience in aerospace industry</li><li>Knowledge of aeronautical environment (MRO market, cabin components)</li><li>Proficient in Microsoft Office</li><li>Self-motivated and able to work independently</li><li>Team player with good interpersonal, communication, analytical and problem-solving skills</li></ul>',
                      JobResponsibilities: "'<ul><li>Prepare Cabin analysis depending on requirements from the customers</li><li>Perform Cabin Walk in the customer facilities and analyse its needs</li><li>Define the list of the necessary spares for the Cabin support, prepare the sales prices, and evaluate the spares</li><li>Prepare the contract review to organize the operational management of the contract like stock, repair and costs follow up, invoices, exclusions management etc</li><li>Prepare and present the offer review to the management with estimated financial prospective figures</li><li>Manage the contract preparation and signature</li><li>Follow the contract realization with regular reporting</li><li>Optimize the costs to increase the margins during contract realization</li><li>Follow-up of spares and repairs deliveries and invoicing</li><li>Follow the market trends and answer to customer needs</li><li>Assist in ad-hoc assignments where necessary</li></ul>",
                      JobPostDate: '2017-07-28', JobPostalCode: '508949', JobAddress: '36 Loyang Dr, Singapore',
                      CompanyID: '3', CountryID: '1', JobTypeID: '1', SalaryID: '3'
                    }).then(function (newjob) {
                      [1].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [13].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  db['Job'].create(
                    {
                      JobID: '4', JobTitle: "Personal Assistant / Administrative Executive",
                      JobDescription: "",
                      JobQualification: "<ul><li>Diploma or higher from a recognized professional institute or university</li><li><strong>Minimum 1 year of work experience in&nbsp;Administrative&nbsp;/ Clerical positions</strong></li><li>Previous PA experience preferred</li><li>Able to read and write fluently in English and at least one other language</li><li><strong>Adequate&nbsp;communication skills a must</strong></li></ul>",
                      JobResponsibilities: "<ul><li>Assist Country Manager in General Administration and Clerical Duties</li><li>Manage and arrange schedule for Country Manager&nbsp;</li><li>Answer phone calls and respond to customer enquiries</li><li>Greet and receive visitors to the office</li><li>Arrange events and meetings</li><li>Handling basic accounts and managing Office Petty Cash</li><li>Ensuring that office runs at optimum standards</li><li>Consolidation of MIS reports by Sales Consultants to be sent to Country Manager once a week</li><li>Any ad-hoc duties as instructed by Country Manager&nbsp;</li></ul>",
                      JobPostDate: '2017-07-28', JobPostalCode: '018961', JobAddress: '12 Marina View #23-59 Asia Square Tower 2 Singapore',
                      CompanyID: '4', CountryID: '1', JobTypeID: '1', SalaryID: '4'
                    }).then(function (newjob) {
                      [2].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [3, 10].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  db['Job'].create(
                    {
                      JobID: '5', JobTitle: "M&E Coordinator",
                      JobDescription: "",
                      JobQualification: "<ul><li>Candidate must possess at least a Bachelor\'s Degree in Civil Engineering, Mechanical Engineering, Building Technology, Property Management or Building related disciplines.</li><li>Experience in building finishing works.</li><li>Familiar with procedures for&nbsp;statutory <strong>submissions</strong> such as FSSD, M&amp;E RI, Architectural RI, 5 Yearly Structural Inspections.</li><li>Experience in supervision and project management of <strong>A&amp;A</strong> works.</li><li>General knowledge of <strong>M&amp;E building services</strong>.</li><li>Experience in <strong>plumbing and sanitary</strong>.</li><li>Able to guide and troubleshoot Building Services / Civil faults.</li><li>Able to communicate &amp; write in English</li><li>A good team leader.</li><li>Experience working in a Healthcare industry will be a value add.</li><li style='list-style-type: none;'></li></ul>",
                      JobResponsibilities: "<ul><li><p>Job Scopes:</p><ul><li>Person In Charge for Building Services, System Operation and maintenance at hospital site.</li><li>Responsible for the planning and&nbsp;execution of corrective/preventive maintenance programmers.</li><li>Liaising with OEM / system contractor for all Building Services / Civil works.</li><li>Improving the efficiency on the operational processes, innovating and implementing systems improvement on energy conservation.</li><li>To provide excellent service to client expectations.</li><li>To achieve effective, economic and safe operations of all Building Services\' equipment and system by the team of technical officers and technicians</li><li>Providing feasible solutions and coordinate with owners/users, consultants, vendors/contractors on engineering functional requirements and ensure the objectives are achieved.</li><li>Conduct regular inspection of existing building and its services to ensure that all maintenance programmes are implemented effectively in strict compliance with instructions and guidelines.</li><li>To ensure all works carried out safely and / or in accordance with safety procedures.</li><li>Provide training and guidance to team of Technical Officers and/or Technicians</li><li>Any other tasks, when required by Facilities Manager.</li></ul></li></ul>",
                      JobPostDate: '2017-07-28', JobPostalCode: '118535', JobAddress: '#05-04 Golden Agri Plaza, 108 Pasir Panjang Rd, Singapore',
                      CompanyID: '5', CountryID: '1', JobTypeID: '1', SalaryID: '5'
                    }).then(function (newjob) {
                      [6].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [4, 13].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  db['Job'].create(
                    {
                      JobID: '6', JobTitle: "Engineer",
                      JobDescription: "",
                      JobQualification: "<ul><li>Good administrative skills.</li><li>Able to work independently and under minimal supervision.</li><li>Able to work in an organized &amp; methodical way and have good organizational &amp; coordination skills.</li><li>Sales Oriented.</li><li>Leadership skills.</li><li>Has great passion in interior design, building and construction trade.</li><li>Willingness to work longer hours.</li><li>Proficient in MS Word, Excel, PowerPoint.</li><li>Proficient in email correspondences / phone calls.</li><li>Must be able to correspond with customers.</li><li>Good command of English &amp; Mandarin (spoken &amp; written) to liaise with other Chinese counterparts.</li><li>Minimum 2 years of experience in interior design firm, building or construction trade.</li><li>Only Singaporeans may apply.</li><li style='list-style-type: none;'></li></ul>",
                      JobResponsibilities: "<ul><li>Create new customers base.</li><li>To make cold/sales calls &amp; liaise with clients for meetings.</li><li>Preparation of presentation to client for sales pitches.</li><li>Close supervision of site progress to ensure quality of work with contractors.</li><li>Good knowledge of schedule procedures for co-ordination of sub-contractors.</li><li>Ability to provide documentation of project, eg. Emails, correspondences, quotations, delivery orders/ purchase orders and final costing for project claims.</li><li>Cost Evaluation, preparation of costing, post contract administration.</li><li>Prepare Tender Documents.</li><li>To prepare progressive claim invoices.</li><li>Procurement of necessary materials.</li><li>To attend site meeting prior to project implementation.</li><li>Prepare works instructions/order and submit drawings to main contractors and building management for submission works.</li><li>Project schedule planning and monitoring of delivery schedule.</li><li>Ensure that deadline for completion of projects.</li><li>Ensure workmanship of sub-contractors are met and QC check with proper handover upon completion of project to the client.</li><li>To supervise/coordinate onsite installation works with contractors.</li><li>Ensure prompt payments from Clients.</li><li>Perform any other related duties as assigned by Sales Manager and/or Director.</li><li>Ensure that the system is updated with the latest information.</li><li>Assist in the maintenance of database of clienteles.</li><li>Manage and check for any erroneous certificates of attendance that was issued.</li><li>Other ad-hoc duties.</li><li style='list-style-type: none;'></li></ul>",
                      JobPostDate: '2017-07-28', JobPostalCode: '349315', JobAddress: 'YM Projects Pte. Ltd. 35 Kallang Pudding Road Tong Lee Building Blk A, #01-01',
                      CompanyID: '6', CountryID: '1', JobTypeID: '1', SalaryID: '6'
                    }).then(function (newjob) {
                      [6].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [4, 13].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  db['Job'].create(
                    {
                      JobID: '7', JobTitle: "Lighting Designer",
                      JobDescription: "",
                      JobQualification: "",
                      JobResponsibilities: "<ul><li>Degree/Diploma in &nbsp;Architecture, Interior Design or Product Design</li><li>Committed, highly motivated individual who is keen to learn and works well in a team</li><li>2 to 3 years of relevant experience in architectural lighting</li><li>Proficient in &nbsp;Autocad, Photoshop, Dialux and Microsoft Office Suite</li><li>Working knowledge of InDesign and Revit will be an advantage</li><li>Fluency in written &amp; spoken English is essential</li><li>Fluency in written &amp; spoken Mandarin will be advantageous to liaise with Clients.</li></ul>",
                      JobPostDate: '2017-07-28', JobPostalCode: '149544', JobAddress: '1 Commonwealth Lane, One Commonwealth #09-01/02/03',
                      CompanyID: '7', CountryID: '1', JobTypeID: '1', SalaryID: '7'
                    }).then(function (newjob) {
                      [13, 16].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [6].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  db['Job'].create(
                    {
                      JobID: '8', JobTitle: "Education Executive",
                      JobDescription: "",
                      JobQualification: "<ul><li>Minimum: degree holder</li><li>Excellent communication skills in both written and spoken English</li><li>Clear English speaking skill (near native)</li><li>Passion to teach and participate in education reform</li><li>Aptitude to work in a professional learning community</li></ul><p>&nbsp;</p><ul><li>We are looking for teachers with backgrounds in:&nbsp;<ul><li><strong>Math</strong></li><li><strong>Physics</strong></li><li><strong>Chemistry</strong></li><li><strong>English</strong></li></ul></li></ul>",
                      JobResponsibilities: "<ul><li>Conduct 1-to-1 and group classes from lesson planning, lecture, demonstration, and relevant class exercises/activities</li><li>Assist the students in attaining their objectives and goals for academic improvement</li><li>Evaluate the students\' progress through regular standard feedback processes</li><li>Inspire and motive students to excel</li><li style='list-style-type: none;'></li></ul>",
                      JobPostDate: '2017-07-28', JobPostalCode: '238882', JobAddress: '545 Orchard Road #06-01 Far East Shopping Centre',
                      CompanyID: '8', CountryID: '1', JobTypeID: '1', SalaryID: '8'
                    }).then(function (newjob) {
                      [7].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [7].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  console.log("Jobs Added");

                })
              })
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
