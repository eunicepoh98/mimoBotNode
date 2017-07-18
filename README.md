# FYP Backend

## My Notes
### [Sequelize](http://docs.sequelizejs.com/)

What's "done"
+ APIs for all the tables

What needs to be done
+ seeding data
+ user search table
+ filter job with bookmark (one more)
+ resume upload (Hibba)

### [Wit.ai](https://wit.ai/)

What's "done"
+ API to load data and nlp
+ able to handle search job, add work experience scenario

What needs to be done
+ integrate add work experience with database
+ testings

### Authentication/Security
>[Passport](http://passportjs.org)

>[JWT](https://www.sitepoint.com/using-json-web-tokens-node-js/)

What's "done"
+ generate, verify and renew jwt token
+ sign in and sign up with local passport

What needs to be done
+ facebook access_token signup and signin
+ jwt for all routes

### Need to create config.js file
Contents in config.js

```
var config = module.exports = {}

config.dbCredentials = {
    'database': 'database_name',
    'username': 'root',
    'password': '',
    "host": "localhost",
    "dialect": "mysql"
}

config.wit = {
    'appId': '', //Settings > API Details > App ID
    'serverToken': '' //Settings > API Details > Server Access Token
}

config.fbAdminCredentials = {
    // firebase admin key
}

config.others = {
    'secretKey': ''
}
```

