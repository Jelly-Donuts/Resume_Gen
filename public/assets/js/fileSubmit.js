$(document).ready(function () {    
    $('#file').change(function (file) {
        var fd = new FormData();
        fd.append('file', file.target.files[0]);

        $.ajax({
            url: '/pdfread',
            type: 'POST',
            contentType: false,
            processData: false,
            data: fd,
            success: function(data) {
                fillForm(data);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr);
                console.log(ajaxOptions);
                console.log(thrownError);
                console.log('ERROR', xhr.responseText, thrownError);
            }
        });
    });
});

function fillForm(data) {
    $('#contact').find('.firstname').val(data.contact.name.split(' ')[0]);
    $('#contact').find('.lastname').val(data.contact.name.split(' ')[1]);

    $('#contact').find('.address').val(data.contact.address.split(', ')[0]);
    $('#contact').find('.city').val(data.contact.address.split(', ')[1]);
    $('#contact').find('.state').val(data.contact.address.split(', ')[2].split(' ')[0]);
    $('#contact').find('.zipcode').val(data.contact.address.split(',')[2].split(' ')[2]);

    $('#contact').find('.email').val(data.contact.reach[0]);
    $('#contact').find('.phone').val(data.contact.reach[1]);
    $('#contact').find('.website').val(data.contact.reach[2]);

    for (let segment of data.segments) {
        console.log(segment);
        if (segment.title == 'EDUCATION') {
            fillEducation(segment);
        } else if (segment.title == 'PROFESSIONAL EXPERIENCE') {
            fillProfessional(segment);
        }
    }
}

function fillEducation(segment) {
    let high_index = 1;
    let uni_index = 1;

    for (let item of segment.items) {
        let tag = '';
        let awards = null;

        if (item.lines[1].content.split('Diploma').length > 1) {
            // High School
            $('#btnAdd_Highschool').click();
            tag = '#highschool' + high_index++;

            const gpa = item.lines[1].content.split('GPA ');
            awards = item.lines[2].content.split(', ')

            $(tag).find('.gpa').val(gpa.length > 0 ? gpa[1] : '');
        } else {
            // University
            $('#btnAdd_University').click();
            tag = '#university' + uni_index++;

            const degree = item.lines[1].content.split(' in ');
            awards = item.lines[3].content.split(', ');
            
            $(tag).find('.degree').val(degree.length == 2 ? degree[0] : '');
            $(tag).find('.major').val(degree.length == 2 ? degree[1] : '');
            $(tag).find('.gpa').val(item.lines[2].content);

            const courseAddTag = tag + "btnAdd1";
            const courses = item.lines[4].content.split(', ')
            for (let i = 0; i < courses.length; i++) {
                $(courseAddTag).click();
                $($(tag).find('.course')[i+1]).val(courses[i]);
            }
        }

        if (tag) {
            const dates = item.start_date.split(' ');

            $(tag).find('.name').val(item.lines[0].title);
            $(tag).find('.city').val(item.city);
            $(tag).find('.state').val(item.state);
            $(tag).find('.month').val(dates.length == 2 ? dates[0] : '');
            $(tag).find('.year').val(dates.length == 2 ? dates[1] : '');

            const awardAddTag = tag + "btnAdd0";
            for (let i = 0; i < awards.length; i++) {
                $(awardAddTag).click();
                $($(tag).find('.award')[i+1]).val(awards[i]);
            }
        }
    }
}

function fillProfessional(segment) {
    let index = 1;

    for (let item of segment.items) {
        $('#btnAdd_Employer').click();
        const tag = '#employer' + index++;

        const start_dates = item.start_date.split(' ');
        const end_dates = item.end_date.split(' ');

        $(tag).find('.name').val(item.lines[0].title);
        $(tag).find('.city').val(item.city);
        $(tag).find('.state').val(item.state);
        $(tag).find('.position').val(item.lines[1].content);
        $(tag).find('.monthStart').val(start_dates.length == 2 ? start_dates[0] : '');
        $(tag).find('.yearStart').val(start_dates.length == 2 ? start_dates[1] : '');
        $(tag).find('.monthEnd').val(end_dates.length == 2 ? end_dates[0] : '');
        $(tag).find('.yearEnd').val(end_dates.length == 2 ? end_dates[1] : '');

        const descAddTag = tag + 'btnAdd0';
        for (let i = 2; i < item.lines.length; i++) {
            if (i > 2) {
                $(descAddTag).click();
            }

            $($(tag).find('.content')[i-2]).val(item.lines[i].content);
        }
    }
}