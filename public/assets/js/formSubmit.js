$(function (){
	$("form").submit(function( ) {

        const schema = {
            contact : "",
            segments: []
        };

		let segmentContact = {
	        name   : $('#contact').find('.firstname').val() + " "  + $('#contact').find('.lastname').val(),
	        address: ($('#contact').find('.address').val() || '') + ", " + ($('#contact').find('.city').val() || '') + ", " + ($('#contact').find('.state').val() || '') + " " + ($('#contact').find('.zipcode').val() || ''),
	        reach  : [
	            $('#contact').find('email').val() || '',
	            $('#contact').find('phone').val() || ''
	        ]
		};

        schema.contact = segmentContact;

	 //    let segmentEducation = {};
	 //    let segmentProfExp = {};
	 //    let segmentExtracur = {};
	 //    let segmentSkills = {};

		// Create the University part of schema
	    for(let i = 1; i < $("[data-clone='university']").length; i++){
	    	if (i === 1) {
                const segmentEducation = {};
	    		segmentEducation.title = 'EDUCATION';
                segmentEducation.items = [];
                schema.segments.push(segmentEducation);
	    	}
	    	let university = '#univerisity' + i;
	    	let universityObj = {
                city      : $(university).find('.city').val(),
                state     : $(university).find('.state').val(),
                start_date: $(university).find('.month').val() + " " + $(university).find('.year').val(),
                end_date  : '',
                lines: [
                    {
                        title  : $(university).find('.name').val(),
                    },
                    {
                        content: $(university).find('.degree').val() + " in " + $(university).find('.major').val()
                    },
                    {
                        content: "GPA " + $(university).find('.gpa').val()
                    },
                    {
                    	title: '',
                    	content: '',
                    },
                    {
                    	title: '',
                    	content: '',
                    },
                ]
	    	};

	   		// Honors and Awards
	    	for (let j = 1; j < $(university).find('.award').length ; j++) {
	    		universityObj.lines[3].title = "Honors/Awards:";
	    		let awardID = university + 'award' + j;
	    		if ($(university).find(awardID).val()) {
	    			if (j !== 1) {
	    				universityObj.lines[3].content += ', ';
	    			}
	    			universityObj.lines[3].content += $(awardID).val();
		    	}
	    	}
	    	for (let k = 1; k < $(university).find('.course').length; k++) {
	    		universityObj.lines[4].title = "Relevant Coursework:";
	    		let courseID = university + 'course' + k;
	    		if ($(university).find(courseID).val()) {
	    			if (k !== 1) {
	    				universityObj.lines[4].content += ', ';
	    			}
	    			universityObj.lines[4].content += $(courseID).val();
		    	}
	    	}

	    	schema.segments[schema.segments.length - 1].items.push(universityObj);
	    }

		// Create the High School part of schema
	    for(let i = 1; i < $("[data-clone='highschool']").length; i++){
	    	if ((i === 1) && (schema.segments.length === 0)) {
                const segmentEducation = {};
	    		segmentEducation.title = 'EDUCATION';
                segmentEducation.items = [];
                schema.segments.push(segmentEducation);
	    	}
	    	let highschool = '#highschool' + i;
	    	let highschoolObj = {
                city      : $(highschool).find('.city').val(),
                state     : $(highschool).find('.state').val(),
                start_date: $(highschool).find('.month').val() + " " + $(highschool).find('.year').val(),
                end_date  : '',
                lines: [
                    {
                        title  : $(highschool).find('.name').val(),
                    },
                    {
	                    content: 'High School Diploma - GPA ' + $(highschool).find('.gpa').val()
	                },
                    {
                    	title: '',
                    	content: '',
                    }
                ]
	    	};

	   		// Honors and Awards
	    	for (let j = 1; j < $(highschool).find('.award').length ; j++) {
	    		highschoolObj.lines[2].title = "Honors/Awards:";
	    		let awardID = highschool + 'award' + j;
	    		if ($(highschool).find(awardID).val()) {
	    			if (j !== 1) {
	    				highschoolObj.lines[2].content += ', ';
	    			}
	    			highschoolObj.lines[2].content += $(awardID).val();
		    	}
	    	}
	    	schema.segments[schema.segments.length - 1].items.push(highschoolObj);
	    }


		// Build the Professional Experience part of schema
	    for(let i = 1; i < $("[data-clone='employer']").length; i++){
	    	if (i === 1) {
                const segmentProfExp = {};
	    		segmentProfExp.title = 'PROFESSIONAL EXPERIENCE';
                segmentProfExp.items = [];
                schema.segments.push(segmentProfExp);
	    	}
	    	let employer = '#employer' + i;
	    	let employerObj = {
                city      : $(employer).find('.city').val(),
                state     : $(employer).find('.state').val(),
                start_date: $(employer).find('.monthStart').val() + " " + $(employer).find('.yearStart').val(),
                end_date  : $(employer).find('.monthEnd').val() + " " + $(employer).find('.yearEnd').val(),
                lines: [
                    {
                        title  : $(employer).find('.name').val(),
                    },
                    {
                        italics: true,
                        content: $(employer).find('.position').val(),
                    },
                ]
	    	};

	   		// Job description
	    	for (let j = 0; j < $(employer).find('.content').length ; j++) {
	    		let contentID = employer + 'description' + j;
	    		if ($(employer).find(contentID).val()) {
	    			employerObj.lines.push({bullet: true, content: $(contentID).val()});
		    	}
	    	}
	    	schema.segments[schema.segments.length - 1].items.push(employerObj);
	    }


        // Build the Leadership and Extracurricular part of schema
        for(let i = 1; i < $("[data-clone='activity']").length; i++){
            if (i === 1) {
                const segmentExtracur = {};
                segmentExtracur.title = 'PROFESSIONAL EXPERIENCE';
                segmentExtracur.items = [];
                schema.segments.push(segmentExtracur);
            }
            let activity = '#activity' + i;
            let activityObj = {
                city      : $(activity).find('.city').val(),
                state     : $(activity).find('.state').val(),
                start_date: $(activity).find('.monthStart').val() + " " + $(activity).find('.yearStart').val(),
                end_date  : $(activity).find('.monthEnd').val() + " " + $(activity).find('.yearEnd').val(),
                lines: [
                    {
                        title  : $(activity).find('.name').val(),
                    },
                    {
                        italics: true,
                        content: $(activity).find('.position').val(),
                    },
                ]
            };

            // Activity description
            for (let j = 0; j < $(activity).find('.content').length ; j++) {
                let contentID = activity + 'description' + j;
                if ($(activity).find(contentID).val()) {
                    activityObj.lines.push({bullet: true, content: $(contentID).val()});
                }
            }
            schema.segments[schema.segments.length - 1].items.push(activityObj);
        }


        // Build the Skills part of schema
        for(let i = 1; i < $("[data-clone='skill']").length; i++){
            if (i === 1) {
                const segmentSkills = {};
                segmentSkills.title = 'SKILLS';
                segmentSkills.items = [{lines: []}];
                schema.segments.push(segmentSkills);
            }
            let skill = '#skill' + i;
            let skillObj = {
                title  : $(skill).find('.category').val() + ':',
                content: $(skill).find('.content').val(),
            };
            schema.segments[schema.segments.length - 1].items[0].lines.push(skillObj);
        }

		// // Cloned variables
		// var uniAwardStr = '';
		// for (let i = 1; i < $("[data-clone='award']").length + 1; i++){
		// 	if ($("#award" + i).find('.awardInput').val() !== ''){
		// 		if (i > 1){
		// 			uniAwardStr += ', ';
		// 		}
		// 		uniAwardStr += $("#award" + i).find('.awardInput').val();
		// 	}
		// }

		// var uniCourseStr = '';
		// for (let i = 1; i < $("[data-clone='course']").length + 1; i++){
		// 	if ($("#course" + i).find('.courseInput').val() !== ''){
		// 		if (i > 1){
		// 			uniCourseStr += ', ';
		// 		}
		// 		uniCourseStr += $("#course" + i).find('.courseInput').val();
		// 	}
		// }

		// var hsAwardStr = '';
		// for (let i = 1; i < $("[data-clone='hsaward']").length + 1; i++){
		// 	if ($("#hsaward" + i).find('.hsawardInput').val() !== ''){
		// 		if (i > 1){
		// 			hsAwardStr += ', ';
		// 		}
		// 		hsAwardStr += $("#hsaward" + i).find('.hsawardInput').val();
		// 	}
		// }

		// const monthDict = {
		// 	'01' : 'January',
		// 	'02' : 'Febuary',
		// 	'03' : 'March',
		// 	'04' : 'April',
		// 	'05' : 'May',
		// 	'06' : 'June',
		// 	'07' : 'July',
		// 	'08' : 'August',
		// 	'09' : 'September',
		// 	'10' : 'October',
		// 	'11' : 'November',
		// 	'12' : 'December',
		// };

		// const dateChanger = function(date){
		// 	console.log('date', date);
		// 	const dateYear = date.substring(0, 4) || '';
		// 	let dateMon    = date.substring(5,7) || '';
		// 	dateMon        = monthDict[dateMon] || '';
		// 	return (dateMon + ' ' + dateYear);
		// };

		// const degreeDate = dateChanger($('#degreeMonth').val()) || '';
		// const hsDate = dateChanger($('#highschoolMonth').val()) || '';

		// Form Info
		// let segmentContact = {
	 //        name   : $('#firstName').val() + " "  + $('#lastName').val(),
	 //        address: ($('#address').val() || '') + ", " + ($('#addressCity').val() || '') + ", " + ($('#addressState').val() || '') + " " + ($('#zipcode').val() || ''),
	 //        reach  : [
	 //            $('#email').val() || '',
	 //            $('#phone').val() || '',
	 //            ''
	 //        ]
		// };

		// let segmentEducation = {
	 //        title: 'EDUCATION',
	 //        items: [
	 //            {
	 //                city      : $('#universityCity').val(), 
	 //                state     : $('#universityState').val(),
	 //                start_date: degreeDate,
	 //                end_date  : '',
	 //                lines: [
	 //                    {
	 //                        bullet : false,
	 //                        title  : $('#university').val(),
	 //                        content: ''
	 //                    },
	 //                    {
	 //                        bullet : false,
	 //                        content: $('#degree').val() +  ' (Candidate) in Major'
	 //                    },
	 //                    {
	 //                        bullet : false,
	 //                        content: 'GPA ' + $('#universityGpa').val()
	 //                    },
	 //                    {
	 //                        bullet : false,
	 //                        title  : 'Honors/Awards: ',
	 //                        content: uniAwardStr
	 //                    },
	 //                    {
	 //                        bullet : false,
	 //                        title  : 'Relevant Coursework: ',
	 //                        content: uniCourseStr
	 //                    }
	 //                ]
	 //            },
	 //            {
	 //                city      : $('#highschoolCity').val(),
	 //                state     : $('#highschoolState').val(),
	 //                start_date: hsDate,
	 //                end_date  : "",
	 //                lines: [
	 //                    {
	 //                        title  : $('#highschool').val(),
	 //                        bullet : false,
	 //                        content: ''
	 //                    },
	 //                    {
	 //                        bullet : false,
	 //                        content: 'High School Diploma - ' + $('#highschoolGpa').val() + 'GPA'
	 //                    },
	 //                    {
	 //                        bullet : false,
	 //                        title  : 'Honors/Awards: ',
	 //                        content: hsAwardStr
	 //                    }
	 //                ]
	 //            }
	 //        ]
	 //    };
	    
		// let segmentProfExp = {
		// 	title:"",
		// 	items: [],
		// };

		// //create the employer part of schema
	 //    for(let i = 1; i < $('.employer').length; i++){
	 //    	if (i === 1) {
	 //    		segmentProfExp.title = 'PROFESSIONAL EXPERIENCE';
	 //    	}
	 //    	let employer = '#employer' + String(i);
	 //    	let start    = dateChanger($(employer).find('.employerMonthStart').val());
	 //    	let end      = dateChanger($(employer).find('.employerMonthEnd').val());

	 //    	let employee = {
  //               city      : $(employer).find('.employerCity').val(),
  //               state     : $(employer).find('.employerState').val(),
  //               start_date: start,
  //               end_date  : end,
  //               lines: [
  //                   {
  //                       title  : $(employer).find('.employerInput').val(),
  //                       content: '',
  //                   },
  //                   {
  //                       italics: true,
  //                       content: $(employer).find('.employerTitle').val()
  //                   }
  //               ]
	 //    	};

	 //   		//Get job desription items
	 //    	for (let j = 1; j < 6; j++) {
	 //    		if ($(desc).find("[name='jobcontent']").val()) {
		//     		let desc = '#cloneId' + String.fromCharCode(97 + i) + String(j);
		//     		employee.lines.push({bullet: true, content: $(desc).find("[name='jobcontent']").val()});
		//     	}

	 //    	}
	 //    	segmentProfExp.items.push(employee);
	 //    }

		// //create the Leadership and Extracurricular part of schema
	 //    for(let i = 1; i < $('.leadAndExtra').length; i++){
	 //    	let activity = '#activity' + String(i);
	 //    	let start    = dateChanger($(activity).find("[name='activityDateStart']").val());
	 //    	let end      = dateChanger($(activity).find("[name='activityDateEnd']").val());

	 //    	let activityObj = {
	 //    		title: 'LEADERSHIP AND EXTRACURRICULAR',
		// 		items: [
	 //                {
	 //                    city      : $(activity).find("[name='City']").val(),
	 //                    state     : $(activity).find("[name='State']").val(),
	 //                    start_date: start,
	 //                    end_date  : end,
	 //                    lines: [
	 //                        {
	 //                            title  : $(activity).find("[name='Organization']").val(),
	 //                            content: '',
	 //                            bullet : false
	 //                        },
	 //                        {
	 //                            bullet : false,
	 //                            italics: true,
	 //                            content: $(activity).find("[name='position']").val()
	 //                        }
	 //                    ]
	 //                }
	 //            ]
	 //    	};
	 //    	//Get activity desription items
	 //    	for (let j = 1; j < 6; j++) {
	 //    		let desc = '#clone2Id' + String.fromCharCode(97 + i);
	 //    		activityObj.items[0].lines.push({bullet: true, content: $(desc).find("[name='activityContent']").val()});
	 //    	}
	 //    	schema.segments.push(activityObj);
	 //    }


		// //create the Skills part of schema
	 //    for(let i = 1; i < $('.skillClass').length; i++){
	 //    	let skill = '#skill' + String(i);

	 //    	let skillObj = {
	 //    		title: 'SKILLS',
		// 		items: [
	 //                {
	 //                    lines: [
	 //                        {
	 //                            bullet : false,
	 //                            title  : $(skill).find("[name='skillCat']").val(),
	 //                            content: $(skill).find("[name='skillContent']").val()
	 //                        },
	 //                    ]
	 //                }
	 //            ]
	 //    	};
	 //    	schema.segments.push(skillObj);
	 //    }

	    console.log(JSON.stringify(schema,null,2));

	    $.ajax({
            url: '/pdfgen',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(schema),
            dataType: 'text',
            success: function(data) {window.open(data);},
            error: function (xhr, ajaxOptions, thrownError) {console.log(xhr.responseText, thrownError);}
        });
    });
});





























































