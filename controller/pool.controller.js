const Deposite = require("../models/Deposite.Model");
const Pool = require("../models/Pool.Model");
const User = require("../models/User.Model");

const createPool = async (req, res) => {
  try {
    const { name, amount, maxNumberPeople, creatorInfo } = req.body;

    const newPool = new Pool({ creatorInfo, name, amount, maxNumberPeople });
    const pool = await newPool.save();
    // await pool.populate("creatorInfo");
    await pool.populate({ path: "creatorInfo", select: "-password" });

    res.status(200).send({
      message: "Pool created successfully!",
      status: 200,
      data: pool,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllPools = async (req, res) => {
  try {
    // const allPool = await Pool.find({});
    // const allPool = await Pool.find({}).populate("depositedPeoples.depositor");
    const allPool = await Pool.find({});
    res.status(200).send(allPool);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getUserPools = async (req, res) => {
  try {
    const isExist = await User.findOne({ _id: req.params.id });

    if (isExist) {
      const userDeposites = await Deposite.find({
        depositor: req.params.id,
      }).populate("pool");

      res.status(200).send(userDeposites);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  createPool,
  getAllPools,
  getUserPools,
};
