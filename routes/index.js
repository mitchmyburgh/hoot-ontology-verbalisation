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

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Hoot', linkToData: ''  });
});

/* GET pre built owl files. */
/* GET simpleEnglish */
router.get('/prebuiltSEnglish', function(req, res, next) {
  read_file("testont.owl", "sample-owl/testont.owl", "simpleEnglish", function (path){
    res.render('index', { title: 'Hoot', linkToData: path});
  });
});
/* GET technicalEnglish */
router.get('/prebuiltTEnglish', function(req, res, next) {
  read_file("testont.owl", "sample-owl/testont.owl", "technicalEnglish", function (path){
    res.render('index', { title: 'Hoot', linkToData: path });
  });
});
/* GET maths */
router.get('/prebuiltMaths', function(req, res, next) {
  read_file("testont.owl", "sample-owl/testont.owl", "maths", function (path){
    res.render('index', { title: 'Hoot', linkToData: path });
  });
});
/* GET Tswana */
router.get('/prebuiltTswana', function(req, res, next) {
  read_file("tswana.owl", "sample-owl/tswana.owl", "Tswana", function (path){
    res.render('index', { title: 'Hoot', linkToData: path });
  });
});
/* GET Afrikaans */
router.get('/prebuiltAfrikaans', function(req, res, next) {
  read_file("testAfr.owl", "sample-owl/testAfr.owl", "Afrikaans", function (path){
    res.render('index', { title: 'Hoot', linkToData: path });
  });
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
