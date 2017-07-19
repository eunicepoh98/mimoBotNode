# FYP Backend

## My Notes
### [Sequelize](http://docs.sequelizejs.com/)

What's "done"
+ APIs for all the tables

What needs to be done
+ seeding data
+ add synonyms column, load wit entities values with that, api to add synonyms ****
+ edit get jobs filtering *** (add search in synonyms column)
+ get applications *
+ add job [include company] api, view? *
+ resume upload (Hibba)

### [Wit.ai](https://wit.ai/)

What's "done"
+ API to load data and nlp
+ able to handle search job, add work experience scenario **

What needs to be done
+ integrate add work experience, usersearch with database 
+ testings + training

### Authentication/Security
>[Passport](http://passportjs.org)

>[JWT](https://www.sitepoint.com/using-json-web-tokens-node-js/)

What's "done"
+ generate, verify and renew jwt token
+ sign in and sign up with local passport & facebook

What needs to be done
+ verify jwt for all routes

### Need to create config.js file
Contents in config.js

```
var config = module.exports = {}

// MySQL Credentials
config.dbCredentials = {
    'database': 'database_name',
    'username': 'root',
    'password': '',
    "host": "localhost",
    "dialect": "mysql"
}

// Wit.ai Credentials
config.wit = {
    'appId': '', //Settings > API Details > App ID
    'serverToken': '' //Settings > API Details > Server Access Token
}

// Facebook Credentials
config.facebook = {
    'clientID': '',
    "clientSecret": ''
}

// Firebase Admin Credentials
config.fbAdminCredentials = {
    // firebase admin key
}

// JWT Credentials
config.others = {
    'secretKey': ''
}
```

