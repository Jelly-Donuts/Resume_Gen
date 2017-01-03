$.get('/backend/count.txt', function(data){
    document.getElementById('pdfcount').innerHTML = data;
    this.countAnimation(data);
});

var countAnimation = function(){
    $('.count').each(function () {
        console.log($(this).text());
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