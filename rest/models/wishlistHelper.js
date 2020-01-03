const db = require("../../database/dbConfig");

function addWishlist(wishlist) {
  return db("wishlists")
    .insert(wishlist)
    .then(res => {
      return { id: res[0] };
    });
}

function findBy(key) {
  return db("wishlists")
    .where(key)
    .first();
}

module.exports = {
  addWishlist,
  findBy
};