# FYP Backend

## My Notes
### [Sequelize](http://docs.sequelizejs.com/)

What's "done"
+ Some models and get methods
+ relationships between tables

What needs to be done
+ seeding test data (working..)
+ advance querying (working..)
+ basic crud for fun
+ user search table
+ create record for job

### [Wit.ai](https://wit.ai/)

What's "done"
+ api to load data into wit
+ api for frontend
+ able to handle search job scenario

What needs to be done
+ No option to reject path
+ shorten response timing?
+ story flow for update work experience
+ attaching list of industry/job function/job type in context (load from db)

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
```

