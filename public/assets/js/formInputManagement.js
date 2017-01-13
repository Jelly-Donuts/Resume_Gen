$(document).ready(function () {    
    $(".phone").blur(function (){

        let x = $(this).val().replace(/[{()}]/g, "");
        x = x.replace(/[\[\]']+/g, '');
        x = x.replace(/-| /g, '');

        if (x.length === 10){
            $(this).val("(" + x.substring(0,3) + ") " + x.substring(3,6) + "-" + x.substring(6,x.length));
        }
    });
});

$('.btnAdd').click(function(){
	setTimeout(function(){
		$('.monthEnd').change(function (){
			if ($(this).val() === 'Present'){
				$(this).parent().parent().parent().find('.yearEnd').attr('disabled', true);
			} else {
				$(this).parent().parent().parent().find('.yearEnd').attr('disabled', false);
			}
		});
	}, 500); 
});



