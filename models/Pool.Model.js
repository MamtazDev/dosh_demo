const mongoose = require("mongoose");

const depositedPeoplesSchema = new mongoose.Schema(
  {
    depositor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const poolSchema = new mongoose.Schema(
  {
    creatorInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    maxNumberPeople: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
    depositedPeoples: {
      type: [depositedPeoplesSchema],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Pool = mongoose.model("Pool", poolSchema);

module.exports = Pool;
