'use strict';

const PDFDocument = require('pdfkit');
const fs          = require('fs');
const path        = require('path');


//Should be passed an array of directory paths to font
const make_doc = function(fonts) {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(path.join(__dirname + 'samplepage.pdf')));

    for(let i = 0; i < fonts.length; i ++){
        doc.registerFont(i, path.join(__dirname + fonts[i]))
    }

    return doc;
};

const makeSize = function(doc, fonts, index) {
    doc.font(fonts[index]);

    let dict = {};

    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,./?!@#$%^&*()1234567890<>:"{}[];'

    for (let i = 0; i < letters.length; i++){
        
    }
}



module.exports = {
    handler: function(fonts){

        const doc = make_doc(fonts)

        let sizes = [];

        for (let i = 0; i < fonts.length; fonts ++){
            sizes.push(makeSize(doc, fonts, i));
        }
    }
}