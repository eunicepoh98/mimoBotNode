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
                { CompanyID: '9', CompanyName: 'Stafflink', CompanyAddress: '10 Anson Road #22-07 International Plaza', CompanyPostalCode: '079903' },
                { CompanyID: '10', CompanyName: 'Achieve Group', CompanyAddress: 'Achieve Group 6 Shenton Way, OUE Downtown 1 #39-03', CompanyPostalCode: '068809' },
                { CompanyID: '11', CompanyName: 'FCBC', CompanyAddress: '750A Chai Chee Road, #04-01 Viva Business Park', CompanyPostalCode: '469001' },
                { CompanyID: '12', CompanyName: 'Ambition', CompanyAddress: 'One Raffles Place, #14-62 Office Tower 2', CompanyPostalCode: '048616' },
                { CompanyID: '13', CompanyName: 'Manpower Staffing Services (Singapore) Pte Ltd', CompanyAddress: 'Manpower Staffing Services (S) Pte Ltd 1 Wallich Street #09-02 Guoco Tower', CompanyPostalCode: '078881' },
                { CompanyID: '14', CompanyName: 'Inter-Continental Oils & Fats', CompanyAddress: '150 Beach Road Level 24, Gateway West', CompanyPostalCode: '189720' },
                { CompanyID: '15', CompanyName: 'Recruit Express Pte Ltd', CompanyAddress: '391A Orchard Road Ngee Ann City Tower A #12-08', CompanyPostalCode: '238873' },
                { CompanyID: '16', CompanyName: 'BGC Group', CompanyAddress: '10 Collyer Quay Centre,#06-07/08/09/10,Ocean Financial Centre', CompanyPostalCode: '049315' },
                { CompanyID: '17', CompanyName: 'Capita Pte Ltd', CompanyAddress: '8 Marina View, #11-01 Asia Square Tower 1', CompanyPostalCode: '018960' },
                { CompanyID: '18', CompanyName: 'Siew Lin YTF (Singapore) Pte Ltd', CompanyAddress: '180 Cecil St, Bangkok Bank Building', CompanyPostalCode: '069546' },
                { CompanyID: '19', CompanyName: 'Randstad', CompanyAddress: '50 Raffles Place #17-02/05, Singapore Land Tower', CompanyPostalCode: '048623' },
                { CompanyID: '20', CompanyName: 'DCI Consultants Pte Ltd', CompanyAddress: '15 Mayo St', CompanyPostalCode: '208312' },
                { CompanyID: '21', CompanyName: 'Intelligence, a division with Capita Pte Ltd', CompanyAddress: '8 Marina View #11-01 Asia Square Tower 1', CompanyPostalCode: '018960' },
                { CompanyID: '22', CompanyName: 'Adecco - GS Perm', CompanyAddress: ' 1 Scotts Road, #18-08,Shaw Centre', CompanyPostalCode: '228208' },
                { CompanyID: '23', CompanyName: 'Hays', CompanyAddress: '#27-20 UOB Plaza 2, 80 Raffles Place', CompanyPostalCode: '048624' },
                { CompanyID: '24', CompanyName: 'People Advantage Pte Ltd', CompanyAddress: '20 Jln Afifi', CompanyPostalCode: '409179' },

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
                  { SalaryID: '9', SalaryFrom: 2000, SalaryTo: 2500, CurrencyID: '1' },
                  { SalaryID: '10', SalaryFrom: 2200, SalaryTo: 2900, CurrencyID: '1' },
                  { SalaryID: '11', SalaryFrom: 3000, SalaryTo: 3500, CurrencyID: '1' },
                  { SalaryID: '12', SalaryFrom: 4000, SalaryTo: 5000, CurrencyID: '1' },
                  { SalaryID: '13', SalaryFrom: 2000, SalaryTo: 2500, CurrencyID: '1' },
                  { SalaryID: '14', SalaryFrom: 4000, SalaryTo: 6000, CurrencyID: '1' },
                  { SalaryID: '15', SalaryFrom: 1500, SalaryTo: 2000, CurrencyID: '1' },
                  { SalaryID: '16', SalaryFrom: 1600, SalaryTo: 1700, CurrencyID: '1' },
                  { SalaryID: '17', SalaryFrom: 1800, SalaryTo: 2000, CurrencyID: '1' },
                  { SalaryID: '18', SalaryFrom: 1500, SalaryTo: 2000, CurrencyID: '1' },
                  { SalaryID: '19', SalaryFrom: 6000, SalaryTo: 9000, CurrencyID: '1' },
                  { SalaryID: '20', SalaryFrom: 2500, SalaryTo: 4000, CurrencyID: '1' },
                  { SalaryID: '21', SalaryFrom: 4000, SalaryTo: 5000, CurrencyID: '1' },
                  { SalaryID: '22', SalaryFrom: 4000, SalaryTo: 5000, CurrencyID: '1' },
                  { SalaryID: '23', SalaryFrom: 7000, SalaryTo: 12000, CurrencyID: '1' },
                  { SalaryID: '24', SalaryFrom: 2000, SalaryTo: 2500, CurrencyID: '1' }
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
                      JobID: '3', JobTitle: 'Cabin Program Manager',
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

                  db['Job'].create(
                    {
                      JobID: '9', JobTitle: "CRM Administrator",
                      JobDescription: "Main Tasks: Support the CRM Team on basic administrative tasks, including database management, analysis and reporting, creation of contact lists for marketing and sales campaigns and other ad-hoc tasks as required.",
                      JobQualification: "",
                      JobResponsibilities: "<div><strong>Duties &amp; responsibilities:</strong><br />1. Birthday mailing list (Monthly)<br />2. First Vehicle Birthday mailing (Upcoming)<br />3. End-of Term mailing (Ongoing)<br />4. Welcome Mailing list (Monthly)<br />5. Fascination of Company's mailing list (Bimonthly)<br />6.&nbsp; News &amp; Selected Magazine mailing list (Quarterly)<br />7.&nbsp; Magazine mailing list (Bi-monthly)<br />8. Sales Round mailing lists (Upon request)<br />9. Event Invites list (when required)<br />10. Help to find event attendee BPs in C@P (After each event)<br />11. DM campaign mailing list (Upon request)<br />12. Call up return mailings (Weekly)<br />13. Enter test-drive and customer information form (Daily)<br />14. Create BPs for sales funnel related activities (Daily)<br />15. Pspecting list for sales team when requested (Upon request)<br />16. Monitoring and support of the App (Daily)</div>",
                      JobPostDate: '2017-04-28', JobPostalCode: '079903', JobAddress: '10 Anson Road #22-07 International Plaza',
                      CompanyID: '1', CountryID: '1', JobTypeID: '1', SalaryID: '9'
                    }).then(function (newjob) {
                      [1, 2, 3].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [1, 2].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  db['Job'].create(
                    {
                      JobID: '10', JobTitle: "PR Marketing cum Social Media Exec",
                      JobDescription: "leading developer, publisher and marketer of interactive entertainment for consumers",
                      JobQualification: "<ul><li><strong>&nbsp;Min 1 year of relevant experience in the marketing, PR and/or Social industry in FMCG, gaming, entertainment marketing or consumer lifestyle brands</strong></li><li><strong>&nbsp;Posses a strong interest for video games</strong></li><li><strong>Exposure in executing against Marketing and Communications strategies to meet company objectives</strong></li><li><strong>Digital marketing experience including some social media and a broad grounding in offline. Social mavens and community leaders, a plus</strong></li><li>&nbsp;Mature and analytical with the ability to understand and work towards the company goals</li><li>&nbsp;Strong written and spoken communication, interpersonal and conceptual thinking skills</li><li>&nbsp;Resourceful, independent with basic Marketing, PR and/or Social knowledge</li></ul>",
                      JobResponsibilities: "<ul><li>Assist in development of a comprehensive marketing and communications strategies, and tactics for the products</li><li>Conceptualize, plan, execute and evaluate integrated marketing communications campaigns from announcement through to product launch and lifecycle management</li><li>&nbsp;Manage relationship with media agency in developing, executing and evaluating advertising campaigns with a focus but not limit to digital and social placement</li><li>Work closely with Global Brand and Communications Lead to deliver marketing assets, communications documents and obtain approvals for the Asia Territories</li><li>Collate, file and prepare PR coverage report to the Global Communications team</li><li>Manage relationship with Singapore and South East Asia key media</li><li>Assist in the logistics for events and press tours including setting up game demo to press, consumers and partners as required</li><li>Contribute to the voice the social media channels and give input on growing our community in Asia</li><li>Manage the Asia social brand channels and liaise with the Global Communications lead on social content requests and approvals</li><li>Create and adapt global marketing assets for marketing purposes</li><li>&nbsp;Capture in-game images and footages for PR and Social purposes</li><li>&nbsp;Manage and monitor monthly marketing expenses and ensure expenses are within forecast</li></ul>",
                      JobPostDate: '2017-07-28', JobPostalCode: '068809', JobAddress: 'Achieve Group 6 Shenton Way, OUE Downtown 1 #39-03',
                      CompanyID: '10', CountryID: '1', JobTypeID: '1', SalaryID: '10'
                    }).then(function (newjob) {
                      [4].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [14].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  db['Job'].create(
                    {
                      JobID: '11', JobTitle: "Central Support Officer (CSO)",
                      JobDescription: "FCBC is a highly dynamic church organization. We are seeking a determined individual to work in a friendly environment that services the church, its members and the community with passion and commitment, especially in the area of training and equipping leaders and believers. The incumbent will provide administrative and logistic support to an equipping team of pastors that run course planning. Administration support on-site is required for the on-going classes.",
                      JobQualification: "<strong>Education/Professional Qualification:</strong><ul><li>1 to 2 years of working experience</li><li>Minimum GCE A level or Diploma holder in any discipline</li></ul><strong>Preferred Skills/Experience:</strong><ul><li>An individual with pride, passion, and one that garners satisfaction from a job well done</li><li>Good organizational, interpersonal, communication and time management skills</li><li>Demonstrate flexibility, creativity and a good team player</li><li>Willing to learn new systems and processes</li><li>Able to multi-task in fast paced environment</li><li>Able to work under pressure and meet tight deadlines</li><li>Able to commit on weeknight and weekends (Saturday and Sunday)</li><li>Proficient in MS Office (Word, Excel and Powerpoint)</li><li>Proficient in written and spoken English</li></ul><strong>Language Requirements:</strong><ul><li>Need to receive Mandarin speaking clients and prepare basic English/Mandarin bilingual signage. Proficiencies in English and Mandarin are required.</li></ul>",
                      JobResponsibilities: "CSO&rsquo;s duties include but are not limited to the following:<ul><li>Work closely with the Pastors in-charge, other Central Support Officers and helpers</li><li>Provide full spectrum of administrative support to the church-wide equipping classes</li><li>Oversee pre-registration procedures and manage classes on-site</li><li>Attend to enquiries made through email or telephone</li><li>Act as liaison between Pastors, trainers, students and inter-departments on event related matters</li><li>Secure facilities booking and coordinate logistic matters</li><li>Prepare and provide training materials for classes</li><li>Maintain records of attendance and outcomes for registration report/statistics report/evaluation summary</li><li>Maintain and update contents on church equipping course websites</li></ul>",
                      JobPostDate: '2017-07-28', JobPostalCode: '469001', JobAddress: '750A Chai Chee Road, #04-01 Viva Business Park',
                      CompanyID: '11', CountryID: '1', JobTypeID: '1', SalaryID: '11'
                    }).then(function (newjob) {
                      [5].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [3].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  db['Job'].create(
                    {
                      JobID: '12', JobTitle: "Marketing Specialist",
                      JobDescription: "",
                      JobQualification: "<ul><li>At least 3-4 years of overall social media or content marketing experience including execution and experience in handling vendors and suppliers</li><li>Client servicing experience</li><li>Excellent oral and written business communication skills</li><li>Digital Native, able to handle digital platforms and content easily</li></ul>",
                      JobResponsibilities: "Our client is a well-established company that delivers personalized learning experiences that help students, parents, educators and professionals drive results.&nbsp;<br /><br /><br />This role oversees the creation, management and development of the companys social media marketing strategy, PR strategy as well as supporting and executing events. You would be responsible for establishing a strategic approach to social media content that aligns with the companys global vision and marketing plans but tailored to the regional/local business needs, culture, trends through owned and social channels - Facebook, LinkedIn, Twitter and other social media platforms.<br />You would be required to work alongside PR agency to execute PR releases and content in line with GTM programs as well as company-wide news.<br /><br />'",
                      JobPostDate: '2017-08-07', JobPostalCode: '048616', JobAddress: 'One Raffles Place, #14-62 Office Tower 2',
                      CompanyID: '12', CountryID: '1', JobTypeID: '1', SalaryID: '12'
                    }).then(function (newjob) {
                      [7].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [14].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });


                  db['Job'].create(
                    {
                      JobID: '13', JobTitle: "",
                      JobDescription: "",
                      JobQualification: "Experience in reporting, documentation, presentation slides<br />Someone who is good with numbers<br />Candidate must possess at least a Bachelor's Degree, Business Studies/Administration/Management or equivalent.<br />Required skill(s): MS Powerpoint, EXCEL<br />1 year(s) of working experience or No experience welcome to apply!<br /><br /><br /><strong>Other Information</strong><br />Locaton: Harbourfront<br />6months contract - subject to renewal (with completed bonus and other attractive benefits!)<br />Singaporeans only<br /><br />",
                      JobResponsibilities: "Responsible for sales analytical function",
                      JobPostDate: '2017-07-28', JobPostalCode: '078881', JobAddress: 'Manpower Staffing Services (S) Pte Ltd 1 Wallich Street #09-02 Guoco Tower',
                      CompanyID: '13', CountryID: '1', JobTypeID: '1', SalaryID: '13'
                    }).then(function (newjob) {
                      [8].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [3, 10].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });


                  db['Job'].create(
                    {
                      JobID: '14', JobTitle: "Infrastructure Engineer",
                      JobDescription: "",
                      JobQualification: "<ul><li>At least a Diploma/Degree in Computer Science/Information Technology Engineering</li><li>At least 5 year(s) working experience in managing large computing environment at data Centre</li><li>Candidates possess IT certificates such as Microsoft MCSE/MCSA/ITIL will be preferred</li><li>Good knowledge and hands-on experience in:</li><ul><li>Microsoft Windows/Exchange Server, Endpoints Security, Virtual Server, Citrix XenApp &amp; XenDesktop</li><li><div>Windows OS Services, AD, Web Services, SAN Interconnect, VDI, NAS, VMware LAN/WAN performance troubleshooting</div></li><li><div>Massaging and collaboration platform in MS Exchange Skype or Business Active Directory</div></li></ul>",
                      JobResponsibilities: "<ul><li>Provide overall system and maintenance support of email servers</li><li>Responsible for the day to day system operations support &ndash; system monitoring, administration and maintenance upgrades including patch management</li><li>Involve project implementation with maintenance perspectives, processes, documentation of various configurations of various subsystems and familiarization of monitoring tools for System Management</li><li>Work with IT team members to maintain solutions and ensure systems meet the needs of global organization functionality and quality</li><li>Responsible for managing user accounts, network file sharing, software license management, installation and configuration of new server systems or rebuild, peripherals, services, storage, and printers, according to IT standards, projects and operational requirements</li><li>Manage MS exchange email system consisting of clustered back-end and front-end servers</li><li>Coordinate with other IT teams on corporate-initiated projects</li><li>Maintain operational inventory of data Centre equipment, technical documentation and SOPs</li><li>Responsible for vendor and change management</li></ul>",
                      JobPostDate: '2017-07-28', JobPostalCode: '189720', JobAddress: '150 Beach Road Level 24, Gateway West',
                      CompanyID: '14', CountryID: '1', JobTypeID: '1', SalaryID: '14'
                    }).then(function (newjob) {
                      [9].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [11].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });


                  db['Job'].create(
                    {
                      JobID: '15', JobTitle: "Temp Bank Admin/Data entry assistants",
                      JobDescription: "",
                      JobQualification: "<ul><li>Minimum GCE 'O' Levels &amp; above</li><li>Able to commit for at least 2-3 months and longer</li><li>Knowledge in Microsoft Office</li></ul>",
                      JobResponsibilities: "<ul><li>Updating of database</li><li>Sorting documents and paperwork</li><li>Checking and generation of reports</li><li>Photocopying and scanning duties</li><li>Filing, archiving&nbsp;</li><li>Other general admin duties</li></ul>",
                      JobPostDate: '2017-07-28', JobPostalCode: '238873', JobAddress: '391A Orchard Road Ngee Ann City Tower A #12-08',
                      CompanyID: '15', CountryID: '1', JobTypeID: '1', SalaryID: '15'
                    }).then(function (newjob) {
                      [10].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [3, 5, 10].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });


                  db['Job'].create(
                    {
                      JobID: '16', JobTitle: "Office Executive (Govt)",
                      JobDescription: "",
                      JobQualification: "<ul><li>Diploma in any field</li><li>Candidate with prior experience in Administrative will be a plus</li><li>Available to start work within short notice</li><li>Proficient in MS Office Skill (MS Word / Excel)</li><li>Able to work for 6 mths and above</li></ul>",
                      JobResponsibilities: "<ul><li>Assist Department with Administrative support</li><li>Reports generation (Excel)</li><li>Handle simple enquiry (Walk-in)</li><li>Receptionist duties</li></ul>",
                      JobPostDate: '2017-07-28', JobPostalCode: '049315', JobAddress: '10 Collyer Quay Centre,#06-07/08/09/10,Ocean Financial Centre',
                      CompanyID: '16', CountryID: '1', JobTypeID: '1', SalaryID: '16'
                    }).then(function (newjob) {
                      [11].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [3].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });


                  db['Job'].create(
                    {
                      JobID: '17', JobTitle: "Front Desk Executive",
                      JobDescription: "",
                      JobQualification: "<ul><li>Experienced in front desk work, preferably from FMCG industry</li><li>Good communication skills</li><li>Experienced in cashiering, opening of retail shops</li></ul>>", 
                      JobResponsibilities: "<ul><li>Answer to customer enquiries</li><li>Share and promote services &amp; products</li><li>Management of bookings for customers</li><li>Resolve of customer complaints in a professional manner</li></ul>",
                      JobPostDate: '2017-07-28', JobPostalCode: '018960', JobAddress: '8 Marina View, #11-01 Asia Square Tower 1',
                      CompanyID: '17', CountryID: '1', JobTypeID: '1', SalaryID: '17'
                    }).then(function (newjob) {
                      [12].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [9].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  db['Job'].create(
                    {
                      JobID: '18', JobTitle: "Cashier",
                      JobDescription: "",
                      JobQualification: "<ul><li>Singaporean or those eligible to work in Singapore</li><li>Bilingual in English and Mandarin due to requirements in liaising with mandarin speaking customer</li><li>careful with cash</li><li>quick thinking&nbsp;</li></ul>",
                      JobResponsibilities: "<ul><li>order taking</li><li>collect cash</li><li>ensure customers collect the correct items</li></ul>",
                      JobPostDate: '2017-07-28', JobPostalCode: '069546', JobAddress: '180 Cecil St, Bangkok Bank Building',
                      CompanyID: '18', CountryID: '1', JobTypeID: '1', SalaryID: '18'
                    }).then(function (newjob) {
                      [13].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [6, 18].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  db['Job'].create(
                    {
                      JobID: '19', JobTitle: "Sales Manager (Technical Equipment)- Construction",
                      JobDescription: "",
                      JobQualification: "As the successful candidate for this role, you will influence and lead sales strategies and be directly involved in the performance a growing portion of the business. To qualify for the role, you should have more than 4 years experience in sales within the construction B2B arena. You will ideally have:<ul><li>Diploma/Degree in Engineering, technically inclined</li><li>Experience selling to consultants (construction), building owners and developers would be highly advantageous</li><li>Strong salesmanship, being able to engage and develop business through multiple industries</li><li>Highly independent and resourceful</li><li>Strategic thinking, proactive and self-driven</li><li>Strong technical acumen</li></ul>",
                      JobResponsibilities: "In your role, you report directly to the Sales leaders based in Australia and will be responsible for taking charge of developing business and growing the brand within the region. You will be responsible to ensure the company remains competitive in the market and grows profitably. Some of the core duties of the role include:<ul><li>Developing and executing sales strategies and plans, identifying key areas where growth potential is high</li><li>Preparing annual budget and monthly forecasts, keeping track of sales progress and performance</li><li>Growing and maintaining existing key accounts, following up on key projects and maintaining current key relationships with customers</li><li>Providing professional and technical advice, working closely with relevant stakeholders to ensure strong partnerships</li><li>Expanding market share, developing distributor partnerships and promoting the brand.</li></ul>",
                      JobPostDate: '2017-07-28', JobPostalCode: '048623', JobAddress: '50 Raffles Place #17-02/05, Singapore Land Tower',
                      CompanyID: '19', CountryID: '1', JobTypeID: '1', SalaryID: '19'
                    }).then(function (newjob) {
                      [14].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [6, 18].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  db['Job'].create(
                    {
                      JobID: '20', JobTitle: "Presale System Support Engineer",
                      JobDescription: "",
                      JobQualification: "<ul><li>Degree/Diploma in Electrical and Electronics, Telecommunications, Information Technology or equivalent.</li><li>Minimum&nbsp;3&nbsp;years&rsquo; experience in Physical Security and sound IT Network System knowledge. Extensive experience in handling presales function and design of large scale enterprise System for tenders.</li><li>Experience with server and storage hardware components including RAID levels and virtualization.</li><li>Certification:&nbsp;MCSE,&nbsp;CCNA, MS Certification are a plus.</li><li>Experience with Microsoft OS, Linux OS and VMWare.</li><li>Excellent client, vendor and team management skills as well as good interpersonal and negotiation skills &nbsp;</li><li>Excellent written and verbal communications skills with demonstrated ability to clearly articulate complex technical solution to customers and consultants</li></ul>",
                      JobResponsibilities: "<ul><li>As a member of the solution team, you will develop solution, lead in bid submission to grow organizations business.</li><li>Analyse complex technical requirements and work with Solution Architect on bid strategies, compliance responses and propose&nbsp;technical&nbsp;solutions</li><li>Drive system demo and POC (Proof of Concept) as part of pre-tender engagement and post-tender submission engagement</li><li>To support Request for Quotation (RFQ), evaluate third-party technologies/solutions, negotiate and make recommendations to bid team for inclusion in proposal</li><li>Give support to project team in project implementation upon award, including driving system level and detailed design, Acceptance Test Plans, and seek approvals from customers and regulatory authorities where applicable, and manage 3rd party vendors on delivery and performance.</li><li>Conduct and develop materials for use in customer training and train others in project teams or life-cycle support services team</li><li>Conduct project post mortem, identify successful elements and propose recommendations on areas for improvement</li><li>Follow up on implemented solutions and identifies new opportunities that complement the work that was completed</li></ul>",
                      JobPostDate: '2017-07-28', JobPostalCode: '208312', JobAddress: '15 Mayo St',
                      CompanyID: '20', CountryID: '1', JobTypeID: '1', SalaryID: '20'
                    }).then(function (newjob) {
                      [15].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [11].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  db['Job'].create(
                    {
                      JobID: '21', JobTitle: "Service Delivery Manager",
                      JobDescription: "",
                      JobQualification: "<div><strong>Requirements:</strong><br />&bull; Degree or Diploma in any discipline, preferably supplemented by trainings/certifications related to services delivery and project management.<div>&bull; At least 2 years operational experience as a SDM in a regional or multi-countries environment for services delivery to multi-nationals companies</div><div>&bull; Candidate must have worked with both customers and internal teams, preferably with liaison upstream to global/central teams as well as downstream to country teams.</div><div>&bull; History of meeting contracted service levels agreed with customers</div></div>",
                      JobResponsibilities: "<div>&bull; The candidate should have experiences in services delivery involving Multi-Functional Devices (MFDs), Printers and Document Management Solutions. These are elements of Managed Document Services (MDS) programs. However, other IT projects may be suitable for consideration<br />&bull; Candidate must have worked with both customers and internal teams, preferably with liaison upstream to global/central teams as well as downstream to country teams<br />&bull; History of meeting contracted service levels agreed with customers</div><div>&nbsp;</div>",
                      JobPostDate: '2017-07-28', JobPostalCode: '018960', JobAddress: '8 Marina View #11-01 Asia Square Tower 1',
                      CompanyID: '21', CountryID: '1', JobTypeID: '1', SalaryID: '21'
                    }).then(function (newjob) {
                      [16].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [6, 18].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  db['Job'].create(
                    {
                      JobID: '22', JobTitle: "Senior Shipping Executive (Trading/ MNC/ Perm/ LC)",
                      JobDescription: "",
                      JobQualification: "<ul><li><strong>Good import and export shipping knowledge for bulk shipping logistics to SEA markets</strong></li><li>Understands shipping incoterms</li><li>Experience in trading company (agricultural products) will be an advantage</li><li>Able to handle high volume of shipments and fast pace environment</li><li>Meticulous and a keen eye for details</li></ul>",
                      JobResponsibilities: "<ul><li>Able to independently excute end to end shipment documentation for bulk vessels and containers</li><li>Liaise with customers on shipment irregularities</li><li>Coordinate shipments and handling operational requirements</li><li>Liaise with internal and 3PL on logistics and shipment status</li><li>Check contracts from suppliers and prepare contracts to factory and customers</li><li>Handles Letter of Credit (LC) and bank negotiation</li></ul>",
                      JobPostDate: '2017-07-28', JobPostalCode: '228208', JobAddress: ' 1 Scotts Road, #18-08,Shaw Centre',
                      CompanyID: '22', CountryID: '1', JobTypeID: '1', SalaryID: '22'
                    }).then(function (newjob) {
                      [17].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [8, 19].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  db['Job'].create(
                    {
                      JobID: '23', JobTitle: "Digital Platform Manager",
                      JobDescription: "",
                      JobQualification: "<ul><li>You will have 5+ years' experience in digital transformation, digital marketing or digital innovation programs.</li><li>You will have a minimum of 3 years' experience in platform implementation and enjoy being a hands on subject matter expert.</li><li>A degree is required and candidates from pharma, marketing, sales, medical and digital agency are preferred.</li><li>You will be an expert in Adobe Marketing Cloud - Drupal - Adobe Target - Adobe Tag MGT - Adobe Analytics - Salesforce - Veeva Suite -CRM - CMS - Programmatic.</li></ul>",
                      JobResponsibilities: "MarTech, Adobe Campaign, Digital Innovation, Web Personalisation, digital platforms, implementation<br /><br />A leader in consumer healthcare are looking for a hands on expert Digital Platform Manager to support a newly formed digital transformation team. Expecting to travel 10-15% of the time across the region, you will be responsible for<ul><li>Use and implementation of effective digital marketing campaigns using Adobe Campaign Manager</li><li>Use and implementation of Adobe Analytics, Adobe Dynamic Tag Management, Adobe Target</li><li>Managing the CMS (Drupal preferred)</li></ul><br />You will be experienced in deployment of multiple websites across the region using content management tools like Drupal, and understand how to troubleshoot problems that might arise during the implementation process. More analytical in your approach, you will be proficient in data driven marketing, including expert use of digital marketing tools to get the message to the right customer segment. You will be able to independently implement full end-to-end campaigns with automation and email triggers from scratch to kick start new digital marketing teams in their use of these new tools.<br /><br /><br />You will work closely with the Digital Transformation Manager, Digital Content Manager and Digital Innovation Lead, supporting the transformation process across the business with your hands on technical and implementation knowledge. The ideal candidate will be well versed in regional legal compliance of roll out of digital tools, and be available to troubleshoot for country heads and key internal stakeholders on a regular basis. You will be accustomed to managing third party digital vendors.",
                      JobPostDate: '2017-07-28', JobPostalCode: '048624', JobAddress: '#27-20 UOB Plaza 2, 80 Raffles Place',
                      CompanyID: '23', CountryID: '1', JobTypeID: '1', SalaryID: '23'
                    }).then(function (newjob) {
                      [18].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [14].forEach(function (currentID) {
                        newjob.addJobFunction(currentID).then(function (result) { });
                      });
                    });

                  db['Job'].create(
                    {
                      JobID: '24', JobTitle: "Administrative Officer",
                      JobDescription: "Ensure all company procedures and protocols are followed at all times. Ensure there is a full understanding of operating functions of all machines including machine maintenance. You will be trained on these procedures and if anything is unclear, inform managers or supervisors.<br /><br />Always ensure that all clients&rsquo; instructions are clear before commencement of a job to guarantee efficiency and accuracy. If help is needed to complete a job the Operations managers or supervisors must be informed immediately.",
                      JobQualification: "You may also be required to perform electronic functions including:<br /><ul><li>Photocopying&nbsp;</li><li>Scanning</li><li>Printing</li><li>Delimiting</li><li>Pagination</li><li>Coding</li><li>Other processes as directed by management</li></ul>",
                      JobResponsibilities: "<strong>Pickup/Delivery/Despatch</strong><br/>You will be expected from time to time to pick up or deliver documents to our client&rsquo;s offices and it is expected that you will be well presented and polite when performing deliveries.<strong><br/><br/>Ancillary Processes</strong><br/>From time to time you will be required to perform Quality Assurance (QA) on all jobs completed by other staff members. Make sure all QA procedures are followed according to company guidelines.<br/><br/><strong>Administration and Procedure</strong><br/>As part of your main duties the Job Management System (JMS) must be fully understood and must always be updated accordingly. It is important that you are fully trained on all aspects of JMS. Managers and Supervisors must be informed when JMS cannot be accessed or updated.You will be asked to follow a number of procedural guidelines in your role. Some of these procedures will include invoicing of jobs. A thorough training session will occur to cover all aspects of invoicing and different requirements for different clients.All staff must also follow company procedures and standards which are related to punctuality, grooming and OHS.",
                      JobPostDate: '2017-07-28', JobPostalCode: '409179', JobAddress: '20 Jln Afifi',
                      CompanyID: '24', CountryID: '1', JobTypeID: '1', SalaryID: '24'
                    }).then(function (newjob) {
                      [19].forEach(function (currentId) {
                        newjob.addIndustry(currentId).then(function (result) { });
                      });
                      [3, 10].forEach(function (currentID) {
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
