const Users = require('../../api/v1/users/model');
const bcrypt = require('bcryptjs');
const { createJWT, createTokenUser, createRefreshJWT } = require('../../utils');
const { BadRequestError, UnauthenticatedError, NotFoundError, UnauthorizedError } = require('../../errors');
const { createUserRefreshToken } = require('./refreshToken');
const { otpMail } = require('../mail');

const signin = async (req) => {
  const {email, password} = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const result = await Users.findOne({ where: { email } });

  if (!result) {
    throw new UnauthenticatedError('Check your email and password.');
  }

  if (result.status === 'disabled') {
    throw new UnauthorizedError('Your account is not active');
  }
  let token;
  let refreshToken;

  if (await bcrypt.compare(password, result.password)) {
    token = createJWT({ payload: createTokenUser(result) });

    refreshToken = createRefreshJWT({ payload: createTokenUser(result) });

    await createUserRefreshToken({
      refreshToken,
      id_user: result.id,
    })
  } else {
    throw new UnauthenticatedError('Check your email and password');
  }

  return { token, refreshToken, email: result.email};
}

const register = async (req) => {
  const {
    fullname,
    email,
    password,
    confirmPassword
  } = req.body;

  const checkUser = await Users.findOne({where: {
    email
  }});

  if (checkUser) {
    throw new UnauthenticatedError('Email is already registered');
  }

  if (password !== confirmPassword) {
    throw new UnauthenticatedError('Confirm Password do not match');
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await Users.create({
    fullname,
    email,
    password: hashedPassword,
    status: 'disabled',
    otp: Math.floor(Math.random() * 9999),
    url: 'uploads/avatar/default.jpg'
  });

  await otpMail(email, result);
  delete result.dataValues.password;
  delete result.dataValues.otp;

  return result;
}

const activateUser = async (req) => {
  const { otp, email } = req.body;
  const check = await Users.findOne({where: {
    email
  }})

  if (!check) throw new NotFoundError('Email is not registered');

  if (check && check.otp !== otp) throw new BadRequestError('Wrong OTP number');

  const result = await Users.update(
    { status: 'active' },
    { where: { email } }
  )

  delete result.dataValues.password;

  return result;

}

module.exports = { signin, register, activateUser };