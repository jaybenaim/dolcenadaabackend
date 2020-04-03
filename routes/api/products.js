const express = require("express");
const router = express.Router();

const Product = require("../../models/Product");

require("dotenv").config();

router.get("/", (req, res) => {
  Product.find()
    .then(product => {
      return res.status(200).send(product);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});
router.post("/", (req, res) => {
  const { body } = req;

  let newProduct = new Product(body);
  newProduct
    .save()
    .then(product => {
      return res.status(200).send(product);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});
// GET BY ID
router.get("/:id", (req, res) => {
  Product.findOne({ _id: req.params.id }, (err, product) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(product);
  });
});
// GET COOKIES
router.get("/cookies", (req, res) => {
  Product.find({ sku: "cookie-" })
    .then(cookie => {
      return res.status(200).send(cookie);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});
// GET SCONES
router.get("/scones", (req, res) => {
  Product.find({ sku: "scone-" })
    .then(scone => {
      return res.status(200).send(scone);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});
// GET BISCOTI
router.get("/biscotti", (req, res) => {
  Product.find({ sku: "biscotti-" })
    .then(biscotti => {
      return res.status(200).send(biscotti);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});

// EDIT
router.patch("/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .select("-__v")
    .exec((err, updatedProduct) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(updatedProduct);
    });
  // DELETE
  router.delete("/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, product) => {
      if (err) return res.status(500).send(err);
      const response = {
        message: "Product deleted successfully"
      };
      return res.status(200).send(response);
    });
  });
});

module.exports = router;
