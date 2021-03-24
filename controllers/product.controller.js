const Product = require("../models/product.model.js");


// Create and Save a new Customer
exports.create = (req, res) => {
  
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  
};






exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a product
    const product = new Product({
      productNumber: req.body.productNumber,
      productName: req.body.productName,
      description: req.body.description,
      brand: req.body.brand,
      category: req.body.category,
      price: req.body.price,
      imageURL: req.body.imageURL,
      freeShipping: req.body.freeShipping,
      qtyOnHand: req.body.qtyOnHand
    });
  
    // Save product in the database
    Product.create(product, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
  };



  exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };


  exports.findOne = (req, res) => {
    Product.findById(req.params.productNumber, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.productNumber}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.productNumber
          });
        }
      } else res.send(data);
    });
  };



  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Product.updateById(
      req.params.productNumber,
      new Product(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.productNumber}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.productNumber
            });
          }
        } else res.send(data);
      }
    );
  };




  exports.delete = (req, res) => {
    Product.remove(req.params.productNumber, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.productNumber}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.productNumber
          });
        }
      } else res.send({ message: `Customer was deleted successfully!` });
    });
  };



  exports.deleteAll = (req, res) => {
    Product.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };