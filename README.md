# FYP Backend

## My Notes
### [Sequelize](http://docs.sequelizejs.com/)

What's "done"
+ Some models and get methods

What needs to be done
+ create methods
+ relationships
+ seeding data
+ advance querying

### [Wit.ai](https://wit.ai/)

What's "done"
+ controllers/methods for handling nature language and loading wit with data (not tested)

What needs to be done
+ create api for frontend
+ api to wit.ai
+ redo stories in wit
+ handling response from wit

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

