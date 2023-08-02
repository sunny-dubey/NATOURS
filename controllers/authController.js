const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // 1-> if email and password actually exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2-> check if user exists and passowrd is correct
  const user = User.findOne({ email });
  // 3-> if everything ok, send token to client
  const token = '';
  res.status(200).json({
    status: 'success',
    token
  });
};
