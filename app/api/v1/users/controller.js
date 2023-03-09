const { getUserByEmail, getUserById, updatePassword, updateUserProfile, updateProfilePicture } = require('../../../services/sequelize/users');
const { StatusCodes } = require('http-status-codes');

const findEmail = async (req, res, next) => {
  try {
    const result = await getUserByEmail(req);

    res.status(StatusCodes.OK).json({
      data: result
    });
  } catch (err) {
    next(err);
  }
}

const findUserId = async (req, res, next) => {
  try {
    const result = await getUserById(req);

    res.status(StatusCodes.OK).json({
      data: result
    });
  } catch (err) {
    next(err);
  }
}

const editPassword = async (req, res, next) => {
  try {
    const _ = await updatePassword(req);

    res.status(StatusCodes.OK).json({
      msg: "Password changed successfully"
    });
  } catch (err) {
    next(err);
  }
}

const editUserProfile = async (req, res, next) => {
  try {
    const _ = await updateUserProfile(req);

    res.status(StatusCodes.OK).json({
      msg: "Profile has been changed successfully"
    });
  } catch (err) {
    next(err);
  }
}

const editProfilePicture = async (req, res, next) => {
  try {
    const _ = await updateProfilePicture(req);

    res.status(StatusCodes.OK).json({
      msg: "Image Profile has been changed successfully"
    })
  } catch (err) {
    next(err);
  }
}

module.exports = { findEmail, findUserId, editPassword, editUserProfile, editProfilePicture };