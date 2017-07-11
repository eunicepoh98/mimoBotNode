//Salary Model
module.exports = function (sequelize, DataTypes) {
    var Salary = sequelize.define('Salary', {
        SalaryID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('SalaryID');
            }
        },
        SalaryFrom: {
            type: DataTypes.DECIMAL(14, 2),
            allowNull: false,
            get: function () {
                return this.getDataValue('SalaryFrom');
            },
            set: function (val) {
                this.setDataValue('SalaryFrom', val);
            }
        },
        SalaryTo: {
            type: DataTypes.DECIMAL(14, 2),
            allowNull: false,
            get: function () {
                return this.getDataValue('SalaryTo');
            },
            set: function (val) {
                this.setDataValue('SalaryTo', val);
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
            tableName: 'salary',
            classMethods: {
                associate: function (models) {
                    Salary.belongsTo(models.Currency, { foreignKey: 'CurrencyID', onDelete: 'CASCADE' });
                    Salary.hasOne(models.Job, { foreignKey: 'SalaryID', onDelete: 'CASCADE' });
                }
            }
        });
    return Salary;
};