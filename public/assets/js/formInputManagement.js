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





