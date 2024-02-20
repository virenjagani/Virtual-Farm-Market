const mongoose = require("mongoose");
const DS = require("../../services/date");

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  quantity: { type: Number, default: 1 },
  createdAt: { type: String, default: "" },
  updatedAt: { type: String, default: "" },
});

// This pre-save hook ensures that createdAt and updatedAt fields are set before saving the document
CartSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = DS.now(); // Set createdAt if not already present
  }
  this.updatedAt = DS.now(); // Update updatedAt
  next();
});

CartSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = DS.now();
  next();
});

const CartModel = mongoose.model("cart", CartSchema);

module.exports = CartModel;
