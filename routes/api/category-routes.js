const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product,
    });
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId, {
      include: Product,
    });

    if(!category) {
      return res.status(404).json({ message: 'Category not found'});
    }

    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedCategory = await Category.update(req.body, {
      where: { id: categoryId },
    });

    if (updatedCategory[0] === 0) {
      return res.status(404).json({ message: 'Category not found'});
    }

    res.status(200).json({ message: 'Category update successfully'})
  } catch (err) {
    console.error(err);
    res.status(500).json(err); 
  }

  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
try{
  const CategoryId = req.params.id;
  const deletedCategory = await Category.destroy({
    where: {id: categoryId },
  });

  if (!deletedCategory) {
    return res.status(404).json({ message: 'Category not found'});
  }

  res.status(200).json({message: 'Category deleted successfully'});
} catch (err) {
  console.error(err);
  res.status(500).json(err);
}
  // delete a category by its `id` value
});

module.exports = router;
