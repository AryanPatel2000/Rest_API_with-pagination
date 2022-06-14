const Sequelize = require('sequelize');
const sequelize = new Sequelize('rest_api_db', 'root', '', {
    dialect : 'mysql'
})

sequelize.authenticate()
.then( () => { console.log('Connection Estlablished')})
.catch( (err => {console.log(err)}))

// const db = {}
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

//models

// db.Emp = require('../model/emp.model')(sequelize, Sequelize);
// db.Dept = require('../model/dept.model')(sequelize, Sequelize);
//db.User = require('../model/user.model')(sequelize, Sequelize);

module.exports = sequelize;