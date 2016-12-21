'use strict';

const PDFDocument = require('pdfkit');
const fs = require('fs');

//This will be the autofill for the website
let schema = {
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
					title: 'University', 
					city: 'City', 
					state: 'ST',
					start_month: 'month',
					start_year: 'year',
					end_month: 'month',
					end_year: 'year',
					lines: [
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
					title: 'High School',
					city: 'City',
					state: 'ST',
					start_month: 'month',
					start_year: 'year',
					end_month: 'month',
					end_year: 'year',
					lines: [
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
					title: 'Employer',
					city: 'City',
					state: 'ST',
					start_month: 'month',
					start_year: 'year',
					end_month: 'month',
					end_year: 'year',
					lines: [
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
					title: 'Employer',
					city: 'City',
					state: 'ST',
					start_month: 'month',
					start_year: 'year',
					end_month: 'month',
					end_year: 'year',
					lines: [
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
					title: 'Organization',
					city: 'City',
					state: 'ST',
					start_month: 'month',
					start_year: 'year',
					end_month: 'month',
					end_year: 'year',
					lines: [
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
					title: 'Organization',
					city: 'City',
					state: 'ST',
					start_month: 'month',
					start_year: 'year',
					end_month: 'month',
					end_year: 'year',
					lines: [
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
					title: '',
					city: '',
					state: '',
					start_month: '',
					start_year: '',
					end_month: '',
					end_year: '',
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
		},

		{
			title: 'ACTIVITIES',
			items: [
				{
					title: '',
					city: '',
					state: '',
					start_month: '',
					start_year: '',
					end_month: '',
					end_year: '',
					lines: [
						{
							bullet: false,
							content: 'title/role'
						},
						{
							bullet: false,
							content: 'title/role'
						},
						{
							bullet: false,
							content: 'title/role'
						}
					]
				}
			]
		}
	]
}

//Creates the doc with all the sizes and fonts
let set_up_doc = function() {
	const doc = new PDFDocument({
		margins : {
			top:72, 
			bottom:36, 
			right:36, 
			left:36
		}
	});


	let docname = (new Date()).getTime() + '.pdf';
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
	let headingFontSize = 24;
	let titleFontSize = 12;
	let contentFontSize = 10.2;
	doc.lineGap(-0.2);

	return doc
}

//Creates the header portion of the PDF that uses schema.contact
let make_header = function(doc, schema) {
	let dot = ' • ';
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

let draw_line = function(doc, x1, x2, y) {
	doc.lineWidth(1)
   		.moveTo(x1, y)
   		.lineTo(x2, y)
   		.stroke();
}

//Goes through each of the segments and creates another section
let make_segments = function(doc, schema) {
	//loop through each section
	for(let i = 0; i < schema.segments.length; i++) {

		doc.font('Section Title')
			.fontSize(titleFontSize)
			.moveDown()
			.text(schema.segments.title, {
				align: 'left'
			});

		if (i == 0) { draw_line(doc, 36, 576, 114) }

		//loop though each subsection
		for(let j = 0; j < schema.segments[i].items[j].length; j++){

			for (let k = 0; k < schema.segments[i].items[j].lines[k].length; k++)

		}
	}
}

let schema_to_pdf = function(schema) {
	let doc = set_up_doc();
	make_header(doc, schema);
}

//Education
//Education:Title
doc.font('Section Title')
	.fontSize(titleFontSize)
	.moveDown()
	.text('EDUCATION', {
    	align: 'left'
	});
//Education:Bar
doc.lineWidth(1)
   .moveTo(36, 114)
   .lineTo(576, 114)
   .stroke();

//Education:University
doc.font('Content Bold2')
	.fontSize(contentFontSize)
	.moveDown(0.2)
	.text('University', {
		align: 'left',
		continued: true
	})
	.font('Content Regular')
	.text('City, STATE', {
		align: 'right',
	});

//Education:University:Degree
doc.font('Content Regular')
	.text('Degree' + ' (Candidate) ' + 'in Major', {
		align: 'left',
		continued: true
	})
	.font('Content Italics')
	.text('(Expected) ' + 'Month Year of Graduation', {
		align: 'right'
	});

//Education:University:Certificate
doc.font('Content Regular')
	.text('Certificate (if you have one)', {
		align: 'left'
	});

//Education:University:GPA
doc.font('Content Regular')
	.text('GPA ' + 'X.XX' + ' (include if >3)', {
		align: 'left'
	});

//Education:University:Honors/Awards
doc.font('Content Bold1')
	.text('Honors/Awards: ', {
		align: 'left',
		continued: true
	})
	.font('Content Regular')
	.text('Honor' + ', Award' + ', Honor' + ', Award', {
		align: 'left'
	});

//Education:University:Relevant Coursework
doc.font('Content Bold1')
	.text('Relevant Coursework: ', {
		align: 'left',
		continued: true
	})
	.font('Content Regular')
	.text('Course' + ', Work' + ', Course' + ', Work', {
		align: 'left'
	});

//Education:High School
doc.font('Content Bold2')
	.fontSize(contentFontSize)
	.moveDown(0.6)
	.text('High School', {
		align: 'left',
		continued: true
	})
	.font('Content Regular')
	.text(' – ', {
		align: 'left',
		continued: true
	})
	.font('Content Italics')
	.text('GPA: XX.X (unweighted/weighted)', {
		align: 'left',
		continued: true
	})
	.font('Content Regular')
	.text('City, STATE', {
		align: 'right',
	});

//Education:High School:Degree
doc.font('Content Regular')
	.text('High School Diploma/GED', {
		align: 'left',
		continued: true
	})
	.font('Content Italics')
	.text('Month Year of Graduation', {
		align: 'right'
	});

//Education:High School:Honors/Awards
doc.font('Content Bold1')
	.text('Honors/Awards: ', {
		align: 'left',
		continued: true
	})
	.font('Content Regular')
	.text('Honor' + ', Award' + ', Honor' + ', Award', {
		align: 'left'
	});

//Professional Experience
//Professional Experience:Title
doc.font('Section Title')
	.fontSize(titleFontSize)
	.moveDown()
	.text('PROFESSIONAL EXPERIENCE', {
    	align: 'left'
	});

//Professional Experience:Bar
doc.lineWidth(1)
   .moveTo(36, 275)
   .lineTo(576, 275)
   .stroke();

//Professional Experience:Employer 1
doc.font('Content Bold2')
	.fontSize(contentFontSize)
	.moveDown(0.2)
	.text('Employer', {
		align: 'left',
		continued: true
	})
	.font('Content Regular')
	.text('City, STATE', {
		align: 'right',
	});

//Professional Experience:Employer 1:Title/Position
doc.font('Content Italics')
	.text('Title/Position', {
		align: 'left',
		continued: true
	})
	.text('Month Year Start' + '–' + 'Month Year End', {
		align: 'right'
	});

//Professional Experience:Employer 1: Content
doc.font('Content Regular')
	.text(' ' + dot + ' ' + 'Action verb + Project + Result', {
		align: 'left'
	})
	.text(' ' + dot + ' ' + 'Accomplishments Achieved', {
		align: 'left'
	})
	.text(' ' + dot + ' ' + 'Quantify number of people/items/data you worked with', {
		align: 'left'
	});

//Professional Experience:Employer 2
doc.font('Content Bold2')
	.fontSize(contentFontSize)
	.moveDown(0.6)
	.text('Employer', {
		align: 'left',
		continued: true
	})
	.font('Content Regular')
	.text('City, STATE', {
		align: 'right',
	});

//Professional Experience:Employer 2:Title/Position
doc.font('Content Italics')
	.text('Title/Position', {
		align: 'left',
		continued: true
	})
	.text('Month Year Start' + '–' + 'Month Year End', {
		align: 'right'
	});

//Professional Experience:Employer 2: Content
doc.font('Content Regular')
	.text(' ' + dot + ' ' + 'Action verb + Project + Result', {
		align: 'left'
	})
	.text(' ' + dot + ' ' + 'Accomplishments Achieved', {
		align: 'left'
	})
	.text(' ' + dot + ' ' + 'Quantify number of people/items/data you worked with', {
		align: 'left'
	});

//Leadership and Service
//Leadership and Service:Title
doc.font('Section Title')
	.fontSize(titleFontSize)
	.moveDown()
	.text('LEADERSHIP AND SERVICE', {
    	align: 'left'
	});

//Leadership and Service:Bar
doc.lineWidth(1)
   .moveTo(36, 450)
   .lineTo(576, 450)
   .stroke();

//Leadership and Service:Organization 1
doc.font('Content Bold2')
	.fontSize(contentFontSize)
	.moveDown(0.2)
	.text('Organization', {
		align: 'left',
		continued: true
	})
	.font('Content Regular')
	.text('City, STATE', {
		align: 'right',
	});

//Leadership and Service:Organization 1:Title/Role
doc.font('Content Italics')
	.text('Title/Role', {
		align: 'left',
		continued: true
	})
	.text('Month Year Start' + '–' + 'Month Year End', {
		align: 'right'
	});

//Leadership and Service:Organization 1: Content
doc.font('Content Regular')
	.text(' ' + dot + ' ' + 'Action verb + Project + Result', {
		align: 'left'
	})
	.text(' ' + dot + ' ' + 'Accomplishments Achieved', {
		align: 'left'
	})
	.text(' ' + dot + ' ' + 'Quantify number of people/items/data you worked with', {
		align: 'left'
	});

//Leadership and Service:Organization 2
doc.font('Content Bold2')
	.fontSize(contentFontSize)
	.moveDown(0.6)
	.text('Organization', {
		align: 'left',
		continued: true
	})
	.font('Content Regular')
	.text('City, STATE', {
		align: 'right',
	});

//Leadership and Service:Organization 2:Title/Role
doc.font('Content Italics')
	.text('Title/Role', {
		align: 'left',
		continued: true
	})
	.text('Month Year Start' + '–' + 'Month Year End', {
		align: 'right'
	});

//Leadership and Service:Organization 2: Content
doc.font('Content Regular')
	.text(' ' + dot + ' ' + 'Action verb + Project + Result', {
		align: 'left'
	})
	.text(' ' + dot + ' ' + 'Accomplishments Achieved', {
		align: 'left'
	})
	.text(' ' + dot + ' ' + 'Quantify number of people/items/data you worked with', {
		align: 'left'
	});


//Skills
//Skills:Title
doc.font('Section Title')
	.fontSize(titleFontSize)
	.moveDown()
	.text('SKILLS', {
    	align: 'left'
	});

//Skills:Bar
doc.lineWidth(1)
   .moveTo(36, 625)
   .lineTo(576, 625)
   .stroke();

//Skills:Domain 1
doc.font('Content Bold1')
	.fontSize(contentFontSize)
	.moveDown(0.2)
	.text('Domain: ', {
		align: 'left',
		continued: true
	})
	.font('Content Regular')
	.text('Skill' + ', Skill' + ', Skill' + ', Skill', {
		align: 'left'
	});

//Skills:Domain 2
doc.font('Content Bold1')
	.text('Domain: ', {
		align: 'left',
		continued: true
	})
	.font('Content Regular')
	.text('Skill' + ', Skill' + ', Skill' + ', Skill', {
		align: 'left'
	});

//Skills:Domain 3
doc.font('Content Bold1')
	.text('Domain: ', {
		align: 'left',
		continued: true
	})
	.font('Content Regular')
	.text('Skill' + ', Skill' + ', Skill' + ', Skill', {
		align: 'left'
	});


//Activities
//Activities:Title
doc.font('Section Title')
	.fontSize(titleFontSize)
	.moveDown()
	.text('ACTIVITIES', {
    	align: 'left'
	});

//Activities:Bar
doc.lineWidth(1)
   .moveTo(36, 696)
   .lineTo(576, 696)
   .stroke();

//Activities:Activity 1
doc.font('Content Italics')
	.fontSize(contentFontSize)
	.moveDown(0.2)
	.text('Title/Role, ', {
		align: 'left',
		continued: true
	})
	.font('Content Regular')
	.text('Group/Organization', {
		align: 'left',
		continued: true
	})
	.text('Month Year Start' + '–' + 'Month Year End', {
		align: 'right'
	});

//Activities:Activity 2
doc.font('Content Italics')
	.text('Title/Role, ', {
		align: 'left',
		continued: true
	})
	.font('Content Regular')
	.text('Group/Organization', {
		align: 'left',
		continued: true
	})
	.text('Month Year Start' + '–' + 'Month Year End', {
		align: 'right'
	});

//Activities:Activity 3
doc.font('Content Italics')
	.text('Title/Role, ', {
		align: 'left',
		continued: true
	})
	.font('Content Regular')
	.text('Group/Organization', {
		align: 'left',
		continued: true
	})
	.text('Month Year Start' + '–' + 'Month Year End', {
		align: 'right'
	});


doc.end();


