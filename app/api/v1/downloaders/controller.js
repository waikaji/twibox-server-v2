const { createDownloaders } = require('../../../services/sequelize/downloaders');
const { StatusCodes } = require('http-status-codes');

const index = async (req, res, next) => {
  try {
    const result = await createDownloaders(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    })
  } catch (err) {
    next(err);
  }
}

module.exports = { index };