const createTokenUser = (user) => {
  return {
    fullname: user.fullname,
    userId: user.id,
    email: user.email,
  };
}

const createTokenAdmin = (admin) => {
  return {
    fullname: admin.fullname,
    adminId: admin.id,
    email: admin.email
  }
}

module.exports = { createTokenUser, createTokenAdmin };