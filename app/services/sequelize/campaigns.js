const Campaigns = require('../../api/v1/campaigns/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const slugify = require('slug-generator');
const { Op } = require('sequelize');
const { getPagingData } = require('../../helper');
const { serverApi } = require('../../config');
const fs = require('fs');

const getAllCampaigns = async (req) => {
  let { keyword="", page = 0, limit = 10 } = req.query;
  console.log(keyword);
  limit = parseInt(limit);
  page = parseInt(page);
  const offset = limit * page;
  let result = await Campaigns.findAndCountAll({
    where: {
      title: {[Op.like]: `%${keyword}%`},
      description: {[Op.like]: `%${keyword}%`},
    },limit, offset});
  result = getPagingData(result, page, limit);

  return result;
}

const getCampaign = async (req) => {
  const { id } = req.params;

  const result = await Campaigns.findOne({where: {id}});

  return result;
}

const getCampaignBySlug = async (req) => {
  const { url_slug } = req.params;
  
  const result = await Campaigns.findOne({ where: { url_slug } });

  return result;
}

const deleteCampaign = async (req) => {
  const { id } = req.params;
  const checkImage = await Campaigns.findOne({where: { id }});
  if (!checkImage) throw new NotFoundError('Image not found');

  const imagePath = `public/${checkImage.url_image}`;
  fs.unlink(imagePath, (error) => {
    if(error){
      throw new BadRequestError(error.message);
    } else {
      console.log("file deleted: " + checkImage.url_image);
    }
  });

  const result = await Campaigns.destroy({ where: {id}, force: true});

  if (result === 0) throw new NotFoundError('Campaign not found');

  return result;
}

const createCampaign = async (req) => {
  const { title, description } = req.body;

  const checkTitle = await Campaigns.findOne({where: {title}});

  if(checkTitle) {
    throw new BadRequestError('Title duplicated');
  }

  const url_slug = slugify(title);

  const result = await Campaigns.create({id_user: req.user.id, title, description, url_slug, url_image: `uploads/${req.file.filename}`});

  return result;
}

const updateImageCampaign = async (req) => {
  const { id } = req.params;
  const checkImage = await Campaigns.findOne({where: { id }});
  if (!checkImage) throw new NotFoundError('Image not found');

  const imagePath = `public/${checkImage.url_image}`;
  fs.unlink(imagePath, (error) => {
    if(error){
      throw new BadRequestError(error.message);
    } else {
      console.log("file deleted: " + checkImage.url_image);
    }
  });

  const result = await Campaigns.update({url_image: `uploads/${req.file.filename}`}, {where : { id }});

  return result;
}

const updateCampaign = async (req) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const checkTitle = await Campaigns.findOne({where: {
    title,
    id: {
      [Op.ne]: id
    }
  }});

  if(checkTitle) {
    throw new BadRequestError('Title duplicated');
  }

  const url_slug = slugify(title);

  const result = await Campaigns.update({title, description, url_slug}, {where: {id}});

  if(result[0] === 0){
    throw new NotFoundError('Campaign not found');
  } 

  return result;
}


module.exports = { getAllCampaigns, getCampaign, deleteCampaign, updateCampaign, createCampaign, getCampaignBySlug, updateImageCampaign };