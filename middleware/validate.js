const validator = require('../helpers/validate');

const saveItem = (req, res, next) => {
  const validationRule = {
    itemName: 'required|string',
    markedAsComplete: 'required|boolean'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveItem
};

/*itemName: req.body.itemName,
itemDescription: req.body.itemDescription,
markedAsComplete: req.body.markedAsComplete*/
