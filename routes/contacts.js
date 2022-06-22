const routes = require('express').Router();
const contacts = require('../controllers/contacts');

routes.get('/', contacts.getAllContacts);
routes.get('/:id', contacts.getContactByID);
routes.post('/', contacts.createNewContact);
routes.put('/:id', contacts.updateContact);
routes.delete('/:id', contacts.deleteContact);

module.exports = routes; 