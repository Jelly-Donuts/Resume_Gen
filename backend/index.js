'use strict';

const PDFDocument = require('pdfkit');
const fs = require('fs');

const headingFontSize = 24;
const titleFontSize = 12;
const contentFontSize = 10.2;

const dot = ' • ';

//This will be the autofill for the website
const schema = {
    contact: {
        name: 'John Doe',
        address: '1234 Main Street, Anytown, STATE 56789',
        reach: [
            'email@address.com',
            '(999) 999-9999',
            ''
        ]
    },
    segments: [
        {
            title: 'EDUCATION',
            items: [
                {
                    city: 'City', 
                    state: 'ST',
                    start_date: 'month-year',
                    end_date: 'month-year',
                    lines: [
                        {
                            bullet: false,
                            title: 'University',
                            content: ''
                        },
                        {
                            bullet: false,
                            content: 'Degree (Candidate) in Major'
                        },
                        {
                            bullet: false,
                            content: 'Certificate (if you have one)'
                        },
                        {
                            bullet: false,
                            content: 'GPA X.XX (include if >3)'
                        },
                        {
                            bullet: false,
                            title: 'Honors/Awards',
                            content: 'Honor, Award, Honor, Award'
                        },
                        {
                            bullet: false,
                            title: 'Relevant Coursework',
                            content: 'Course, Work, Course, Work'
                        }
                    ]
                },
                {
                    city: 'City',
                    state: 'ST',
                    start_date: 'month-year',
                    end_date: 'month-year',
                    lines: [
                        {
                            title: 'High School',
                            bullet: false,
                            content: ''
                        },
                        {
                            bullet: false,
                            content: 'High School Diploma/GED'
                        },
                        {
                            bullet: false,
                            content: 'GPA: XX.X (unweighted/weighted)'
                        },
                        {
                            bullet: false,
                            title: 'Honors/Awards',
                            content: 'Honor, Award, Honor, Award'
                        }
                    ]
                }
            ]
        },

        {
            title: 'PROFESSIONAL EXPERIENCE',
            items: [
                {
                    city: 'City',
                    state: 'ST',
                    start_date: 'month-year',
                    end_date: 'month-year',
                    lines: [
                        {
                            title: 'Employer',
                            content: '',
                            bullet: false
                        },
                        {
                            bullet: false,
                            italics: true,
                            content: 'Title/Position'
                        },
                        {
                            bullet: true,
                            content: 'Action verb + Project + Result'
                        },
                        {
                            bullet: true,
                            content: 'Accomplishments Achieved'
                        },
                        {
                            bullet: true,
                            content: 'Quantify number of people/items/data you worked with'
                        }
                    ]
                },
                {
                    city: 'City',
                    state: 'ST',
                    start_date: 'month-year',
                    end_date: 'month-year',
                    lines: [
                        {
                            title: 'Employer',
                            bullet: false,
                            content: ''
                        },
                        {
                            bullet: false,
                            italics: true,
                            content: 'Title/Position'
                        },
                        {
                            bullet: true,
                            content: 'Action verb + Project + Result'
                        },
                        {
                            bullet: true,
                            content: 'Accomplishments Achieved'
                        },
                        {
                            bullet: true,
                            content: 'Quantify number of people/items/data you worked with'
                        }
                    ]
                }
            ]
        },

        {
            title: 'LEADERSHIP AND SERVICE',
            items: [
                {
                    city: 'City',
                    state: 'ST',
                    start_date: 'month-year',
                    end_date: 'month-year',
                    lines: [
                        {
                            title: 'Organization',
                            content: '',
                            bullet: false
                        },
                        {
                            bullet: false,
                            italics: true,
                            content: 'Title/Position'
                        },
                        {
                            bullet: true,
                            content: 'Action verb + Project + Result'
                        },
                        {
                            bullet: true,
                            content: 'Accomplishments Achieved'
                        },
                        {
                            bullet: true,
                            content: 'Quantify number of people/items/data you worked with'
                        }
                    ]
                },
                {
                    city: 'City',
                    state: 'ST',
                    start_date: 'month-year',
                    end_date: 'month-year',
                    lines: [
                        {
                            title: 'Organization',
                            content: '',
                            bullet: false
                        },
                        {
                            bullet: false,
                            italics: true,
                            content: 'Title/Position'
                        },
                        {
                            bullet: true,
                            content: 'Action verb + Project + Result'
                        },
                        {
                            bullet: true,
                            content: 'Accomplishments Achieved'
                        },
                        {
                            bullet: true,
                            content: 'Quantify number of people/items/data you worked with'
                        }
                    ]
                },
            ]
        },

        {
            title: 'SKILLS',
            items: [
                {
                    city: '',
                    state: '',
                    start_date: '',
                    end_date: '',
                    lines: [
                        {
                            bullet: false,
                            title: 'Skill',
                            content: 'Skill, skill, skill, skill'
                        },
                        {
                            bullet: false,
                            title: 'Skill',
                            content: 'Skill, skill, skill, skill'
                        },  
                        {
                            bullet: false,
                            title: 'Skill',
                            content: 'Skill, skill, skill, skill'
                        }
                    ]
                }
            ]
        }
    ]
}

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
const set_up_doc = function() {
	const doc = new PDFDocument({
		margins : {
			top:72, 
			bottom:36, 
			right:36, 
			left:36
		}
	});


	const docname = (new Date()).getTime() + '.pdf';
	doc.pipe(fs.createWriteStream('./pdfs/' + docname));

	//Template 1
	//Template 1:Fonts
	doc.registerFont('Heading Name', './fonts/Didot.ttf');
	doc.registerFont('Contact Info', './fonts/AvenirNext-UltraLight.ttf');
	doc.registerFont('Section Title', './fonts/Georgia Bold.ttf');
	doc.registerFont('Content Regular', './fonts/AvenirNext-Regular.ttf');
	doc.registerFont('Content Italics', './fonts/AvenirNext-Italic.ttf');
	doc.registerFont('Content Bold1', './fonts/AvenirNext-Medium.ttf');
	doc.registerFont('Content Bold2', './fonts/AvenirNext-DemiBold.ttf');

	//Template 1:Font Sizes
	doc.lineGap(-0.2);

	return doc
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
		.fontSize(titleFontSize)
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
	doc.font('Section Title')
		.fontSize(titleFontSize)
		.moveDown()
		.text(content, {
			align: 'left'
		});
}


//Makes each item
const make_line = function(doc, line, right_align) {
	doc.fontSize(contentFontSize);

	let text = line.content;
	let cont = right_align !== '';

	//print the bullet first, if there is one
	if (line.bullet){
		doc.font('Content Regular')
			.fontSize(contentFontSize)
			.text(' ' + dot + ' ', {
				align: 'left',
				continued: true
			});
	}

	//if there is a title, print it, and let the text continue
	if (line.title) {

		doc.font('Content Bold2')
		.fontSize(contentFontSize)
		.text('University', {
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

	//print the text
	doc.font('Content Regular')
		.fontSize(contentFontSize)
		.text(line.content, {
			align: 'left',
			continued: cont
		});

	//if there is stuff on right align, print it
	if(cont) {
		doc.font('Content Regular')
			.text(right_align, {
				align: 'right'
			});
	}
}


//Goes through each of the segments and creates another section
const make_segments = function(doc, schema) {
	//loop through each segment
	for(let i = 0; i < schema.segments.length; i++) {
		make_segment_title(doc, schema.segments[i].title);

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

				make_line(doc, line, right_align);
				doc.moveDown(0.2);
			}

			doc.moveDown(0.6);
		}

		doc.moveDown();
	}
}

const schema_to_pdf = function(schema) {
	let doc = set_up_doc();
	make_header(doc, schema);
	make_segments(doc, schema);
	doc.end();
}

schema_to_pdf(schema);

// //Education
// //Education:Title
// doc.font('Section Title')
// 	.fontSize(titleFontSize)
// 	.moveDown()
// 	.text('EDUCATION', {
//     	align: 'left'
// 	});
// //Education:Bar
// doc.lineWidth(1)
//    .moveTo(36, 114)
//    .lineTo(576, 114)
//    .stroke();

//Education:University
// doc.font('Content Bold2')
// 	.fontSize(contentFontSize)
// 	.moveDown(0.2)
// 	.text('University', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Regular')
// 	.text('City, STATE', {
// 		align: 'right',
// 	});

// //Education:University:Degree
// doc.font('Content Regular')
// 	.text('Degree' + ' (Candidate) ' + 'in Major', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Italics')
// 	.text('(Expected) ' + 'Month Year of Graduation', {
// 		align: 'right'
// 	});

// //Education:University:Certificate
// doc.font('Content Regular')
// 	.text('Certificate (if you have one)', {
// 		align: 'left'
// 	});

// //Education:University:GPA
// doc.font('Content Regular')
// 	.text('GPA ' + 'X.XX' + ' (include if >3)', {
// 		align: 'left'
// 	});

// //Education:University:Honors/Awards
// doc.font('Content Bold1')
// 	.text('Honors/Awards: ', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Regular')
// 	.text('Honor' + ', Award' + ', Honor' + ', Award', {
// 		align: 'left'
// 	});

// //Education:University:Relevant Coursework
// doc.font('Content Bold1')
// 	.text('Relevant Coursework: ', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Regular')
// 	.text('Course' + ', Work' + ', Course' + ', Work', {
// 		align: 'left'
// 	});

// //Education:High School
// doc.font('Content Bold2')
// 	.fontSize(contentFontSize)
// 	.moveDown(0.6)
// 	.text('High School', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Regular')
// 	.text(' – ', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Italics')
// 	.text('GPA: XX.X (unweighted/weighted)', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Regular')
// 	.text('City, STATE', {
// 		align: 'right',
// 	});

// //Education:High School:Degree
// doc.font('Content Regular')
// 	.text('High School Diploma/GED', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Italics')
// 	.text('Month Year of Graduation', {
// 		align: 'right'
// 	});

// //Education:High School:Honors/Awards
// doc.font('Content Bold1')
// 	.text('Honors/Awards: ', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Regular')
// 	.text('Honor' + ', Award' + ', Honor' + ', Award', {
// 		align: 'left'
// 	});

// //Professional Experience
// //Professional Experience:Title
// doc.font('Section Title')
// 	.fontSize(titleFontSize)
// 	.moveDown()
// 	.text('PROFESSIONAL EXPERIENCE', {
//     	align: 'left'
// 	});

// //Professional Experience:Bar
// doc.lineWidth(1)
//    .moveTo(36, 275)
//    .lineTo(576, 275)
//    .stroke();

// //Professional Experience:Employer 1
// doc.font('Content Bold2')
// 	.fontSize(contentFontSize)
// 	.moveDown(0.2)
// 	.text('Employer', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Regular')
// 	.text('City, STATE', {
// 		align: 'right',
// 	});

// //Professional Experience:Employer 1:Title/Position
// doc.font('Content Italics')
// 	.text('Title/Position', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.text('Month Year Start' + '–' + 'Month Year End', {
// 		align: 'right'
// 	});

// //Professional Experience:Employer 1: Content
// doc.font('Content Regular')
// 	.text(' ' + dot + ' ' + 'Action verb + Project + Result', {
// 		align: 'left'
// 	})
// 	.text(' ' + dot + ' ' + 'Accomplishments Achieved', {
// 		align: 'left'
// 	})
// 	.text(' ' + dot + ' ' + 'Quantify number of people/items/data you worked with', {
// 		align: 'left'
// 	});

// //Professional Experience:Employer 2
// doc.font('Content Bold2')
// 	.fontSize(contentFontSize)
// 	.moveDown(0.6)
// 	.text('Employer', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Regular')
// 	.text('City, STATE', {
// 		align: 'right',
// 	});

// //Professional Experience:Employer 2:Title/Position
// doc.font('Content Italics')
// 	.text('Title/Position', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.text('Month Year Start' + '–' + 'Month Year End', {
// 		align: 'right'
// 	});

// //Professional Experience:Employer 2: Content
// doc.font('Content Regular')
// 	.text(' ' + dot + ' ' + 'Action verb + Project + Result', {
// 		align: 'left'
// 	})
// 	.text(' ' + dot + ' ' + 'Accomplishments Achieved', {
// 		align: 'left'
// 	})
// 	.text(' ' + dot + ' ' + 'Quantify number of people/items/data you worked with', {
// 		align: 'left'
// 	});

// //Leadership and Service
// //Leadership and Service:Title
// doc.font('Section Title')
// 	.fontSize(titleFontSize)
// 	.moveDown()
// 	.text('LEADERSHIP AND SERVICE', {
//     	align: 'left'
// 	});

// //Leadership and Service:Bar
// doc.lineWidth(1)
//    .moveTo(36, 450)
//    .lineTo(576, 450)
//    .stroke();

// //Leadership and Service:Organization 1
// doc.font('Content Bold2')
// 	.fontSize(contentFontSize)
// 	.moveDown(0.2)
// 	.text('Organization', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Regular')
// 	.text('City, STATE', {
// 		align: 'right',
// 	});

// //Leadership and Service:Organization 1:Title/Role
// doc.font('Content Italics')
// 	.text('Title/Role', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.text('Month Year Start' + '–' + 'Month Year End', {
// 		align: 'right'
// 	});

// //Leadership and Service:Organization 1: Content
// doc.font('Content Regular')
// 	.text(' ' + dot + ' ' + 'Action verb + Project + Result', {
// 		align: 'left'
// 	})
// 	.text(' ' + dot + ' ' + 'Accomplishments Achieved', {
// 		align: 'left'
// 	})
// 	.text(' ' + dot + ' ' + 'Quantify number of people/items/data you worked with', {
// 		align: 'left'
// 	});

// //Leadership and Service:Organization 2
// doc.font('Content Bold2')
// 	.fontSize(contentFontSize)
// 	.moveDown(0.6)
// 	.text('Organization', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Regular')
// 	.text('City, STATE', {
// 		align: 'right',
// 	});

// //Leadership and Service:Organization 2:Title/Role
// doc.font('Content Italics')
// 	.text('Title/Role', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.text('Month Year Start' + '–' + 'Month Year End', {
// 		align: 'right'
// 	});

// //Leadership and Service:Organization 2: Content
// doc.font('Content Regular')
// 	.text(' ' + dot + ' ' + 'Action verb + Project + Result', {
// 		align: 'left'
// 	})
// 	.text(' ' + dot + ' ' + 'Accomplishments Achieved', {
// 		align: 'left'
// 	})
// 	.text(' ' + dot + ' ' + 'Quantify number of people/items/data you worked with', {
// 		align: 'left'
// 	});


// //Skills
// //Skills:Title
// doc.font('Section Title')
// 	.fontSize(titleFontSize)
// 	.moveDown()
// 	.text('SKILLS', {
//     	align: 'left'
// 	});

// //Skills:Bar
// doc.lineWidth(1)
//    .moveTo(36, 625)
//    .lineTo(576, 625)
//    .stroke();

// //Skills:Domain 1
// doc.font('Content Bold1')
// 	.fontSize(contentFontSize)
// 	.moveDown(0.2)
// 	.text('Domain: ', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Regular')
// 	.text('Skill' + ', Skill' + ', Skill' + ', Skill', {
// 		align: 'left'
// 	});

// //Skills:Domain 2
// doc.font('Content Bold1')
// 	.text('Domain: ', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Regular')
// 	.text('Skill' + ', Skill' + ', Skill' + ', Skill', {
// 		align: 'left'
// 	});

// //Skills:Domain 3
// doc.font('Content Bold1')
// 	.text('Domain: ', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Regular')
// 	.text('Skill' + ', Skill' + ', Skill' + ', Skill', {
// 		align: 'left'
// 	});


// //Activities
// //Activities:Title
// doc.font('Section Title')
// 	.fontSize(titleFontSize)
// 	.moveDown()
// 	.text('ACTIVITIES', {
//     	align: 'left'
// 	});

// //Activities:Bar
// doc.lineWidth(1)
//    .moveTo(36, 696)
//    .lineTo(576, 696)
//    .stroke();

// //Activities:Activity 1
// doc.font('Content Italics')
// 	.fontSize(contentFontSize)
// 	.moveDown(0.2)
// 	.text('Title/Role, ', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Regular')
// 	.text('Group/Organization', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.text('Month Year Start' + '–' + 'Month Year End', {
// 		align: 'right'
// 	});

// //Activities:Activity 2
// doc.font('Content Italics')
// 	.text('Title/Role, ', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Regular')
// 	.text('Group/Organization', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.text('Month Year Start' + '–' + 'Month Year End', {
// 		align: 'right'
// 	});

// //Activities:Activity 3
// doc.font('Content Italics')
// 	.text('Title/Role, ', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.font('Content Regular')
// 	.text('Group/Organization', {
// 		align: 'left',
// 		continued: true
// 	})
// 	.text('Month Year Start' + '–' + 'Month Year End', {
// 		align: 'right'
// 	});


// doc.end();


