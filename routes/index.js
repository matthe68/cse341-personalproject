const routes = require('express').Router();
const bucketList = require('./bucket-list');

routes.use('/', require('./swagger'));
routes.use('/bucket-list', bucketList);


module.exports = routes;