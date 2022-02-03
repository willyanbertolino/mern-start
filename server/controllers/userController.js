const User = require('../models/User');
const CustomAPIError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require('../utils');

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password');

  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password');

  if (!user) {
    throw new CustomAPIError.NotFoundError(`No user with id ${req.params.id}`);
  }

  checkPermissions(req.user, user._id);

  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { id, field, value } = req.body;
  console.log(req.body);

  if (!id || !field || !value) {
    throw new CustomAPIError.BadRequestError(
      'Please provide correct credentials.'
    );
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    { [field]: value },
    { new: true, runValidators: true }
  );

  if (field === 'email') {
    await sendVerificationEmail({
      name,
      email,
      verificationToken,
      origin,
    });
  }

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new CustomAPIError.BadRequestError('Please provide both values');
  }

  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomAPIError.UnauthenticatedError('Invalid Credentials');
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Success! Password changed' });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
