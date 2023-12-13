const Deposite = require("../models/Deposite.Model");
const Pool = require("../models/Pool.Model");

const addDeposite = async (req, res) => {
  try {
    const { depositor, pool, amount } = req.body;

    const newDeposite = new Deposite({ depositor, pool, amount });
    const deposite = await newDeposite.save();

    const result = await Pool.findOneAndUpdate(
      { _id: pool },
      {
        $push: {
          depositedPeoples: {
            depositor: depositor,
            amount: amount,
          },
        },
      },
      { new: true }
    );

    res.status(200).send({
      message: `${amount}$ deposited successfully!`,
      status: 200,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addDeposite,
};
