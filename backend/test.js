'use strict';

const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
    margins : {
        top:72, 
        bottom:36, 
        right:36, 
        left:36
    }
});

doc.pipe(fs.createWriteStream('./pdfs/' + (new Date()).getTime() + '.pdf'));

//Template 1
//Template 1:Fonts
doc.registerFont('Heading Name', './fonts/Didot.ttf');
doc.registerFont('Contact Info', './fonts/OpenSans-Light.ttf');
doc.registerFont('Title', './fonts/NunitoSans-Bold.ttf');
doc.registerFont('Content Regular', './fonts/NunitoSans-Regular.ttf');
doc.registerFont('Content Italics', './fonts/NunitoSans-LightItalic.ttf');
doc.registerFont('Content Bold2', './fonts/NunitoSans-SemiBold.ttf');

//Template 1:Font Sizes
doc.lineGap(-1);
const size = 12;

doc.font('Content Regular')
    .fontSize(size)
    .text('Helgkaosdjuasnc', {
        align: 'left',
    });
console.log(size,doc.y - 72);



doc.end();