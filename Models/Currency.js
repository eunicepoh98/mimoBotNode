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
            tableName: 'currency',
            classMethods: {
                associate: function (models) {
                    Currency.hasMany(models.Salary, { foreignKey: 'CurrencyID', onDelete: 'CASCADE' });
                }
            },
        });
    return Currency;
};

