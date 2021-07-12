const express = require('express');
const router = express.Router();

const {
  test,
  LoadUser,
  RegisterUser,
  LoginUser,
  DeleteAccount,
} = require('../controller/UserController');

const Auth = require('../middleware/Auth');

router.route('/test').get(test);

router
  .route('/login')
  .post(LoginUser)
  .get(Auth, LoadUser)
  .delete(Auth, DeleteAccount);
router.route('/register').post(RegisterUser);
module.exports = router;
