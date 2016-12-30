
try {
    console.log(1);
    var pdfGen = require('./backend/pdfgen.js');
    var path = require('path');
    var express = require('express');
    var app = express();
    console.log(2);
    app.set('port', (process.env.PORT || 5000));
    console.log(3);
    // views is directory for all template files
    app.set('views', __dirname + 'site/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    console.log(4);
    app.get('/', function(request, response) {
      response.render('index')
    });
    console.log(5);
    app.get('/pdfcount', function(request, response){
      response.sendFile(path.join(__dirname, './backend/count.txt'))
    });
    console.log(6);
    app.get('/pdfgen', function(request, response){
        res.sendFile(path.join(__dirname, './Resume_Gen/pdfs', docName));
    });
    console.log(7);
} catch (err){
    console.log(err)
}
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });