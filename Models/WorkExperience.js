var moment = require('moment');
//Work Experience model
module.exports = function (sequelize, DataTypes) {
    var WorkExperience = sequelize.define('WorkExperience', {
        WorkExperienceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('WorkExperienceID');
            }
        },
        CompanyName: {
            type: DataTypes.STRING(),
            allowNull: false,
            get: function () {
                return this.getDataValue('CompanyName');
            },
            set: function (val) {
                this.setDataValue('CompanyName', val);
            }
        },
        Role: {
            type: DataTypes.STRING(),
            allowNull: false,
            get: function () {
                return this.getDataValue('Role');
            },
            set: function (val) {
                this.setDataValue('Role', val);
            }
        },
        Description: {
            type: DataTypes.STRING(),
            allowNull: false,
            get: function () {
                return this.getDataValue('Description');
            },
            set: function (val) {
                this.setDataValue('Description', val);
            }
        },
        StartDate: {
            type: DataTypes.DATE,
            allowNull: false,
            get: function () {
                return this.getDataValue('StartDate');
            },
            set: function (val) {
                this.setDataValue('StartDate', moment(val).toISOString());
            }
        },
        EndDate: {
            type: DataTypes.DATE,
            allowNull: true,
            get: function () {
                return this.getDataValue('EndDate');
            },
            set: function (val) {
                if (val != "null    ") {
                    console.log(val)
                    this.setDataValue('EndDate', moment(val).toISOString());
                } else {
                    this.setDataValue('EndDate', val);
                }
            }
        },
        RecordStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'A',
            get: function () {
                return this.getDataValue('RecordStatus');
            },
            set: function (val) {
                this.setDataValue('RecordStatus', val);
            }
        },
        LastUpdated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get: function () {
                return this.getDataValue('LastUpdated');
            },
            set: function () {
                this.setDataValue('LastUpdated', new Date().toISOString().slice(0, 19));
            }
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'workexperience',
            classMethods: {
                associate: function (models) {
                    WorkExperience.belongsTo(models.User, { foreignKey: 'UserID', onDelete: 'CASCADE' });
                }
            }
        });
    return WorkExperience;
};