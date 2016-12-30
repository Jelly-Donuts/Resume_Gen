var pdfGen = require('./backend/pdfgen.js');
var path = require('path');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/static', express.static(path.join(__dirname + '/public')));

// views is directory for all template files
app.set('views', __dirname + '/site/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// HELLO

app.get('/', function(request, response) {
  response.render('pages/index')
});

console.log(__dirname, './backend/count.txt');
app.get('/pdfcount', function(request, response){
  response.sendFile(path.join(__dirname, './backend/count.txt'))
});

app.get('/pdfgen', function(request, response){
	res.sendFile(path.join(__dirname, './Resume_Gen/pdfs', docName));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});