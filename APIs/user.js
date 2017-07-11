var user = module.exports = {};
var User = require('../Models').User;
var model = require('../Models');

/**
* Get the information of one User based on the ID from the database
* @param {int} id - User's ID
* @returns {string} JSON format of the User details
*/
user.getOneUser = function (id) {
    return new Promise(function (resolve, reject) {
        User.findOne({
            where: { UserID: id },
            attributes: { exclude: ['Password'] },
            include: [{ model: model.Country, attributes: ['CountryName'] }]
        }).then(function (data) {
            resolve(JSON.stringify(data));
        }).catch(function (error) {
            console.log("Error: " + error);
            reject(error.toString());
        });
    });
} //end of getOneUser()

/**
 * Update User information into the database
 * @param {int} id - UserID to update
 * @param {string} user - JSON format of updated user details
 * @returns {string} JSON format of updated user information
 */
user.updateAttributes = function (id, user) {
    return new Promise(function (resolve, reject) {
        User.find({ where: { UserID: id } })
            .then(function (gotuser) {
                if (gotuser) {
                    user["Password"] = User.generateHash(user["Password"]);
                    gotuser.update(user)
                        .then(function (update) {
                            resolve(JSON.stringify(update))
                        }).catch(function (error) {
                            console.log("Error: " + error)
                            reject(error.toString());
                        });
                }
            }).catch(function (error) {
                console.log("Error: " + error)
                reject(error.toString());
            });
    });
}; //end of updatAttributes()

/**
 * Destroy User information into the database
 * @param {string} user - JSON format of the user details
 */
user.destroy = function (user) {
    return new Promise(function (resolve, reject) {
        User.destroy(resume)
            .then(function (destroy) {
                resolve(JSON.stringify(destroy))
            }).catch(function (error) {
                console.log("Error:" + error);
                reject(error.toString());
            });
    });
};// end of detroy()


// /**
//  * Add User information into the database
//  * @param {string} user - JSON format of the user details
//  * @returns {string} JSON format of the information of the new User added
//  */
// user.addUser = function (user) {
//     return new Promise(function (resolve, reject) {
//         User.create(user).then(function (newUser) {
//             resolve(JSON.stringify(newUser))
//         }).catch(function (error) {
//             console.log("Error: " + error)
//             reject;
//         })
//     })
// }; //end of addUser() 