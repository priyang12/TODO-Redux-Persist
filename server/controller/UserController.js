const asyncHandler = require('express-async-handler');
const generateToken = require('../middleware/GenerateToken');

//modal
const User = require('../modals/UserModal');

const test = asyncHandler(async (req, res) => {
  res.json(req.headers.host);
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({ token: generateToken(user._id) });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Auth Register user & get token
// @route   POST /api/users/register
// @access  Public
const RegisterUser = asyncHandler(async (req, res) => {
  try {
    const { email, password, name, password2 } = req.body;
    if (password !== password2) {
      res.status(401);
      throw new Error('Password does not match');
    }
    const user = await User.findOne({ email });
    if (user) {
      res.status(401);
      throw new Error('Email already exist');
    } else {
      const user = await User();
      const valideEmail = await user.ValidteEmail(email);
      if (!valideEmail) {
        res.status(401);
        throw new Error('Enter Valid Email');
      }
      user.name = name;
      user.email = email;
      user.password = password;
      user.save();
      res.status(201).json({ token: generateToken(user._id) });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    Auth User Details
// @route   POST /api/users/register
// @access  Public
const LoadUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      res.status(401);
      throw new Error('User not Found');
    } else {
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const DeleteAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  test,
  LoadUser,
  RegisterUser,
  LoginUser,
  DeleteAccount,
};
