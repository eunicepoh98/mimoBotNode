# FYP Backend

## My Notes
### [Sequelize](http://docs.sequelizejs.com/)

What's "done"
+ Some models and get methods
+ relationships between tables

What needs to be done
+ seeding test data (working..)
+ advance querying (working..)
+ user search table

### [Wit.ai](https://wit.ai/)

What's "done"
+ api to load data into wit
+ api for frontend
+ able to handle search job, add work experience scenario

What needs to be done
+ integrate add work experience with database
+ testings

### Authentication/Security
>[Passport](http://passportjs.org)

>[JWT](https://www.sitepoint.com/using-json-web-tokens-node-js/)

What's "done"
+ generate and verify jwt token
+ sign in and sign up with local passport

What needs to be done
+ facebook access_token verification
+ other user columns
+ combining with other tables
+ saving resume to file system

### Need to create config.js file
Contents in config.js

```
var config = module.exports = {}

config.dbCredentials = {
    'database': '',
    'username': 'root',
    'password': '',
    "host": "localhost",
    "dialect": "mysql"
}

config.wit = {
    'appId': '', //Settings > API Details > App ID
    'serverToken': '' //Settings > API Details > Server Access Token
}

config.others = {
    'secretKey': ''
}
```

