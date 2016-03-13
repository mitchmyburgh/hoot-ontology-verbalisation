var express = require('express');
var fileUpload = require('express-fileupload');
var router = express.Router();
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* get contribute language page */
router.get('/contribute', function(req, res, next) {
  res.render('contribute', { title: 'Express' });
});

// default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
	var sampleFile;

	if (!req.files) {
		res.send('No files were uploaded.');
		return;
	}

	sampleFile = req.files.sampleFile;
	sampleFile.mv('/somewhere/on/your/server', function(err) {
		if (err) {
			res.status(500).send(err);
		}
		else {
			res.send('File uploaded!');
		}
	});
});

module.exports = router;
