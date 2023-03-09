const UserRefreshToken = require('../../api/v1/userRefreshToken/model');
const Users = require('../../api/v1/users/model');
const { NotFoundError } = require('../../errors');
const { isTokenValidRefreshToken, createJWT, createTokenUser } = require('../../utils');

const createUserRefreshToken = async (payload) => {
  const result = await UserRefreshToken.create(payload);

  return result;
}

const getUserRefreshToken = async (req) => {
  const { refreshToken } = req.params;

  const result = await UserRefreshToken.findOne({where: {refreshToken}});

  if (!result) throw new NotFoundError('Refresh token is not valid');

  const payload = isTokenValidRefreshToken({ token: result.refreshToken });
  
  const userCheck = await Users.findOne({where: { email: payload.email  }});

  const token = createJWT({ payload: createTokenUser(userCheck) });

  return { email: payload.email, token};
}

module.exports = { createUserRefreshToken, getUserRefreshToken };