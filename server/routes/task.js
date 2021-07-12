const express = require('express');
const router = express.Router();

const {
  AddTask,
  GetTask,
  GetALLTask,
  UpdateTask,
  DeleteTask,
} = require('../controller/TaskController');

const Auth = require('../middleware/Auth');

router.route('/').post(Auth, AddTask).get(Auth, GetALLTask);

router
  .route('/:id')
  .get(Auth, GetTask)
  .put(Auth, UpdateTask)
  .delete(Auth, DeleteTask);

module.exports = router;
