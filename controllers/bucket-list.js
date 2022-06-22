const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllItems = async (req, res) => {
  const result = await mongodb.getDb().db().collection('bucket-list').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getItemByID = async (req, res) => {
  const itemId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('bucket-list').find({ _id: itemId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
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
  const itemId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const bucketListItem = {
    itemName: req.body.itemName,
    itemDescription: req.body.itemDescription,
    markedAsComplete: req.body.markedAsComplete
  };
  if (bucketListItem.itemName == null) {
    res.status(501).json(response.error || 'Error, bucket list item must have a name.');
  } else {
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
  }
};

const deleteItem = async (req, res) => {
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