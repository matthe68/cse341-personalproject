const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllItems = async (req, res) => {
  const result = await mongodb.getDb().db().collection('bucket-list').find().toArray((err, lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getItemByID = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a bucket list item.');
  }
  const itemId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('bucket-list')
    .find({ _id: itemId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createNewItem = async (req, res) => {
  // bucketListItem should have a name at the least, the description and the place are optional.
  const bucketListItem = {
    itemName: req.body.itemName,
    itemDescription: req.body.itemDescription,
    markedAsComplete: req.body.markedAsComplete
  };
  if (bucketListItem.itemName == null) {
    res.status(501).json(response.error || 'Error, bucket list item must have a name.');
  } else {
    const response = await mongodb.getDb().db().collection('bucket-list').insertOne(bucketListItem);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the bucket list item.');
    }
  }
};

const updateItem = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a contact.');
  }
  const itemId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const bucketListItem = {
    itemName: req.body.itemName,
    itemDescription: req.body.itemDescription,
    markedAsComplete: req.body.markedAsComplete
  };
  
  const response = await mongodb
    .getDb()
    .db()
    .collection('bucket-list')
    .replaceOne({ _id: itemId }, bucketListItem);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the bucket list item.');
  }
};

const deleteItem = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a bucket list item.');
  }
  const itemId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('bucket-list').remove({ _id: itemId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAllItems,
  getItemByID,
  createNewItem,
  updateItem,
  deleteItem
};