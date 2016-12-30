var pdfGen = require('./backend/pdfgen');
var path = require('path');
var express = require('express');
var app = express();
var router = express.Router();

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.json());       // to support JSON-encoded bodies

app.set('port', (process.env.PORT || 5000));

app.use('/static', express.static(path.join(__dirname + '/public')));
router.get('/', function(req, res, next){
	res.render('pages/index', { title: 'Resume Builder'})
});

app.use('/', router);

// views is directory for all template files
app.set('views', __dirname + '/site/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

router.get('/pdfgen', function(req, res) {
    console.log('here');
    console.log(req.body);
    console.log(pdfGen.handler());
});


// app.get('/', function(request, response) {
//   response.render('pages/index')
// });

app.get('/pdfcount', function(request, response){
  response.sendFile(path.join(__dirname, '/backend/count.txt'))
});

// app.get('/pdfgen/', function(request, response){
// 	response.render('pages/index')
	// res.sendFile(path.join(__dirname, '/backend/pdfs', docName));
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});