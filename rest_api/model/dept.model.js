const Emp = require('./emp.model')
const Sequelize = require('sequelize');

const sequelize = require('../config/db.config')
   const Dept =  sequelize.define('dept', {
 
        department: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                    notNull: {msg: 'department can not be null' },
                    notEmpty: { msg: 'department can not be empty'}
                },
        }

   }, {
        timestamps:false,
        freezeTableName: true
        
    })


    module.exports = Dept;

    Dept.hasMany(Emp, {allowNull:false});
    Emp.hasOne(Dept, {allowNull:false})
   
   

