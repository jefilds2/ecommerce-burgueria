import * as Yup from 'yup';
import Category from '../models/Category.js';

class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name } = request.body;
    const { filename } = request.file;

    const categoryExists = await Category.findOne({ where: { name }, });

    if (categoryExists) {
      return response.status(400).json({ error: 'Category already exists' });
    }

    const newCategory = await Category.create({
      name,
      path: filename,
    });

    return response.status(201).json({ newCategory });
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name } = request.body;
    const { id } = request.params;

    let path
    if (request.file) {
      const { filename } = request.file;
      path = filename;
    }

    const categoryExists = await Category.findOne({ where: { name }, });

    if (categoryExists) {
      return response.status(400).json({ error: 'Category already exists' });
    }

    await Category.update({
      name,
      path,
    }, {
      where: { id },
    });

    return response.status(201).json();
  }

  async destroy(request, response) {
    const { id } = request.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return response.status(404).json({ error: 'Categoria não encontrada.' });
    }

    await category.destroy();

    return response.status(204).send();
  }

  async index(_request, response) {
    const categories = await Category.findAll()

    return response.status(200).json(categories);
  };
}

export default new CategoryController();
