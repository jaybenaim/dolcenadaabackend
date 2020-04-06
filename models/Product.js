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
    dough: {
      type: String,
      required: false
    },
    mixin: {
      type: String,
      required: false
    },
    stuffing: {
      type: String,
      required: false
    },
    topping: {
      type: String,
      required: false
    },
    default: {
      type: String,
      required: false
    }
  }
});

module.exports = Product = mongoose.model("products", ProductSchema);
