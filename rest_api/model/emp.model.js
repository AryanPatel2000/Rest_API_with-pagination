const Sequelize = require('sequelize')
const sequelize = require('../config/db.config')

    const Emp = sequelize.define('emp', {
        emp_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
             allowNull : false,
           validate: {
                notNull: {
                    msg: 'An email is required',
                   
                    },
                 isEmail: {
                     msg: 'Please use the correct email format : user@example.com'
                    
                    },
                    notEmpty: { msg: 'Email can not be empty'}
                },
           
             },

             password: {
                type: Sequelize.STRING,
                allowNull : false,
                validate: {
                    notNull: { msg: 'password  is required' }, 
                    notEmpty: { msg: 'Password can not be empty'},              
                },
            },

             firstName: {
                type: Sequelize.STRING,
                allowNull : false,
                validate: {
                    notNull: {
                        msg: 'First name is required',
                       
                    }, 
                    notEmpty: { msg: 'First name can not be empty'}              
                },
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull : false,
                validate: {
                    notNull: {
                        msg: 'Last name is required',
                       
                    }, 
                    notEmpty: { msg: 'Last name can not be empty'}              
                },
            },
           
    }, {
        freezeTableName: true,
        timestamps: false
    })

    module.exports = Emp
   


