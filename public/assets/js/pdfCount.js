$.get('/backend/count.txt', function(data){
    document.getElementById('pdfcount').innerHTML = data;
    countAnimation();
});

var countAnimation = function(){
    $('.count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
}