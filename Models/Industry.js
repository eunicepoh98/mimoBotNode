//Industry Model
module.exports = function (sequelize, DataTypes) {
    var Industry = sequelize.define('Industry', {
        IndustryID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('IndustryID');
            },
            set: function (val) {
                this.setDataValue('IndustryID', val);
            }
        },
        IndustryName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            get: function () {
                return this.getDataValue('IndustryName');
            },
            set: function (val) {
                this.setDataValue('IndustryName', val);
            }
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'industry',
            classMethods: {
                associate: function (models) {
                    Industry.belongsToMany(models.Job, { through: 'jobindustry', foreignKey: 'IndustryID', onDelete: 'CASCADE', timestamps: false });
                    //Industry.belongsTo(models.Userexperience, { foreignKey: 'UserExpID', onDelete: 'CASCADE' });
                    //Industry.hasMany(models.UserSearch, { foreignKey: 'IndustryID', onDelete: 'CASCADE' });
                }
            }
        });
    return Industry;
};

