'use strict';

let express = require('express');
let router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express()


/* Post to upload page */
router.post('/', upload.single('OWLFile'), function (req, res, next) {
  console.log(req.file);
  //console.log(req.body);
  res.status(204).end();
})


module.exports = router;
