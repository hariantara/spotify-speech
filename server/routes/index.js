const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


router.get('/', (req, res) => {
  res.render('index.ejs', {title: 'INDEX',token: req.headers.token})
});
router.get('/login', userController.show_login_form());
router.post('/login', userController.auth());
router.get('/register', userController.show_reg_form());
router.post('/register', userController.create_account());

router.post('/verify', userController.verify_token())
module.exports = router
