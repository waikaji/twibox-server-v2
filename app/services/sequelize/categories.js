const Categories = require('../../api/v1/categories/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const createCategories = async (req) => {
  const { name, status } = req.body;

  const check = await Categories.findOne({ name: name });

  if (check) throw new BadRequestError('Kategori duplikat');

  const result = await Categories.create({ name, status });

  return result;
}

const getAllCategories = async () => {
  const result = await Categories.findAll();

  return result;
}

const getByIdCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findByPk(id);

  if (!result) throw new NotFoundError(`Tidak ada ketegori dengan id : ${id}`);

  return result;
}

const getActiveCategories = async (req) => {
  const { status } = req.body;

  const result = await Categories.findAll({ where: { status } });

  if(!result) throw new NotFoundError(`Tidak ada kategori dengan status aktif`);

  return result;
}

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name, status } = req.body;

  const check = await Categories.findOne({
    where: {
      name
    }
  });

  if(check) throw new BadRequestError('Kategori duplikat');

  const result = await Categories.update({
    name,
    status
  }, 
  {
    where: {
      id
    }
  });

  if(!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`);

  return result;
}

const deleteCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findByPk(id);
  if(!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);

  await result.destroy();

  return result;
}

module.exports = { 
  createCategories,
  getAllCategories,
  getByIdCategories,
  getActiveCategories,
  updateCategories,
  deleteCategories,
}