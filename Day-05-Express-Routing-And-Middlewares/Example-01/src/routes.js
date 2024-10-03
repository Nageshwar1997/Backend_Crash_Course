const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Welcome to the Users Page");
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
