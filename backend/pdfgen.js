'use strict';
console.log(1);
const PDFDocument = require('pdfkit');
const fs = require('fs');
const uuid = require('uuid/v4');
console.log(2);
const headingFontSize = 24;
const contactFontSize = 12;
const contentFontSize = 10.5;

const dot = ' • ';

//This will be the autofill for the website
// const schema = {
//     contact: {
//         name: 'John Doe',
//         address: '1234 Main Street, Anytown, STATE 56789',
//         reach: [
//             'email@address.com',
//             '(999) 999-9999',
//             ''
//         ]
//     },
//     segments: [
//         {
//             title: 'EDUCATION',
//             items: [
//                 {
//                     city: 'City', 
//                     state: 'ST',
//                     start_date: 'month-year',
//                     end_date: 'month-year',
//                     lines: [
//                         {
//                             bullet: false,
//                             title: 'University',
//                             content: ''
//                         },
//                         {
//                             bullet: false,
//                             content: 'Degree (Candidate) in Major'
//                         },
//                         {
//                             bullet: false,
//                             content: 'Certificate (if you have one)'
//                         },
//                         {
//                             bullet: false,
//                             content: 'GPA X.XX (include if >3)'
//                         },
//                         {
//                             bullet: false,
//                             title: 'Honors/Awards',
//                             content: 'Honor, Award, Honor, Award'
//                         },
//                         {
//                             bullet: false,
//                             title: 'Relevant Coursework',
//                             content: 'Course, Work, Course, Work'
//                         }
//                     ]
//                 },
//                 {
//                     city: 'City',
//                     state: 'ST',
//                     start_date: 'month-year',
//                     end_date: 'month-year',
//                     lines: [
//                         {
//                             title: 'High School',
//                             bullet: false,
//                             content: ''
//                         },
//                         {
//                             bullet: false,
//                             content: 'High School Diploma/GED'
//                         },
//                         {
//                             bullet: false,
//                             content: 'GPA: XX.X (unweighted/weighted)'
//                         },
//                         {
//                             bullet: false,
//                             title: 'Honors/Awards',
//                             content: 'Honor, Award, Honor, Award'
//                         }
//                     ]
//                 }
//             ]
//         },

//         {
//             title: 'PROFESSIONAL EXPERIENCE',
//             items: [
//                 {
//                     city: 'City',
//                     state: 'ST',
//                     start_date: 'month-year',
//                     end_date: 'month-year',
//                     lines: [
//                         {
//                             title: 'Employer',
//                             content: '',
//                             bullet: false
//                         },
//                         {
//                             bullet: false,
//                             italics: true,
//                             content: 'Title/Position'
//                         },
//                         {
//                             bullet: true,
//                             content: 'Action verb + Project + Result'
//                         },
//                         {
//                             bullet: true,
//                             content: 'Accomplishments Achieved'
//                         },
//                         {
//                             bullet: true,
//                             content: 'Quantify number of people/items/data you worked with'
//                         }
//                     ]
//                 },
//                 {
//                     city: 'City',
//                     state: 'ST',
//                     start_date: 'month-year',
//                     end_date: 'month-year',
//                     lines: [
//                         {
//                             title: 'Employer',
//                             bullet: false,
//                             content: ''
//                         },
//                         {
//                             bullet: false,
//                             italics: true,
//                             content: 'Title/Position'
//                         },
//                         {
//                             bullet: true,
//                             content: 'Action verb + Project + Result'
//                         },
//                         {
//                             bullet: true,
//                             content: 'Accomplishments Achieved'
//                         },
//                         {
//                             bullet: true,
//                             content: 'Quantify number of people/items/data you worked with'
//                         }
//                     ]
//                 }
//             ]
//         },

//         {
//             title: 'LEADERSHIP AND SERVICE',
//             items: [
//                 {
//                     city: 'City',
//                     state: 'ST',
//                     start_date: 'month-year',
//                     end_date: 'month-year',
//                     lines: [
//                         {
//                             title: 'Organization',
//                             content: '',
//                             bullet: false
//                         },
//                         {
//                             bullet: false,
//                             italics: true,
//                             content: 'Title/Position'
//                         },
//                         {
//                             bullet: true,
//                             content: 'Action verb + Project + Result'
//                         },
//                         {
//                             bullet: true,
//                             content: 'Accomplishments Achieved'
//                         },
//                         {
//                             bullet: true,
//                             content: 'Quantify number of people/items/data you worked with'
//                         }
//                     ]
//                 },
//                 {
//                     city: 'City',
//                     state: 'ST',
//                     start_date: 'month-year',
//                     end_date: 'month-year',
//                     lines: [
//                         {
//                             title: 'Organization',
//                             content: '',
//                             bullet: false
//                         },
//                         {
//                             bullet: false,
//                             italics: true,
//                             content: 'Title/Position'
//                         },
//                         {
//                             bullet: true,
//                             content: 'Action verb + Project + Result'
//                         },
//                         {
//                             bullet: true,
//                             content: 'Accomplishments Achieved'
//                         },
//                         {
//                             bullet: true,
//                             content: 'Quantify number of people/items/data you worked with'
//                         }
//                     ]
//                 },
//             ]
//         },

//         {
//             title: 'SKILLS',
//             items: [
//                 {
//                     city: '',
//                     state: '',
//                     start_date: '',
//                     end_date: '',
//                     lines: [
//                         {
//                             bullet: false,
//                             title: 'Skill',
//                             content: 'Skill, skill, skill, skill'
//                         },
//                         {
//                             bullet: false,
//                             title: 'Skill',
//                             content: 'Skill, skill, skill, skill'
//                         },  
//                         {
//                             bullet: false,
//                             title: 'Skill',
//                             content: 'Skill, skill, skill, skill'
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// }

const has_city_and_state = function(schema, i, j) {
	return has_city(schema, i, j) && has_state(schema, i, j);
}
const has_city = function(schema, i, j){
	return schema.segments[i].items[j].city !== '';
}
const has_state = function(schema, i, j) {
	return schema.segments[i].items[j].state !== '';
}

const has_start_date = function(schema, i, j){
	return schema.segments[i].items[j].start_date !== '';
}
const has_end_date = function(schema, i, j){
	return schema.segments[i].items[j].end_date !== '';
}

const make_start_date = function(schema, i, j){
	let item = schema.segments[i].items[j];
	if (has_start_date(schema, i, j)){
		return item.start_date;
	}
	return '';
}
const make_end_date = function(schema, i, j){
	let item = schema.segments[i].items[j];
	if (has_end_date(schema, i, j)) {
		return item.end_date;
	}
	return '';
}

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

	if (!schema.docname) {
		schema.docname = uuid() + '.pdf';
	}
	doc.pipe(fs.createWriteStream('./pdfs/' + schema.docname));

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

	return doc;
}

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
}

//Draws the horizontal lines at ycoord
const draw_line = function(doc, y) {
	doc.lineWidth(1)
   		.moveTo(36, y)
   		.lineTo(576, y)
   		.stroke();
}

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
}

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
}


// !!!TODO!!! figure out how to draw line at correct position
//Sets up the header for each segment in the doc
const make_segment_title = function(doc, content) {
	doc.font('Title')
		.fontSize(contactFontSize)
		.moveDown()
		.text(content, {
			align: 'left'
		});

	draw_line(doc, doc.y);
}


//Makes each item
const make_line = function(doc, line, right_align, size) {
	doc.fontSize(size);

	let text = line.content;
	let cont = right_align !== '';

	//print the bullet first, if there is one
	if (line.bullet){
		doc.font('Content Regular')
			.fontSize(size)
			.text(' ' + dot + ' ', {
				align: 'left',
				continued: true
			});
	}

	//if there is a title, print it, and let the text continue
	if (line.title) {

		doc.font('Title')
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
	doc.font('Content Regular')
		.fontSize(size)
		.text(line.content, {
			align: 'left',
			continued: cont
		});

	//if there is stuff on right align, print it
	if(cont) {
		doc.font('Content Regular')
			.fontSize(size)
			.text(right_align, {
				align: 'right'
			});
	}
}


//Goes through each of the segments and creates another section
const make_segments = function(doc, schema, size) {
	//loop through each segment
	for(let i = 0; i < schema.segments.length; i++) {
		make_segment_title(doc, schema.segments[i].title, size);

		//loop though each item
		for(let j = 0; j < schema.segments[i].items.length; j++){
			const location_text = make_city_state(schema, i, j);
			const date_text = make_date(schema, i, j);

			let used_date = false;

			//loop through each line
			for (let k = 0; k < schema.segments[i].items[j].lines.length; k++) {
				const line = schema.segments[i].items[j].lines[k];

				let right_align = '';
				if (k == 0 && location_text) {
					right_align = location_text;
				}
				else if (k == 0 && date_text) {
					used_date = true;
					right_align = date_text;
				}
				else if (k == 1 && !used_date) {
					used_date = true;
					right_align = date_text;
				}

				make_line(doc, line, right_align, size);
			}

			doc.fontSize(size).moveDown(0.6);
		}

		doc.fontSize(size).moveDown(-1);
	}
}

const make_size = function(schema) {

	//count number of lines
	let total = 0;
	for (let i = 0; i < schema.segments.length; i++){
		total += 1;
		for (let j = 0; j < schema.segments[i].items.length; j++) {
			total += 0.6;
			for (let k = 0; k < schema.segments[i].items[j].lines.length; k++) {
				total += 1;
			}
		}
	}

	//Woring space / (#lines * font-multiplier)
	const size = 670 / (total * 1.364);
	
	if (size > 12) {
		return 12;
	} else if (size < 7.5) {
		return 7.5;
	} else {
		return size;
	}
}

const add_one_to_count = function() {
  let file = fs.readFileSync('filelist.txt', 'utf-8');
  fs.writeFileSync('filelist.txt', file + 1, 'utf-8');
} 

module.exports = {
	handler: function schema_to_pdf(JSONobj) {

		console.log(5);

		let schema = JSON.parse(JSONobj)

		const size = make_size(schema);
		console.log(size);

		let doc = set_up_doc(schema);

		make_header(doc, schema, size);
		make_segments(doc, schema, size);	

		doc.end();

		add_one_to_count();

		return schema.docname;
	}
};