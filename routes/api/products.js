const express = require("express");
const router = express.Router();
const escapeRegex = require("../../helpers/regex-escape");

const Product = require("../../models/Product");

require("dotenv").config();

// Pagination
router.get("/search/:page", async (req, res, next) => {
  const resultsPerPage = 5;
  const page = req.params.page >= 1 ? req.params.page : 1;
  const query = req.query.search;

  await Product.find({ sku: query })
    .select("name sku price image class, description ")
    .sort({ name: "asc" })
    .limit(resultsPerPage)
    .skip(resultsPerPage * page)
    .then((results) => {
      return res.status(200).send(results);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

router.get("/", (req, res) => {
  Product.find()
    .select("-__v")
    .then((product) => {
      return res.status(200).send(product);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

router.post("/", (req, res) => {
  const newProduct = new Product(res.body);
  newProduct
    .save()
    .then((product) => {
      return res.status(200).send(product);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

router.post("/createProductList", (req, res) => {
  const { body } = req;

  const newProducts = body.map((product) => {
    let newProducts = new Product(product);
    newProducts
      .save()
      .then((product) => {
        return res.status(200).send(product);
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  });
  // return res.status(200).send(newProducts);
});

// GET BY ID
router.get("/:id", (req, res) => {
  Product.findOne({ _id: req.params.id })
    .select("-__v")
    .then((product) => {
      return res.status(200).send(product);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});
// GET COOKIES
router.get("/get/cookies", (req, res) => {
  const skuQuery = { sku: "cookie-" };
  const nameQuery = { name: req.query.name };
  let query;
  if (req.query.name) {
    query = nameQuery;
  } else {
    query = skuQuery;
  }
  Product.find(query)
    .then((cookies) => {
      return res.status(200).send(cookies);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});
// GET SCONES
router.get("/get/scones", (req, res) => {
  const skuQuery = { sku: "scone-" };
  const nameQuery = { name: req.query.name };
  let query;
  if (req.query.name) {
    query = nameQuery;
  } else {
    query = skuQuery;
  }
  Product.find(query)
    .then((scones) => {
      return res.status(200).send(scones);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});
// GET BISCOTI
router.get("/get/biscotti", (req, res) => {
  const skuQuery = { sku: "biscotti-" };
  const nameQuery = { name: req.query.name };
  let query;
  if (req.query.name) {
    query = nameQuery;
  } else {
    query = skuQuery;
  }
  Product.find(query)
    .then((biscotti) => {
      return res.status(200).send(biscotti);
    })
    .catch((err) => {
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
        message: "Product deleted successfully",
      };
      return res.status(200).send(response);
    });
  });
});

module.exports = router;
