//Job Model
module.exports = function (sequelize, DataTypes) {
    var Job = sequelize.define('Job', {
        JobID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            get: function () {
                return this.getDataValue('JobID');
            },
            set: function (val) {
                this.setDataValue('JobID');
            }
        },
        JobTitle: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('JobTitle');
            },
            set: function (val) {
                this.setDataValue('JobTitle');
            }
        },
        JobDescription: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('JobDescription');
            },
            set: function (val) {
                this.setDataValue('JobDescription');
            }
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'job',
            classMethods: {
                associate: function (models) {
                    Job.belongsTo(models.JobType, { foreignKey: 'JobTypeID', onDelete: 'CASCADE' }); //, targetKey: 'JobTypeID'
                    Job.belongsTo(models.Company, { foreignKey: 'CompanyID', onDelete: 'CASCADE' });
                    Job.belongsTo(models.Country, { foreignKey: 'CountryID', onDelete: 'CASCADE' });
                    Job.belongsTo(models.Salary, { foreignKey: 'SalaryID', onDelete: 'CASCADE' });
                    Job.belongsToMany(models.Industry, { through: 'jobindustry', foreignKey: 'JobID', onDelete: 'CASCADE' });
                    Job.belongsToMany(models.JobFunction, { through: 'jobfunctionjob', foreignKey: 'JobFunctionID', onDelete: 'CASCADE' });
                    //Job.hasMany(models.UserBookmark, { foreignKey: 'JobID', onDelete: 'CASCADE' });
                }
            }
        });
    // // force: true will drop the table if it already exists
    // Job.sync({ force: true }).then(() => {
    //     // Table created
    //     return Job.create({
    //         JobTitle: 'Job1',
    //         JobDescription: 'This Job 1'
    //     },
    //         {
    //             JobTitle: 'Job2',
    //             JobDescription: 'This Job 2'
    //         });
    // });
    return Job;
};


