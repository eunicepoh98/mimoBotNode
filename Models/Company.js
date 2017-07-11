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
                this.setDataValue('CompanyID', val);
            }
        },
        CompanyName: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('CompanyName');
            },
            set: function (val) {
                this.setDataValue('CompanyName', val);
            }
        },
        CompanyAddress: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('CompanyAddress');
            },
            set: function (val) {
                this.setDataValue('CompanyAddress', val);
            }
        },
        CompanyPostalCode: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('CompanyPostalCode');
            },
            set: function (val) {
                this.setDataValue('CompanyPostalCode', val);
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
            set: function (val) {
                this.setDataValue('LastUpdated', val);
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

