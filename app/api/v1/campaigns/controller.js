const { 
  getAllCampaigns,
  getCampaign,
  getCampaignBySlug,
  createCampaign,
  updateCampaign,
  updateImageCampaign,
  deleteCampaign,
 } = require('../../../services/sequelize/campaigns');
 const { StatusCodes } = require('http-status-codes');

const index = async (req, res, next) => {
  try {
    const result = await getAllCampaigns(req);

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (err) {
    next(err);
  }
}

const findById = async (req, res, next) => {
  try {
    const result = await getCampaign(req);

    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (err) {
    next(err);
  }
}

const findBySlug = async (req, res, next) => {
  try {
    const result = await getCampaignBySlug(req);

    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (err) {
    next(err);
  }
}

const create = async (req, res, next) => {
  try {
    const result = await createCampaign(req);

    res.status(StatusCodes.CREATED).json({
      data: result
    })
  } catch (err) {
    next(err);
  }
}

const update = async (req, res, next) => {
  try {
    const _ = await updateCampaign(req);

    res.status(StatusCodes.OK).json({
      msg: "Campaign changed successfully",
    })
  } catch (err) {
    next(err);
  }
}

const destroy = async (req, res, next) => {
  try {
    const _ = await deleteCampaign(req);

    res.status(StatusCodes.OK).json({
      msg: "Campaign deleted successfully",
    })
  } catch (err) {
    next(err);
  }
}

const updateImage = async (req, res, next) => {
  try {
    const _ = await updateImageCampaign(req);

    res.status(StatusCodes.OK).json({
      msg: "Campaign changed successfully",
    })
  } catch (err) {
    next(err);
  }
}

module.exports = { index, create, findById, findBySlug, update, updateImage, destroy };