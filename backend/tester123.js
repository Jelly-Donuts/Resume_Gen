'use strict';

const PDFDocument = require('pdfkit');
const fs          = require('fs');
const path        = require('path');


const doc = new PDFDocument({
    margins : {
        top:0, 
        bottom:0, 
        right:0, 
        left:0
    }
});
const pathname = path.join(__dirname + '/samplepage.pdf');
doc.pipe(fs.createWriteStream(pathname));

doc.registerFont('Contact Info'   , path.join(__dirname + '/fonts/OpenSans-Light.ttf'));

console.log('start:', doc.y);
doc.fontSize(1).text('g');
console.log('size1:', doc.y);
doc.fontSize(2).text('g');
console.log('size2:', doc.y);
doc.text('g');
console.log('sizeg:', doc.y);



doc.fontSize(1).text('a', {continued:true});
console.log('1a:',doc._textOptions.textWidth);
doc.fontSize(2).text('a', {continued:true});
console.log('2a:',doc._textOptions.textWidth);

doc.fontSize(1).text('b', {continued:true});
console.log('1b:',doc._textOptions.textWidth);
doc.fontSize(2).text('b', {continued:true});
console.log('2b:',doc._textOptions.textWidth);

doc.fontSize(1).text('i', {continued:true});
console.log('1i:',doc._textOptions.textWidth);
doc.fontSize(2).text('i', {continued:true});
console.log('2i:',doc._textOptions.textWidth);


doc.end();