const express = require('express');
const routes = express.Router();
const sql = require('../models/db')
routes.get('/', function(req, res){
    res.send({"Message": "needed route to do something"});
})
    

routes.post('/sign', (req, res)=>{

    const data = {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_pass: req.body.user_pass
    }

    //Comprobaciones necesarias to do.
    sql.query('SELECT * FROM Users where user_email=?', data.user_email,(err,result,fields)=>{
        if (err) return res.send({"message": "Internal error creating an account"});
        console.log(result);
        if (!result.length) {
            sql.query('INSERT INTO Users SET ?',data, (err, row)=>{
                if (err) return res.send({"code": 500,"message": err});
                if (row.affectedRows===1) {
                    res.send({
                        "code": 1,
                        "message": "account created successfully"
                    })
                }
            });
        }else{ 
            res.send({
                "code": 0,
                "message": "Email Address is actualy used"
            })
        }
    })
})


routes.post('/login', (req,res)=>{

   const LoginData = {
       user_email: req.body.user_email,
       user_pass: req.body.user_pass
   }

   sql.query('SELECT * FROM Users WHERE user_email=? and user_pass=?',[LoginData.user_email, LoginData.user_pass], (err,result,fields)=>{
        if(err) throw res.send({"message": "Internal error trying to login"});
        if (result.length===1) {
            res.send({"code": 0,"message": "Login correct.", "btnmsg": "Go Home"})
        }else{
            res.send({"code": 1,"message": "Email and password do not match.","btnmsg": "Retry"})
        }
   })

})



module.exports = routes;




