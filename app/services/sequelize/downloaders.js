const Downloaders = require('../../api/v1/downloaders/model');

const createDownloaders = async (req) => {
  const { id_campaign } = req.params;

  const result = await Downloaders.create({id_campaign});

  return result;
}

module.exports = { createDownloaders };