const mongoose = require("mongoose");

const depositeSchema = new mongoose.Schema(
  {
    depositor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pool: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pool",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Deposite = mongoose.model("Deposite", depositeSchema);

module.exports = Deposite;
