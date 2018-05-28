$(document).ready(function () {    
    $('#file').change(function (file) {

        //Make sure it's a PDF

        //Call API
        var fd = new FormData();
        fd.append('file', file.target.files[0]);

        $.ajax({
            url: '/pdfread',
            type: 'POST',
            contentType: false,
            processData: false,
            data: fd,
            success: function(data) {
                console.log("DATA:");
                console.log(data);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr);
                console.log(ajaxOptions);
                console.log(thrownError);
                alert('ERROR', xhr.responseText, thrownError);
            }
        });
    });
});