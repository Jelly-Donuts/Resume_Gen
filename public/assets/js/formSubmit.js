$(function (){
	$("#btnSubmit").click(function( ) {

        const schema = {
            contact : "",
            segments: []
        };

		let segmentContact = {
	        name   : $('#contact').find('.firstname').val() + " "  + $('#contact').find('.lastname').val(),
	        address: ($('#contact').find('.address').val() || '') + ", " + ($('#contact').find('.city').val() || '') + ", " + ($('#contact').find('.state').val() || '') + " " + ($('#contact').find('.zipcode').val() || ''),
	        reach  : [
	            $('#contact').find('.email').val() || '',
	            $('#contact').find('.phone').val() || ''
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
	    	let university = '#university' + i;
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
	    		if ($(university).find(awardID).find('.award').val()) {
	    			if (j !== 1) {
	    				universityObj.lines[3].content += ', ';
	    			}
	    			universityObj.lines[3].content += $(awardID).find('.award').val();
		    	}
	    	}
	    	for (let k = 1; k < $(university).find('.course').length; k++) {
	    		universityObj.lines[4].title = "Relevant Coursework:";
	    		let courseID = university + 'course' + k;
	    		if ($(university).find(courseID).find('.course').val()) {
	    			if (k !== 1) {
	    				universityObj.lines[4].content += ', ';
	    			}
	    			universityObj.lines[4].content += $(courseID).find('.course').val();
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
	    		if ($(highschool).find(awardID).find('.award').val()) {
	    			if (j !== 1) {
	    				highschoolObj.lines[2].content += ', ';
	    			}
	    			highschoolObj.lines[2].content += $(awardID).find('.award').val();
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
	    		if ($(employer).find(contentID).find('.content').val()) {
	    			employerObj.lines.push({bullet: true, content: $(contentID).find('.content').val()});
		    	}
	    	}
	    	schema.segments[schema.segments.length - 1].items.push(employerObj);
	    }


        // Build the Leadership and Extracurricular part of schema
        for(let i = 1; i < $("[data-clone='activity']").length; i++){
            if (i === 1) {
                const segmentExtracur = {};
                segmentExtracur.title = 'LEADERSHIP AND EXTRACURRICULAR';
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
                if ($(activity).find(contentID).find('.content').val()) {
                    activityObj.lines.push({bullet: true, content: $(contentID).find('.content').val()});
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

	    console.log(JSON.stringify(schema,null,2));

	    $.ajax({
            url: '/pdfgen',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(schema),
            dataType: 'text',
            success: function(data) {console.log("HERE: !!!" + data); window.open(data);},
            error: function (xhr, ajaxOptions, thrownError) {console.log('ERROR', xhr.responseText, thrownError);}
        });
    });
});
























































































