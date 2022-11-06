const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
    },
    imageUrl: {
      type: String,
    },

    reviews: [
      {
        value: {
          type: Number,
        },
        content: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);
ProductSchema.virtual("averageScore").get(function () {
  let rate = 0;
  if (this.reviews && this.reviews.length > 0) {
    let valuetab = this.reviews.map((el) => el.value);
    let totalvalue = valuetab.reduce((a, b) => a + b);
    rate = totalvalue / this.reviews.length;
  }
  return rate.toFixed(2);
});

const Products = mongoose.model("product", ProductSchema);
module.exports = Products;
