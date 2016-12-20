'use strict';

const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument;

let name      = 'Daniel Andrews'
let address   = '2430 Piedmont Ave, Berkeley CA 94704'
let email     = 'DanielAndrews@berkeley.edu'
let phoneNum  = '(310) 424 8136'

let dot = ' • '


let docname = (new Date()).getTime() + '.pdf';
doc.pipe(fs.createWriteStream('./pdfs/' + docname));


//Top Info
//Name
doc.fontSize(40);

doc.text(name, {
    align: 'center'
});

//Address
doc.fontSize(10);
doc.lineGap(-20);
doc.moveDown();

doc.text(address, {
    align: 'center'
})

//Contact
doc.lineGap(10)
doc.moveDown()

doc.text(email + dot + phoneNum, {
    align: 'center'
});


//Educatuin
//Education Title
doc.lineGap(-30)
doc.fontSize(22);
doc.moveDown();

doc.text('Education', {
    align: 'left',
});

//Education Bar
//******Should eventually change this to a vector line!!!*******
doc.fontSize(50);
doc.lineGap(-75);
doc.moveDown();

doc.text('________________');

//Education list
doc.fontSize(12);
doc.lineGap(0);
doc.moveDown();




doc.end();


