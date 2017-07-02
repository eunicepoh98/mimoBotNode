//Currency Model
module.exports = function (sequelize, DataTypes) {
    var Currency = sequelize.define('Currency', {
        CurrencyID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('CurrencyID');
            },
            set: function (val) {
                this.setDataValue('CurrencyID', val);
            }
        },
        CurrencyCode: {
            type: DataTypes.STRING,
            allowNull: false,
            get: function () {
                return this.getDataValue('CurrencyCode');
            },
            set: function (val) {
                this.setDataValue('CurrencyCode', val);
            }
        },
        Symbol: {
            type: DataTypes.STRING,
            allowNull: false,
            get: function () {
                return this.getDataValue('Symbol');
            },
            set: function (val) {
                this.setDataValue('Symbol', val);
            }
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'currency',
            classMethods: {
                associate: function (models) {
                    Currency.hasMany(models.Salary, { foreignKey: 'CurrencyID', onDelete: 'CASCADE' });
                }
            },
        });
    return Currency;
};

