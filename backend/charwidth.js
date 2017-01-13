'use strict';

const PDFDocument = require('pdfkit');
const fs          = require('fs');
const path        = require('path');


//Should be passed an array of directory paths to font
const make_doc = function(fonts) {
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
    console.log('Creating samplepage at: ', pathname);

    for(let i = 0; i < fonts.length; i ++){
        doc.registerFont(i.toString(), path.join(__dirname + fonts[i]))
    }

    return doc;
};

const makeSize = function(doc, fonts, index) {
    doc.font(index.toString())
        .fontSize(1);

    let dict = {};

    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,./?!@#$%^&*()1234567890<>:"{}[];• '

    //find y coord stuff
    const start = doc.y;
    doc.text('letter');
    const end = doc.y;

    dict.ysize = start-end;

    //find charwidth of each character
    for (let i = 0; i < letters.length; i++){
        doc.text(letters.substring(i, i+1), {continued: true});
        dict[letters.substring(i,i+1)] = doc._textOptions.textWidth;
        console.log(doc._textOptions.textWidth);
    }

    return dict;
}

module.exports = {
    handler: function(fonts) {

        const doc = make_doc(fonts)

        let sizes = [];

        for (let i = 0; i < fonts.length; i++){
            sizes.push(makeSize(doc, fonts, i));
        }

        doc.end();

        fs.writeFile(path.join(__dirname + '/fontinfo.json'), JSON.stringify(sizes));
    }
}