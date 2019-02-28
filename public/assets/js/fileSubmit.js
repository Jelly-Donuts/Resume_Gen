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
            let high_index = 1;
            let uni_index = 1;

            for (let item of segment.items) {
                let tag = '';

                if (item.lines[1].content.split('School Diploma').length > 1) {
                    // High School
                    addClone($('#btnAdd_Highschool'));
                    tag = '#highscool' + high_index++;

                    const gpa = item.lines[1].split('GPA ');

                    $(tag).find('.gpa').val(gpa.length > 0 ? gpa[1] : '');
                } else {
                    // University
                    addClone($('#btnAdd_University'));
                    tag = '#university' + uni_index++;

                    const degree = item.lines[1].content.split(' in ');
                    
                    $(tag).find('.degree').val(degree.length == 2 ? degree[0] : '');
                    $(tag).find('.major').val(degree.length == 2 ? degree[1] : '');
                    $(tag).find('.gpa').val(item.lines[2].content);
                }

                if (tag) {
                    const dates = item.start_date.split(' ');

                    $(tag).find('.name').val(item.lines[0].title);
                    $(tag).find('.city').val(item.city);
                    $(tag).find('.state').val(item.state);
                    $(tag).find('.month').val(dates.length == 2 ? dates[0] : '');
                    $(tag).find('.year').val(dates.length == 2 ? dates[1] : '');
                }
            }
        }
    }
}