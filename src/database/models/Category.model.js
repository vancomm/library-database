import select from '../crud/select.js';
import Model from './Model.js';

const CategoryModel = new Model('category');

CategoryModel.get = async function get(params) {
  const categories = await select(this.table, params);

  const populatedCategories = Promise.all(categories.map(async (category) => {
    const [parentCategory] = await select(this.table, {
      where: {
        id: category.parentId,
      },
    });
    return { ...category, parentCategory };
  }));

  return populatedCategories;
};

export default CategoryModel;
