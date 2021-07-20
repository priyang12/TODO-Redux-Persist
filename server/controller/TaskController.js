const asyncHandler = require('express-async-handler');

//modal
const TaskModal = require('../modals/TaskModal');

// @desc    Add Task
// @route   POST /api/task
// @access  Private
const AddTask = asyncHandler(async (req, res) => {
  try {
    const { Title, Deadline, Imporantancy, TaskDescription } = req.body;

    const task = await TaskModal.create({
      user: req.user.id,
      Title,
      Deadline,
      Imporantancy,
      TaskDescription,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400);
    throw new Error('Task Server Error' + error);
  }
});

// @desc    Get Task by Id
// @route   GET /api/task/id
// @access  Private
const GetTask = asyncHandler(async (req, res) => {
  try {
    const task = await TaskModal.findById(req.params.id);
    if (!task) {
      res.status(400);
      throw new Error('Cant Find the Task');
    } else {
      res.status(201).json(task);
    }
  } catch (error) {
    res.status(400);
    throw new Error('Task Server Error' + error);
  }
});

// @desc    Get All user Tasks
// @route   GET /api/task
// @access  Private
const GetALLTask = asyncHandler(async (req, res) => {
  try {
    const id = req.user.id;
    const keyword = req.query.keyword
      ? {
          Title: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    const tasks = await TaskModal.find({ user: id, ...keyword });
    if (!tasks) {
      res.status(400);
      throw new Error('Cant Find the Tasks');
    } else {
      if (tasks.length > 0) res.status(201).json(tasks);
      else res.status(201).json(tasks);
    }
  } catch (error) {
    res.status(400);
    throw new Error('Task Server Error' + error);
  }
});

// @desc    Update Task
// @route   PUT /api/task
// @access  Private
const UpdateTask = asyncHandler(async (req, res) => {
  try {
    const { Title, Deadline, Imporantancy, TaskDescription, Status } = req.body;
    const task = await TaskModal.findById(req.params.id);
    if (!task) {
      res.status(400);
      throw new Error('Cant Find the Tasks');
    } else {
      task.Title = Title ? Title : task.Title;
      task.Deadline = Deadline ? Deadline : task.Deadline;
      task.Imporantancy = Imporantancy ? Imporantancy : task.Imporantancy;
      task.TaskDescription = TaskDescription
        ? TaskDescription
        : task.TaskDescription;
      task.Status = Status ? Status : task.Status;
      task.save();
      res.status(201).json(task);
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error('Task Server Error' + error);
  }
});

// @desc    Auth user & get token
// @route   PUT /api/users/login
// @access  Private
const DeleteTask = asyncHandler(async (req, res) => {
  try {
    const task = await TaskModal.findById(req.params.id);
    await task.remove();
    res.status(201).json({ msg: 'Task is Deleted', task_id: task._id });
  } catch (error) {
    res.status(400);
    throw new Error('Task Server Error' + error);
  }
});
module.exports = {
  AddTask,
  GetTask,
  GetALLTask,
  UpdateTask,
  DeleteTask,
};
