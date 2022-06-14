const Dept = require('../model/dept.model');

module.exports.createDept = async(req, res, next) => {

   
    Dept.create({
        department: req.body.department,
        empEmpId : req.body.empEmpId

    }).then( (dept) => {
       
        res.status(200).send({res:dept, message:'Department was inserted successfully'})
        
    })
    .catch( err => {
       
         res.status(500).send({ message: err.message })
     });


}
