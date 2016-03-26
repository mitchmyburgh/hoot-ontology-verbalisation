'use strict';

let express = require('express');
let router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
let read_file = require('../scripts/read_owl').read_file;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hoot', linkToData: ''  });
});

/* get contribute language page */
router.get('/contribute', function(req, res, next) {
  res.render('contribute', { title: 'Express', linkToData: '' });
});

/* Post to upload page */
router.post('/', upload.single('OWLFile'), function (req, res, next) {
  //console.log(req.body);
  console.log(req.body.language)
  if (!req.file){
    res.send(204);
  }
  read_file(req.file.originalname, req.file.path, req.body.language, function (path){
    res.render('index', { title: 'Hoot', linkToData: path });
  });

})

module.exports = router;
