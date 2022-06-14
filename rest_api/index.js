require('dotenv').config()
const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const sequelize = require('./config/db.config');
const Emp = require('./model/emp.model');
const Dept = require('./model/dept.model')


sequelize.sync({force:true})
.then( () => {
    console.log('force and Resync Db')
})


const route = require('./routes/routes')

app.use('/', route);

app.get('/', (req, res) => {
    res.send('Working..')
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('Server listening on port', port);
})