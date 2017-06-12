//Country Model
module.exports = function (sequelize, DataTypes) {
    var Country = sequelize.define('Country', {
        CountryID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('CountryID');
            },
            set: function (val) {
                this.setDataValue('CountryID');
            }
        },
        CountryName: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('CountryName');
            },
            set: function (val) {
                this.setDataValue('CountryName');
            }
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'country',
            classMethods: {
                associate: function (models) {
                    Country.hasMany(models.Job, { foreignKey: 'CountryID', onDelete: 'CASCADE' });
                    Country.hasMany(models.Salary, { foreignKey: 'SalaryID', onDelete: 'CASCADE' });
                }
            },
        });
    return Country;
};

