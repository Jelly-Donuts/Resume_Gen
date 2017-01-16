'use strict';

/* 
Made with
['/fonts/Didot.ttf','/fonts/OpenSans-Light.ttf','/fonts/Georgia Bold.ttf','/fonts/AvenirNext-Regular.ttf','/fonts/AvenirNext-Italic.ttf','/fonts/AvenirNext-Medium.ttf']
as fonts
*/

const PDFDocument = require('./pdfkit');
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
        doc.registerFont(fonts[i], path.join(__dirname + fonts[i]))
    }

    return doc;
};

const makeSize = function(doc, fonts, index) {
    doc.font(index)
        .fontSize(1);

    let dict = {};

    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,./?!@#$%^&*()1234567890<>:"{}[];•`~_- '

    //find y coord stuff
    const start = doc.y;
    doc.text('letters');
    const end = doc.y;
    console.log(index, end - start);

    doc.list([['text', 'hi']], {
                bulletRadius: 2,
                bulletIndent: 15,
                textIndent: 20,
                midLine: 8
            });;
    (console.log(doc.x));
    dict.ysize = end-start;

    //find charwidth of each character
    for (let i = 0; i < letters.length; i++){
        doc.text(letters.substring(i, i+1), {continued: true});
        dict[letters.substring(i,i+1)] = doc._textOptions.textWidth;
    }

    return dict;
}

module.exports = {
    handler: function(fonts) {

        const doc = make_doc(fonts)

        let sizes = [];

        for (let i = 0; i < fonts.length; i++){
            sizes.push(makeSize(doc, fonts, fonts[i]));
        }

        doc.end();

        fs.writeFile(path.join(__dirname + '/fontinfo.json'), JSON.stringify(sizes));
    }
}