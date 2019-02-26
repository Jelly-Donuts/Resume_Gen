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
            let formItem = "[data-clone='university']";
            var index = 1;
            for (let item of segment.items) {
                // add new place to enter info
                addClone('university');
                const university = '#university' + index++;
                
                // set the city, state
                $(university).find('.city').val(item.city);
                $(university).find('.state').val(item.state);

                // TODO: set start / end dates
                //
                //

                // set university name
                $(university).find('.name').val(item.lines[0].title);

                
            }
        }
    }
}