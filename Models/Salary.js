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
            },
            set: function (val) {
                this.setDataValue('SalaryID');
            }
        },
        SalaryFrom: {
            type: DataTypes.DECIMAL(14, 2),
            allowNull: false,
            get: function () {
                return this.getDataValue('SalaryFrom');
            },
            set: function (val) {
                this.setDataValue('SalaryFrom');
            }
        },
        SalaryTo: {
            type: DataTypes.DECIMAL(14, 2),
            allowNull: false,
            get: function () {
                return this.getDataValue('SalaryTo');
            },
            set: function (val) {
                this.setDataValue('SalaryTo');
            }
        },
        Currency: {
            type: DataTypes.DECIMAL(14, 2),
            allowNull: false,
            get: function () {
                return this.getDataValue('Currency');
            },
            set: function (val) {
                this.setDataValue('Currency');
            }
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'salary',
            classMethods: {
                associate: function (models) {
                    Salary.belongsTo(models.Country, { foreignKey: 'CountryID', onDelete: 'CASCADE' });
                    Salary.hasOne(models.Job, { foreignKey: 'SalaryID', onDelete: 'CASCADE' });
                    //Salary.belongsTo(model.Userexperience, { foreignKey: 'UserExpID', onDelete: 'CASCADE' });
                }
            }
        });
    return Salary;
};