const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  class: {
    type: String,
  },
  description: {
    dough: {
      type: String,
    },
    mixin: {
      type: String,
    },
    stuffing: {
      type: String,
    },
    topping: {
      type: String,
    },
    default: {
      type: String,
    },
  },
});

module.exports = Product = mongoose.model("products", ProductSchema);
