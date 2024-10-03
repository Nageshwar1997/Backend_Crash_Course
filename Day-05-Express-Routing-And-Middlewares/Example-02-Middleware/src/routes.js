const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(`Request received at: ${req.requestTime}`);
  console.log("Request Method:", req.method);
  console.log("Request URL:", req.url);
  res
    .status(200)
    .send("Welcome to the Users Page & you are visited at: " + req.requestTime);
});

router.get("/profile", (req, res) => {
  res.status(200).send("Welcome to the Users Profile Page");
});

router.get("/:id/product/:productId", (req, res) => {
  console.log(req.params);
  res.status(200).json({
    id: req.params.id,
    productId: req.params.productId,
    url: req.url,
  });
});

module.exports = router;
