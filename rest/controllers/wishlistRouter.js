import db from "../models/wishlistHelper";

const router = require("express").Router();

router.post("/wishlist", (req, res) => {
  const data = req.body;
  db.addWishlist(data)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error adding a new user to the database" });
    });
});