var pdfGen = require('./backend/pdfgen');
var pdfRead = require('./backend/pdfreader');
var path = require('path');
var multer = require('multer');
var multerupload = multer({ dest: 'backend/tmp/' })
var express = require('express');
var app = express();
var router = express.Router();

var bodyParser = require('body-parser')

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.use('/static', express.static(path.join(__dirname + '/public')));
app.use('/backend', express.static(path.join(__dirname + '/backend')));
app.use('/pdf', express.static(path.join(__dirname + '/backend/pdfs')));

//Home Page Route
router.get('/', function(req, res, next){
	res.render('pages/index', {title: 'Resume Builder'})
});
app.use('/', router);

// views is directory for all template files
app.set('views', __dirname + '/site/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Route for handling PDF generation!
router.post('/pdfgen', function(req, res) {
    const response = pdfGen.handler(req.body);
    res.send(response);
    console.log('response sent')
});

router.post('/pdfread', multerupload.any(), pdfRead.handler);

pdfGen.start_count();

//Route for calling PDF Count!
app.get('/pdfcount', function(request, response){
  response.sendFile(path.join(__dirname, '/backend/count.txt'));
});


//If no other express route captures path, return a 404 page
app.use(function (req, res, next) {
  res.status(404).render('pages/404', { title: '404 Not Found'});
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});