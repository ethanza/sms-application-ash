

const asyncHandler = require('express-async-handler');
const { getSMSHandler, upload } = require('./getSms');

module.exports = asyncHandler(async (req, res) => {
    const response = await upload(req, res);
    res.json(response);
});