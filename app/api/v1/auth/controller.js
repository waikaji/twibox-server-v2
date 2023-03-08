const { signin, register } = require('../../../services/sequelize/auth');
const { StatusCodes } = require('http-status-codes');

const signinUser = async (req, res, next) => {
  try {
    const result = await signin(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

const registerUser = async (req, res, next) => {
  try {
    const result = await register(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { signinUser, registerUser };
