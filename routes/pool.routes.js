const express = require("express");
const {
  createPool,
  getAllPools,
  getUserPools,
} = require("../controller/pool.controller");

const router = express.Router();

router.post("/add", createPool);
router.get("/", getAllPools);
router.get("/userDeposites/:id", getUserPools);

module.exports = router;
