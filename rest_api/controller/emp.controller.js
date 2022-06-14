const Emp = require('../model/emp.model');
const Dept = require('../model/dept.model')
const db = require('../config/db.config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config')

module.exports.signUp = async(req, res) => {

   //check email
   Emp.findOne({
       where: {email: req.body.email}
   })
   .then( (emp) => {
       if(emp)
       {
        res.status(400).send({message: "Failed! Email is already in use!"});
       }
       else {
           //
           Emp.create({
               email: req.body.email,
               password: bcrypt.hashSync(req.body.password, 8),
               firstName: req.body.firstName,
               lastName: req.body.lastName,
               email: req.body.email,
               deptId: req.body.deptId

           }).then( (user) => {
               res.status(200).send({res:user, message:'Employee was registered successfully'})
           })
           .catch( err => {
                res.status(500).send({ message: err.message })
            });
       }
   });
}



module.exports.signIn = (req, res) => {

    Emp.findOne({
        where: {
          email: req.body.email
        }
      })
        .then(user => {
          if (!user) {
            return res.status(404).send({error:true, message: "User Not found." });
          }
          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );
          if (!passwordIsValid) {
            return res.status(401).send({accessToken: null, message: "Invalid Password!" });
          }
          var token = jwt.sign({ emp_id: user.emp_id }, config.secret, {
            expiresIn: 86400 // 24 hours  -> 24(hours) * 3600(second)
          });

            res.status(200).send({
              emp_id: user.emp_id,           
              email: user.email,
              accessToken: token
            });
         
        })
        .catch(err => {
          res.status(500).send({error:true,  message: err.message });
        });

}

module.exports.getData = async(req,res) => {

       Emp.findAll({
        include: { model: Dept },
       
      })
  
     .then(result => { return res.status(200).send({result })})

      .catch(err => { res.status(500).send({ message:err.message }) });
  
};

module.exports.validateToken = (req, res, next) => {

  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
   
    Emp.findByPk(decoded.emp_id, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the employee.");
      if (!user) return res.status(404).send("No user found.");
      res.status(200).send(user.firstName);
      
    });
    res.status(200).send(decoded);
  });
   
}

module.exports.update = async(req, res) => {
  
  const id = req.params.userId;
  Emp.update({  email: req.body.email, password: bcrypt.hashSync(req.body.password, 8), firstName: req.body.firstName, lastName: req.body.lastName  }, 
      { where: {emp_id: req.params.userId} }
      ).then( () => {
          res.status(200).send({ message: 'updated successfully a user with id = ' + id });
      });

}


module.exports.deleteDept = async(req, res) => {
  
  const id = req.params.empEmpId;
  Dept.destroy({
    where:{ id: id }

  }).then( () => {
        res.status(200).send({ message: 'deleted successfully a user with id = ' + id });
    });

}

module.exports.pagination = async(req, res) => {

  
    try{
        
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.size);
        let sortfield = req.body.sortfield;
        let sortOrder = req.body.sortOrder;
    
        const offset = page ? page * limit : 0;
    
        let result = {};

                                
          result =  await Emp.findAndCountAll({
            attributes: ['emp_id', 'firstname', 'lastname'],
            limit : limit,
            offset : offset,
            order: [[sortfield || 'emp_id', sortOrder || 'ASC']]
            
             
          }, {include: { model: Dept }})
       
      
        const totalPages = Math.ceil(result.count / limit);

        const response = {
          "totalPages" : totalPages,
          "pageNumber" : page,
          "pageSize" : result.rows.length,
          "employees" : result.rows
        };
        res.send(response);

    }
    catch(error){

        res.status(500).send({message:'Can not complete paging request!', error:error.message})

    }
}

