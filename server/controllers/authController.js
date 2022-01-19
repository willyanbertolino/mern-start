const User = require('../models/User');
const Token = require('../models/Token');
const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../errors');
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
} = require('../utils');
const crypto = require('crypto');
const origin = `${process.env.SEND_EMAIL_ORIGIN}`;

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const verificationToken = crypto.randomBytes(40).toString('hex');

  if (!name || !email || !password || password.length < 6) {
    throw new CustomAPIError.BadRequestError(
      'Name and email is required and Password must have 6 or more characters!'
    );
  }

  const user = await User.findOne({ email });
  if (user) {
    throw new CustomAPIError.BadRequestError(
      'You already have an account, please login!'
    );
  }

  await sendVerificationEmail({
    name,
    email,
    verificationToken,
    origin,
  });

  await User.create({ name, email, password, verificationToken });

  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomAPIError.UnauthenticatedError('Verification failed');
  }

  if (user.verificationToken !== verificationToken) {
    throw new CustomAPIError.UnauthenticatedError('Verification failed');
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = '';

  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Email verified' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomAPIError.BadRequestError(
      'Please provide email and password'
    );
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new CustomAPIError.UnauthenticatedError(
      'There is no user registered with this email'
    );
  }

  if (!user.isVerified) {
    throw new CustomAPIError.UnauthenticatedError('Please verify your email');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomAPIError.UnauthenticatedError('Password Incorrect');
  }

  const tokenUser = createTokenUser(user);

  // create refresh token
  let refreshToken = '';

  // check for existing token
  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new CustomAPIError.UnauthenticatedError('Invalid Credentials');
    }
    refreshToken = existingToken.refreshToken;

    attachCookiesToResponse({ res, user: tokenUser, refreshToken });

    res.status(StatusCodes.OK).json({ user: tokenUser });

    return;
  }

  refreshToken = crypto.randomBytes(40).toString('hex');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;

  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged out' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!email || !user) {
    throw new CustomAPIError.BadRequestError('Please provide valid email');
  }

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString('hex');

    // send email
    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Please check your email for reset password link' });
};

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;

  if (!password) {
    throw new CustomAPIError.BadRequestError('Please enter new password');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomAPIError.BadRequestError(
      `The user with email ${email} is not registered`
    );
  }

  console.log(user);

  if (user) {
    const currentDate = new Date();

    if (user.passwordTokenExpirationDate <= currentDate) {
      throw new CustomAPIError.BadRequestError(
        'token expired, please request new confirmation email again'
      );
    }

    if (user.passwordToken !== createHash(token)) {
      throw new CustomAPIError.BadRequestError(
        'invalid token, please request new confirmation email again'
      );
    }

    user.password = password;
    user.passwordToken = null;
    user.passwordTokenExpirationDate = null;

    await user.save();
  }

  res.send('password reseted');
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
