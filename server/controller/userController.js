var modelUser = require('../models/user')
var jwt =  require('jsonwebtoken')
var helper = require('../helper/helper')
require('dotenv').config()


var createUser = function(req, res){
  user = new modelUser();
  user.username = req.body.username
  user.password = req.body.password
  user.salt = req.body.salt
  user.role = 'user'
  user.createdAt = new Date()
  user.updatedAt = new Date()

  let salt = helper.randomValueHex(12);
  user.password = helper.cryptoGraph(user.password, salt)
  user.salt = salt

  user.save(function(err){
    if(!err){
      res.send(user)
    }
    else {
      res.send(err)
    }
  })
}

var signinUser = function(req, res){
  if(!req.body.username || !req.body.password)
  {
    res.send('Enter the fields please')
  }
  else {
    modelUser.findOne({
      username:req.body.username
    })
    .then(data=>{
      console.log("=x=x=x>",data);
      // let salt = helper.randomValueHex(12);
      req.body.password = helper.cryptoGraph(req.body.password, data.salt)
      console.log("CUKKKK",req.body.password);
      if(data.password == req.body.password)
      {
        var token = jwt.sign({
          _id:data.id,
          username:req.body.username,
          role:data.role
        }, process.env.SECRETKEY);
        console.log("===>", token);
        res.send(token)
      }
    })
  }
}

var readUser = function(req, res){
  modelUser.find(function(err, data){
    if(!err){
      res.send(data)
    }
    else{
      res.send(err)
    }
  })
}

module.exports = {
  createUser,
  signinUser,
  readUser
}
