$(document).ready(function () {
    $.get('/pdfcount', function(data){
        console.log(data);
        console.log(document.getElementById('pdfcount').innerHTML);
        $("#pdfcount").text(data);
    });
    $('.count').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
});



