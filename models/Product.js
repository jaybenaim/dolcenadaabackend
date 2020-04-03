const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = Product = mongoose.model("products", ProductSchema);
