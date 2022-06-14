const auth = require('../middleware/auth');
const empController = require('../controller/emp.controller')
const deptController = require('../controller/dept.controller')
const express = require('express');
const router = express.Router();
const Emp = require('../model/emp.model')

//router.post('/signUp', auth, controller.signUp)

router.post('/signUp', empController.signUp)
router.post('/createDept', deptController.createDept)
router.post('/signIn',empController.signIn )

router.get('/getData', empController.getData)

router.get('/get', empController.validateToken )

router.put('/update/:userId', auth, empController.update )

router.delete('/deleteDept/:empEmpId', empController.deleteDept)

router.get('/pagination', empController.pagination)


module.exports = router;