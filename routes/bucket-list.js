const routes = require('express').Router();
const bucketList = require('../controllers/bucket-list');

routes.get('/', bucketList.getAllItems);
routes.get('/:id', bucketList.getItemByID);
routes.post('/', bucketList.createNewItem);
routes.put('/:id', bucketList.updateItem);
routes.delete('/:id', bucketList.deleteItem);    

module.exports = routes; 