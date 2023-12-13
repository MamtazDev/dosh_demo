const express = require("express");
const { addDeposite } = require("../controller/deposite.controller");

const router = express.Router();

router.post("/add", addDeposite);

module.exports = router;
