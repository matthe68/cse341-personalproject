const routes = require('express').Router();
const bucketList = require('../controllers/bucket-list');
const validation = require('../middleware/validate');

routes.get('/', bucketList.getAllItems);
routes.get('/:id', bucketList.getItemByID);
routes.post('/', validation.saveItem, bucketList.createNewItem);
routes.put('/:id', validation.saveItem, bucketList.updateItem);
routes.delete('/:id', bucketList.deleteItem);    

module.exports = routes; 