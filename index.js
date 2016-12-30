var pdfGen = require('./backend/pdfgen.js');
var path = require('path');
var express = require('express');
var app = express();
// var PDFcount = pdfGen.getNumber();
docName = pdfGen.PDFGenerator()

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/pdfcount', function(request, response){
  response.sendFile(path.join(__dirname, '../backend/count.txt'))
});

app.get('/pdfgen', function(request, response){
	res.sendFile(path.join(__dirname, '../working-pdf-opener/pdfs', docName));
});

app.get('/pdfgen', function(request, response){
  response.send(pdfGen.docNameGen());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});