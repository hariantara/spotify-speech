const User = require('../models/User')
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

class UserController {

  static show_reg_form(){
    return (req, res) => {
      // res.send({form:"form_register"})
      res.render('register.ejs', {title: 'register'})
    }
  }

  static show_login_form(){
    return (req, res) => {
      // res.send({form:"form_login"})
      res.render('login.ejs', {title: 'login'})
    }
  }

  static create_account(){
    return (req, res) => {
      let salt = bcrypt.genSaltSync(10);
      let pass_hash = bcrypt.hashSync(req.body.password, salt);
      User.create({
        username: req.body.username,
        password: pass_hash
      })
      .then(user => {
        console.log({
          message: 'Insert Success',
          data: user
        })
        // res.redirect('/login')
        res.send({
          message: 'Insert Success',
          data: user,
          redirect: './login.html' 
        })
      })
      .catch(err => {
        console.log("data error: "+ err)
        res.send({error: err})
      })
    }
  }

  static auth(){
    return (req, res) => {
      console.log(req.body.username);
      User.findOne({
        username: req.body.username
      })
      .then(userData => {
        console.log('data user:' + userData);
        if(userData === null){
          res.send({userdata: userData})
        }


        if(bcrypt.compareSync(req.body.password, userData.password)) {  // userData.password === req.body.password
          console.log('masuk if');
          jwt.sign({
            id: userData._id,
            username: userData.username
          }, "qwertyuiop", (err, token) => {
            console.log("token : " + token);
            if(err) {
              console.log(err);
              res.send(err)
            } else {
              console.log(token);
              res.send({token: token, redirect: './dashboard.html'})
              // req.headers.token = token
              // res.render('index.ejs', {title: 'INDEX',token: token}) // ,
              // res.redirect('/') // ,
            }
          })
        } else {
          res.status(401).send({
              status:401,
              message: 'Username or password didnt match'
          })

        }
      })
    }
  }

  static verify_token(){
    return (req, res) => {
      jwt.verify(req.body.token, "qwertyuiop", (err, decoded) => {
        if(err) {
          res.send(err)
        } else {
          console.log(decoded);
          decoded.message = "valid_token"
          res.send(decoded)
          // req.username = decoded.username
          // req.id_user = decoded.id
          // req.role = decoded.role
          // next()
        }
      })
    }
  }



}



module.exports = UserController
