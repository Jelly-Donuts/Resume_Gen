'use strict';

const PDFDocument = require('./pdfkit');
const fs          = require('fs');
const uuid        = require('uuid/v4');
const path        = require('path');
const mysql       = require('mysql');
const fontinfo    = require('./fontinfo.json');
const emailer     = require('./emailer');
const pdfText     = require('pdf-text');
const Q           = require('q');

const headingFontSize = 27;
const contactFontSize = 12;

const dot = ' • ';

//Strings for tiny white text
const startString = "start:";
const endString = ":end";

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
			bottom:30,
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
	if (line.bullet) {
		doc.font('Content Regular')
			.fontSize(size)
			.list([[line.content]], {
				bulletRadius: 2,
				bulletIndent: 15,
				textIndent: 20,
				lineBreak: true,
				midLine: 8 * (size/12),
			});
	} else {
		if (line.title && cont) {
			doc.font('Content Bold2')
				.fontSize(size)
				.text(line.title + ' ', {
					align: 'left',
					continued: true
				});
		} else if (line.title) {
			doc.font('Content Bold2')
				.fontSize(size)
				.text(line.title + ' ', {
					align: 'left',
					continued: false
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

		if (!line.content || line.content.indexOf('null') != -1) {
			line.content = '';
		}

		const needCont = !line.title && cont;

		//print the text
		doc.fontSize(size)
			.text(line.content, {
				align: 'left',
				continued: needCont
			});

		//if there is stuff on right align, print it
		if(cont) {
			if(RA_italics) {
				doc.font('Content Italics');
			} else {
				doc.font('Content Regular');
			}

			if (!right_align || right_align.indexOf('null') != -1) {
				right_align = '   ';
			}

			doc.fontSize(size)
				.text(right_align, {
					align: 'right',
					continued: false
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
				else if (k === 1 && !used_date && date_text) {
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

//Adds the entire schema in tiny white text on bottom of pdf for reupload
const make_small_text = function(doc, schema) {
	doc.fontSize(1)
		.fillColor("#FFFFFF")
		.text(startString + JSON.stringify(schema) + endString, 0, 0);
}

const getLines = function(line, size, docWidth) {
	const defaultWidth = fontinfo[3]['W'];
	let pageWidth      = docWidth;
	if (line.bullet) {
		let bulletWidth = 35;
		pageWidth = docWidth - bulletWidth;
	}

	//Length of the title of the line
	let width = 0;
	if (line.title) {
		for (let i = 0; i < line.title.length; i++) {
			width += (fontinfo[5][line.title[i]] || defaultWidth) * size;
		}
	}

	//Length of the content of the line
	if (line.content) {
		const words = line.content.split(' ');
		for (let i = 0; i < words.length; i++) {
			let wordWidth = 0;
			for (let j = 0; j < words[i].length; j++) {
				wordWidth += (fontinfo[3][words[i][j]] || defaultWidth) * size;
			}
			if (i !== 0 && i < words.length - 1){
				wordWidth += fontinfo[3][" "] * size;
			}
			if (width + wordWidth > Math.ceil((width + 0.001)/pageWidth)*pageWidth) {
				width = Math.ceil(width/pageWidth)*pageWidth + wordWidth;
			}
			else {
				width += wordWidth;
			}
		}
	}

	//number of lines being used
	return Math.ceil(width / pageWidth);
}

const sizeFits = function(doc, schema, size) {
	//base width: 612
	//base height: 792

	const contactHeight = (headingFontSize * fontinfo[0]["ysize"]) + 
				(contactFontSize * fontinfo[1]["ysize"] * 2);
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

	const k = 1.4;
	const c = 0.3;
	const f = 1.21;
	return docHeight >= size * ((lines * f) + (12*(segments * k)/size) + (items * c));
}

//Make font size based on lines of text in the PDF
const make_size = function(doc, schema) {
	let size = 12;
	while (!sizeFits(doc, schema, size)) {
		size -= 0.1;
		if (size <= 7.5){
			break;
		}
	}

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
const add_one_to_count = function(callback) {

	let count = 1;

	const connection = make_mysql_connection();

	//Create new table if none
	const create_query = 'CREATE TABLE IF NOT EXISTS `abc` (`n` int DEFAULT 1);'
	connection.query(create_query, function(err, rows, fields) {
		if (err) {
			console.log('MYSQL create table fail');
			callback(null, error);
		};
	});

	//Get the value of the current count
	const select_query = 'SELECT `n` FROM `abc`'
	connection.query(select_query, function(err, rows, fields) {
		if (err) {
			console.log('MYSQL select value fail')
			callback(null, error);
		};
		count = rows[0].n;
		write_to_file(count + 1)
	});

	//Increment value by 1
	const update_query = 'UPDATE `abc` SET `n` = `n` + 1;'
	connection.query(update_query, function(err, rows, fields) {
		if (err) {
			console.log('MYSQL update value fail');
			callback(null, error);
		};
	});

	connection.end();
}

//Write to file accesible by frontend
const write_to_file = function(count){
	const filepath = path.join(__dirname + '/count.txt');

	//make file if not exist, aka first time
	if (!fs.existsSync(filepath)){
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

		//Create and make the PDF
		let doc = set_up_doc(schema);

		const size = make_size(doc, schema);

		make_header(doc, schema);
		make_segments(doc, schema, size);
		make_small_text(doc, schema);
		doc.end();

		//Add one to number of PDFs generated
		// add_one_to_count(function (res, err) {
		// 	if (err) {
		// 		console.log("Error in adding one to count");
		// 		return;
		// 	}
		// });

		console.log('PDF Generated with name: ' + schema.docname);

		let emailMessage = 'PDF Created:\n\n' + JSON.stringify(schema, null, 2);
		emailer.sendMessage(emailMessage);

		return path.join('/pdf/' + schema.docname);

	},

	upload_resume: function parse_info(pdf) {
		var deferred = Q.defer();

		var buffer = fs.readFileSync(pdf);
		console.log(buffer);

		Q.fcall(function() {
			pdfText(buffer, function(err, chunks) {
				if (err) {
					deferred.reject(("ERROR, could not read PDF"));
					return;
				}
				for (var i; i < chunks.length; i++) {
					if (chunks[i].indexOf(startString) != -1 && chunks[i].indexOf(endString) != -1) {
						console.log(chunks[i]);
						deferred.resolve((chunks[i]));
						return;
					}
				}
				deferred.reject(("ERROR, could not find schema"));
			});
		});

		return deferred.promise;
	},

	start_count: function set_og_file() {
		const connection = make_mysql_connection();
		//Get the value of the current count
		const select_query = 'SELECT `n` FROM `abc`'
		connection.query(select_query, function(err, rows, fields) {
			if (err) console.log('MYSQL select value fail');
			write_to_file(rows[0].n);
		});
	}
};
