const Users = require('../../api/v1/users/model');
const bcrypt = require('bcryptjs');
const { NotFoundError, UnauthenticatedError, BadRequestError } = require('../../errors');
const fs = require('fs');

const getUserById = async (req) => {
  const { id } = req.params;

  const result = await Users.findOne({where: { id }});

  if (!result) {
    throw new NotFoundError('User not found.');
  }

  delete result.dataValues.password;
  delete result.dataValues.otp;

  return result;
}

const getUserByEmail = async (req) => {
  const { email } = req.user;

  const result = await Users.findOne({where: { email }});

  if (!result) {
    throw new NotFoundError('User not found.');
  }

  delete result.dataValues.password;
  delete result.dataValues.otp;

  return result;
}

const updateUserProfile = async (req) => {
  const { fullname } = req.body;
  const { email } = req.user;

  const result = await Users.update({fullname}, {where: { email } });

  if(result[0] === 0){
    throw new NotFoundError('User not found');
  } 
  
  return result;
}

const updatePassword = async (req) => {
  const { password, confirmPassword } = req.body;
  const { email } = req.user;

  if (password !== confirmPassword) {
    throw new UnauthenticatedError('Confirm Password do not match');
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await Users.update({ password: hashedPassword }, { where: { email }});

  if(result[0] === 0){
    throw new NotFoundError('User not found');
  } 

  return result;
}

const updateProfilePicture = async (req) => {
  const { email } = req.user;
  const check = await Users.findOne({where: {email}});
  const imagePath = `public/${check.url_image}`;
  fs.unlink(imagePath, (error) => {
    if(error){
      throw new BadRequestError(error.message);
    } else {
      console.log("file deleted: " + check.url_image);
    }
  });

  const result = await Users.update({url_image: req.file.filename}, {where: {email}});

  if(result[0] === 0){
    throw new NotFoundError('User not found');
  } 

  return result;
}

module.exports = { getUserById, getUserByEmail, updateUserProfile, updatePassword, updateProfilePicture };