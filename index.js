'use strict';

const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument;

let name      = 'Daniel Andrews';
let address   = '2430 Piedmont Ave, Berkeley CA 94704';
let email     = 'DanielAndrews@berkeley.edu';
let phone_num = '(310) 424 8136';

let coll_name   = 'University of California, Berkeley';
let coll_GPA    = '2.823';
let coll_degree = 'Bachelor of Science: Electrical Engineering & Computer Science';
let coll_date   = '2016 - 2020';
let coll_loc    = 'Berkeley, CA'; 

let coll_work = [
    'Information & Designing Systems I',
    'The Structure & Interpretation of Computer Programs',
    'Multivariable Calculus'
]; 
let exp_coll_work = [
    'Data Structures',
    'Information & Designing Systems II',
    'Discrete Mathematics & Probablility'
];

let HS_name       = 'Alexander Hamilton High School';
let HS_date       = '2012 - 2016'
let HS_GPA_weight = '4.813';
let HS_GPA        = '4.000';
let HS_school_loc = 'Los Angeles, CA';
let HS_awards     = '19 AP Tests, Valedictorian, Hardest Working';

let dot = ' • ';


let docname = (new Date()).getTime() + '.pdf';
doc.pipe(fs.createWriteStream('./pdfs/' + docname));


//Top Info
//Name
doc.fontSize(40);

doc.text(name, {
    align: 'center',
    lineGap: -20
});

//Address
doc.fontSize(10);
doc.moveDown();

doc.text(address, {
    align: 'center',
    lineGap: -10
})

//Contact
doc.moveDown()

doc.text(email + dot + phone_num, {
    align: 'center',
    lineGap: -20
});


//Educatuin
//Education Title
doc.fontSize(22);
doc.moveDown();

doc.text('Education', {
    align: 'left',
    lineGap: -105
});

//Education Bar
//******Should eventually change this to a vector line!!!*******
doc.fontSize(50);
doc.moveDown();

doc.text('________________', {
    lineGap: -20
});

//Education Highschool
doc.fontSize(12);
doc.moveDown();

doc.text(coll_name + ' - ' + coll_GPA, {
    align: 'left',
    lineGap: -10
});

doc.moveDown();
doc.text('test', {
    lineGap: -10
});

doc.moveDown();
doc.text('test123', {
    lineGap: -10
});



doc.end();


