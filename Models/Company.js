//Company Model
module.exports = function (sequelize, DataTypes) {
    var Company = sequelize.define('Company', {
        CompanyID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('CompanyID');
            },
            set: function (val) {
                this.setDataValue('CompanyID');
            }
        },
        CompanyName: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('CompanyName');
            },
            set: function (val) {
                this.setDataValue('CompanyName');
            }
        },
        CompanyAddress: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('CompanyAddress');
            },
            set: function (val) {
                this.setDataValue('CompanyAddress');
            }
        },
        CompanyPostalCode: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('CompanyPostalCode');
            },
            set: function (val) {
                this.setDataValue('CompanyPostalCode');
            }
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'company',
            classMethods: {
                associate: function (models) {
                    Company.hasMany(models.Job, { foreignKey: 'CompanyID', onDelete: 'CASCADE' });
                }
            }
        });
    return Company;
};

