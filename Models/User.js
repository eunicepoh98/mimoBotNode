var bcrypt = require("bcrypt-nodejs");
//User model
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('UserID');
            },
            set: function (val) {
                this.setDataValue('UserID');
            }
        },
        Email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            get: function () {
                return this.getDataValue('Email');
            },
            set: function (val) {
                this.setDataValue('Email', val);
            }
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: true,
            get: function () {
                return this.getDataValue('Password');
            },
            set: function (val) {
                this.setDataValue('Password', val);
            }
        },
        UserName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            get: function () {
                return this.getDataValue('UserName');
            },
            set: function (val) {
                this.setDataValue('UserName', val.toUpperCase());
            }
        },
        DOB: {
            type: DataTypes.DATE,
            allowNull: false,
            get: function () {
                return this.getDataValue('DOB');
            },
            set: function (val) {
                this.setDataValue('DOB', val);
            }
        },
        Address: {
            type: DataTypes.TEXT,
            allowNull: false,
            get: function () {
                return this.getDataValue('Address');
            },
            set: function (val) {
                this.setDataValue('Address', val);
            }
        },
        Gender: {
            type: DataTypes.STRING(10),
            allowNull: false,
            get: function () {
                return this.getDataValue('Gender');
            },
            set: function (val) {
                this.setDataValue('Gender', val);
            }
        },
        DateRegistered: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get: function () {
                return this.getDataValue('DateRegistered');
            },
            set: function (val) {
                this.setDataValue('DateRegistered', val);
            }
        },
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'user',
            classMethods: {
                associate: function (models) {
                    User.hasMany(models.WorkExperience, { foreignKey: 'UserID', onDelete: 'CASCADE' });
                    User.belongsTo(models.Country, { foreignKey: 'CountryID', onDelete: 'CASCADE' });
                    // User.hasMany(models.Resume, { foreignKey: 'UserID', onDelete: 'CASCADE' });
                    // User.hasMany(models.Notification, { foreignKey: 'UserID', onDelete: 'CASCADE' });
                    // User.hasMany(models.UserBookmark, { foreignKey: 'UserID', onDelete: 'CASCADE' });
                },
                generateHash: function (password) {
                    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                }
            },
            instanceMethods: {
                validPassword: function (password) {
                    return bcrypt.compareSync(password, this.Password);
                }
            }
        });
    return User;
};