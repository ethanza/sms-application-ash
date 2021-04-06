const express = require('express');
const router = express.Router();
const excelController = require('../sms/getSms');
const upload = require('../sms/upload');

let routes = (app) => {
    router.post(
      '/upload', upload.single('data'),
       excelController.upload,
       );
  
    app.use('/api/excel', router);
  };

module.exports = routes;