const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
  
// find all tags
  // be sure to include its associated Product data
  router.get('/', async (req, res) => {
    try {
      const tags = await Tag.findAll({
        include: [{ model: Product, through: ProductTag }], // Include associated Products through ProductTag
      });
      res.status(200).json(tags);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

  // find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id', async (req, res) => {
    try {
      const tagId = req.params.id;
      const tag = await Tag.findByPk(tagId, {
        include: [{ model: Product, through: ProductTag }], // Include associated Products through ProductTag
      });
  
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
  
      res.status(200).json(tag);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  
  // create a new tag
  router.post('/', async (req, res) => {
    try {
      const newTag = await Tag.create(req.body);
      res.status(201).json(newTag);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  });
  
  // update a tag's name by its `id` value
  router.put('/:id', async (req, res) => {
    try {
      const tagId = req.params.id;
      await Tag.update(req.body, {
        where: { id: tagId },
      });
  
      res.status(200).json({ message: 'Tag updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  });
  
  // delete on tag by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const tagId = req.params.id;
      const deletedTag = await Tag.destroy({
        where: { id: tagId },
      });
  
      if (!deletedTag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
  
      res.status(200).json({ message: 'Tag deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  

module.exports = router;
