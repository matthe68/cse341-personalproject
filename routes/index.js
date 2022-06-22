const routes = require('express').Router();
const bucketList = require('./bucket-list');

routes.get('/', (req, res) => {
  res.send('Welcome to the Bucket List REST API');
})
routes.use('/bucket-list', bucketList);
routes.use('/swagger', require('./swagger'));

module.exports = routes;