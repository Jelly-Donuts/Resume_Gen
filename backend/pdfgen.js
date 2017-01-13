'use strict';

const PDFDocument = require('./pdfkit');
const fs          = require('fs');
const uuid        = require('uuid/v4');
const path        = require('path');
const mysql       = require('mysql');
const fontinfo    = require('./fontinfo.json');

const headingFontSize = 27;
const contactFontSize = 12;

const dot = ' • ';

const has_city = function(schema, i, j){
	return !!schema.segments[i].items[j].city;
};
const has_state = function(schema, i, j) {
	return !!schema.segments[i].items[j].state;
};
const has_city_and_state = function(schema, i, j) {
	return has_city(schema, i, j) && has_state(schema, i, j);
};

const make_start_date = function(schema, i, j){
	return schema.segments[i].items[j].start_date || '';
};
const make_end_date = function(schema, i, j){
	return schema.segments[i].items[j].end_date || '';
};

//Creates the doc with all the sizes and fonts
const set_up_doc = function(schema) {
	const doc = new PDFDocument({
		margins : {
			top:72, 
			bottom:36, 
			right:36, 
			left:36
		}
	});

	//docname should be random
	if (!schema.docname) {
		schema.docname = uuid() + '.pdf';
	}

	//create directory if not exists
	if (!fs.existsSync(path.join(__dirname + '/pdfs/'))){
    	fs.mkdirSync(path.join(__dirname + '/pdfs/'));
	}

	doc.pipe(fs.createWriteStream(path.join(__dirname +'/pdfs/' + schema.docname)));

	//Template 1
	//Template 1:Fonts
	doc.registerFont('Heading Name'   , path.join(__dirname + '/fonts/Didot.ttf'));
	doc.registerFont('Contact Info'   , path.join(__dirname + '/fonts/OpenSans-Light.ttf'));
	doc.registerFont('Title'          , path.join(__dirname + '/fonts/Georgia Bold.ttf'));
	doc.registerFont('Content Regular', path.join(__dirname + '/fonts/AvenirNext-Regular.ttf'));
	doc.registerFont('Content Italics', path.join(__dirname + '/fonts/AvenirNext-Italic.ttf'));
	doc.registerFont('Content Bold2'  , path.join(__dirname + '/fonts/AvenirNext-Medium.ttf'));

	//Template 1:Font Sizes
	doc.lineGap(-1);


	return doc;
};

//Creates the header portion of the PDF that uses schema.contact
const make_header = function(doc, schema) {
	//Header
	//Header:Name
	doc.moveUp(3.5)
		.font('Heading Name')
		.fontSize(headingFontSize)
		.text(schema.contact.name, {
	    	align: 'center'
		});

	//Header:Contact Info
	let reach_text = schema.contact.reach[0];
	if (schema.contact.reach[1]) {
		reach_text += dot + schema.contact.reach[1];
	}
	if (schema.contact.reach[2]){
		reach_text += dot + schema.contact.reach[2];
	}


	doc.font('Contact Info')
	   .fontSize(contactFontSize)
       .text(schema.contact.address, {
	    	align: 'center'
	   })
	   .text(reach_text, {
			align: 'center'
	   });
};

//Draws the horizontal lines at ycoord
const draw_line = function(doc, y) {
	doc.lineWidth(1)
   	   .moveTo(36, y)
   	   .lineTo(576, y)
   	   .stroke();
};

//makes the text for the city and state
const make_city_state = function(schema, i, j) {
	if (has_city_and_state(schema, i, j)) {
		return schema.segments[i].items[j].city + 
			', ' + schema.segments[i].items[j].state;
	}
	else if(has_city(schema, i, j)) {
		return schema.segments[i].items[j].city;
	}
	else if(has_state(schema, i, j)){
		return schema.segments[i].items[j].state;
	}
	else {
		return '';
	}
};

//makes the text for the date
const make_date = function(schema, i, j) {
	let start = make_start_date(schema, i, j);
	let end = make_end_date(schema, i, j);

	if(start !== '' && end !== '') {
		return start + ' - ' + end;
	}
	else { //one or both of these will be an empty string
		return start + end;
	}
};


// !!!TODO!!! figure out how to draw line at correct position
//Sets up the header for each segment in the doc
const make_segment_title = function(doc, content) {
	doc.font('Title')
		.fontSize(contactFontSize)
		.moveDown(1.2)
		.text(content, {
			align: 'left'
		});

	draw_line(doc, doc.y + 1);
};

//Makes each item
const make_line = function(doc, line, right_align, RA_italics, size) {
	doc.fontSize(size);

	let text = line.content;
	let cont = right_align !== '';

	//if there is a title, print it, and let the text continue
	if (line.bullet){
		doc.font('Content Regular')
			.fontSize(size)
			.list([[line.content]], {
				bulletRadius: 2,
				bulletIndent: 15,
				textIndent: 20,
				midLine: 8
			});
	} else {
		if (line.title) {

			doc.font('Content Bold2')
			.fontSize(size)
			.text(line.title + ' ', {
				align: 'left',
				continued: true
			});
		}

		//set up text font / styling
		if (line.bold) {
			doc.font('Content Bold2');
		} 
		else if (line.italics) {
			doc.font('Content Italics');
		}
		else {
			doc.font('Content Regular');
		}

		if (!line.content) {
			line.content = '';
		}

		//print the text
		doc.fontSize(size)
			.text(line.content, {
				align: 'left',
				continued: cont
			});

		//if there is stuff on right align, print it
		if(cont) {
			if(RA_italics) {
				doc.font('Content Italics');
			} else {
				doc.font('Content Regular');
			}

			doc.fontSize(size)
				.text(right_align, {
					align: 'right'
				});
		}
	}
};


//Goes through each of the segments and creates another section
const make_segments = function(doc, schema, size) {
	//loop through each segment
	for(let i = 0; i < schema.segments.length; i++) {
		make_segment_title(doc, schema.segments[i].title, size);
		doc.moveDown(0.3);

		//loop though each item
		for(let j = 0; j < schema.segments[i].items.length; j++){
			const location_text = make_city_state(schema, i, j);
			const date_text = make_date(schema, i, j);

			let used_date = false;

			//loop through each line
			for (let k = 0; k < schema.segments[i].items[j].lines.length; k++) {
				const line = schema.segments[i].items[j].lines[k];

				let right_align = '';
				let RA_italics = false;
				if (k === 0 && location_text) {
					right_align = location_text;
					RA_italics = false;
				}
				else if (k === 0 && date_text) {
					used_date = true;
					RA_italics = true;
					right_align = date_text;
				}
				else if (k === 1 && !used_date) {
					used_date = true;
					RA_italics = true;
					right_align = date_text;
				}

				make_line(doc, line, right_align, RA_italics, size);
			}

			doc.fontSize(size).moveDown(.3);
		}

		doc.fontSize(size).moveDown(-1);
	}
}

const getLines = function(line, size, docWidth) {
	const defaultWidth = fontinfo[3]['W'];

	//Length of the title of the line
	let width = 0;
	if (line.title) {
		for (let i = 0; i < line.title.length; i++) {
			width += (fontinfo[5][i] || defaultWidth) * size;
		}
	}

	//Length of the content of the line
	if (line.content) {
		for (let i = 0; i < line.content.length; i++) {
			width += (fontinfo[3][i] || defaultWidth) * size;
		}
	}

	//If using bullet points make sure to space according to indent
	if (line.bullet) {
		let bulletWidth = 0;
		for (let i = 0; i < dot.length; i++) {
			bulletWidth += (fontinfo[3][dot.substring(i, i+1)] || defaultWidth) * size;
		}
		const docBulletWidth = docWidth - bulletWidth;

		return Math.ceil(width / docBulletWidth);
	}

	//number of lines being used
	return Math.ceil(width / docWidth);
}

const sizeFits = function(doc, schema, size) {
	//base width: 612
	//base height: 792

	const contactHeight = (headingFontSize * fontinfo[0].ysize) + (contactFontSize * fontinfo[1].ysize * 2);

	const docWidth = 612 - doc.page.margins.left - doc.page.margins.right;
	const docHeight = 792 - doc.page.margins.top - doc.page.margins.bottom - contactHeight;

	let segments = 0;
	let items = 0;
	let lines = 0;

	//Cycle through segments
	for (let i = 0; i < schema.segments.length; i++) {
		segments++;

		//Cycle through items
		for (let j = 0; j < schema.segments[i].items.length; j++) {
			items++;

			//Cycle through lines
			for (let k = 0; k < schema.segments[i].items[j].lines.length; k++) {

				lines += getLines(schema.segments[i].items[j].lines[k], size, docWidth);

			}
		}
	}

	const k = 0;
	const c = 0;
	const f = 0.7;
	console.log(docHeight, size * ((lines * f) + (segments * k) + (items * c)));
	return docHeight >= size * ((lines * f) + (segments * k) + (items * c));
}

//Make font size based on lines of text in the PDF
//TODO count multiple lines of text
const make_size = function(doc, schema) {
	let start = (new Date()).getTime();
	let size = 12;
	while (!sizeFits(doc, schema, size)) {
		size -= 0.1;
	}

	console.log('Time to make size:', ((new Date()).getTime() - start));
	
	if (size > 12) {
		return 12;
	} else if (size < 7.5) {
		return 7.5;
	} else {
		return size;
	}
}

const make_mysql_connection = function() {
	const connection = mysql.createConnection(process.env.JAWSDB_URL);
	connection.connect();

	return connection;
}

//Adds one to count of PDFs generated
const add_one_to_count = function() {

	let count = 1;

	const connection = make_mysql_connection();

	//Create new table if none
	connection.query('CREATE TABLE IF NOT EXISTS `abc` (`n` int DEFAULT 1);', function(err, rows, fields) {
		if (err) console.log('MYSQL create table fail');
	});

	//Get the value of the current count
	connection.query('SELECT `n` FROM `abc`', function(err, rows, fields) {
		if (err) console.log('MYSQL select value fail');
		count = rows[0].n;
		write_to_file(count + 1)
	});

	//If there is no value yet (new table) set it to 1
	// if (result.length === 0) {
	// 	connection.query('INSERT INTO `abc` VALUES (1)', function(err, rows, fields){
	// 		if (err) console.log('MYSQL insert value fail');
	// 	});
	// }

	//Increment value by 1
	connection.query('UPDATE `abc` SET `n` = `n` + 1;', function(err, rows, fields) {
		if (err) console.log('MYSQL update value fail');
	});

	connection.end();
}

//Write to file accesible by frontend
const write_to_file = function(count){
	const filepath = path.join(__dirname + '/count.txt');

	//make file if not exist, aka first time
	if (!fs.existsSync(filepath)){
		console.log('Creating count.txt file');
		fs.openSync(filepath, 'w');

	    fs.writeFile(filepath, count, function (err) {});
	}

	const file = fs.readFileSync(filepath, 'utf-8');
	fs.writeFileSync(filepath, count, 'utf-8');

	console.log('Total Resumes Generated: ' + count);
}


module.exports = {
	handler: function schema_to_pdf(schema) {

		console.log('Generating a PDF:\n' + JSON.stringify(schema));

		//Find font-size for body of PDF

		//Create and make the PDF
		let doc = set_up_doc(schema);

		const size = make_size(doc, schema);
		console.log('PDF Font Size:', size);
		
		make_header(doc, schema);
		make_segments(doc, schema, size);
		doc.end();

		//Add one to number of PDFs generated
		// add_one_to_count();

		console.log('PDF Generated with name: ' + schema.docname);

		return path.join('/backend/pdfs/' + schema.docname);
	},

	start_count: function set_og_file() {
		const connection = make_mysql_connection();
		//Get the value of the current count
		connection.query('SELECT `n` FROM `abc`', function(err, rows, fields) {
			if (err) console.log('MYSQL select value fail');
			write_to_file(rows[0].n);
		});
	}
};