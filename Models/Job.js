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
        },
        JobQualification: {
            type: DataTypes.STRING(9000),
            get: function () {
                return this.getDataValue('JobQualification');
            },
            set: function (val) {
                this.setDataValue('JobQualification');
            }
        },
        JobResponsibilities: {
            type: DataTypes.STRING(9000),
            get: function () {
                return this.getDataValue('JoResponsibilities');
            },
            set: function (val) {
                this.setDataValue('JoResponsibilities');
            }
        },
        JobPostDate: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('JobPostDate');
            },
            set: function (val) {
                this.setDataValue('JobPostDate');
            }
        },
        JobPostalCode: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('JobPostalCode');
            },
            set: function (val) {
                this.setDataValue('JobPostalCode');
            }
        },
        JobAddress: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('JobAddress');
            },
            set: function (val) {
                this.setDataValue('JobAddress');
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
                    Job.belongsToMany(models.Industry, { through: 'jobindustry', foreignKey: 'JobID', onDelete: 'CASCADE', timestamps: false });
                    Job.belongsToMany(models.JobFunction, { through: 'jobfunctionjob', foreignKey: 'JobID', onDelete: 'CASCADE', timestamps: false });
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


