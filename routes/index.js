'use strict';

let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* get contribute language page */
router.get('/contribute', function(req, res, next) {
  res.render('contribute', { title: 'Express' });
});

module.exports = router;
