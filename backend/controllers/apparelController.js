const {
  addApparel,
  deleteApparel,
  updatedApparel,
  getApparel,
  getApparels,
} = require("../services/apparels.service");

/**
 * @desc Get All Products
 * @route GET /api/apparels/
 */
const handleGetApparels = (req, res) => {
  getApparels(res);
};

/**
 * @desc Get All a Product
 * @route GET /api/apparels/:id
 * @param {string} id
 */
const handleGetApparel = (req, res) => {
  getApparel(req.params.id, res);
};

/**
 * @desc POST Add a product
 * @route POST /api/apparels/
 */
const handleAddApparel = (req, res) => {
  addApparel(req.body, res);
};

/**
 * @desc DELETE Delete a product
 * @route DELETE /api/apparels/:id
 * @param {string} id
 */
const handleDeleteApparel = (req, res) => {
  const { id } = req.body;
  deleteApparel(id, res);
};

/**
 * @desc UPDATE Update a product
 * @route UPDATE /api/apparels/:id
 * @param {string} id
 * @param {object} data
 */
const handleUpdataApparel = (req, res) => {
  const id = req.params.id;
  updatedApparel(id, req.body, res);
};

module.exports = {
  handleGetApparel,
  handleGetApparels,
  handleAddApparel,
  handleDeleteApparel,
  handleUpdataApparel,
};
