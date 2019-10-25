const express = require("express");
const router = express.Router();

// @route POST api/test/1
// @desc Login Ambulancia or Centro Medico and return JWT token
// @access Public
router.get("/1", (req, res) => {
  return res.send("on");
});

module.exports = router;
