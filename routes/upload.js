'use strict';

let express = require('express');
let router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express()

let read_file = require('../scripts/read_owl').read_file;


/* Post to upload page */
router.post('/', upload.single('OWLFile'), function (req, res, next) {
  console.log(req.file);
  //console.log(req.body);
  read_file(req.file.originalname, req.file.path, function (path){
    console.log(path);
    res.render('index', { title: 'Hoot', linkToData: path });
  });

})


module.exports = router;
