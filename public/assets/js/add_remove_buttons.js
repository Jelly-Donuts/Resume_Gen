const addClone = function(){

    let targetID   = '#' + $(this).attr('for'),
        targetAttr = $(targetID).attr('data-clone'),
        btnDelPair = '#' + $(this).attr('data-btn-del')

        // How many cloned input fields we currently have
        num        = $("[data-clone='" + targetAttr + "']").length - 1,
        newNum     = num + 1,
        newID = targetAttr + newNum,

        // Create the new element via clone(), and change it's id
        newElem = $(targetID).clone().attr('id', newID).fadeIn();

    newElem.removeClass("hidden");

    // Heading
    newElem.find('.' + targetAttr + '_heading').text(targetAttr + '#' + newNum);

    // Add/Remove Content buttons
    for (let i = 0; i < newElem.find('.btnAdd').length; i++) {

        let btnAddID = targetID + 'btnAdd' + i,
            newBtnAddID = newID + 'btnAdd' + i,
            btnDelID = '#' + newElem.find(btnAddID).attr('data-btn-del'),
            newBtnDelID = newID + 'btnDel' + i,
            inputID = '#' + newElem.find(btnAddID).attr('for'),
            inputType = newElem.find(inputID).attr('data-field'),
            newInputID = newID + inputType + 0;

        newElem.find(inputID).attr('data-clone', newID + inputType);
        newElem.find(inputID).attr('id', newInputID);

        newElem.find(btnDelID).attr('for', newInputID);
        newElem.find(btnDelID).attr('data-btn-add', newBtnAddID);
        newElem.find(btnDelID).attr('disabled', true);
        newElem.find(btnDelID).attr('id', newBtnDelID);

        newElem.find(btnAddID).attr('for', newInputID);
        newElem.find(btnAddID).attr('data-btn-del', newBtnDelID);
        newElem.find(btnAddID).attr('disabled', false);
        newElem.find(btnAddID).attr('id', newBtnAddID);

        // Bind addClone function to add button
        newElem.find(newBtnAddID).click(addClone());

        // Bind delClone function to delete button
        newElem.find(newBtnDelID).click(delClone());

    };

    // Insert the new element after the last cloned input field
    $('#' + targetAttr + num).after(newElem);
    $('input:first').focus();

    // Enable the delete button
    $(btnDelPair).attr('disabled', false);

    // Limit maximum amount of cloned fields
    if (newNum === 5){
        $(this).attr('disabled', true).prop('value', "Max Reached");
    }
}

const delClone = function() {

    // Confirmation dialog box
    if (confirm("Are you sure you wish to remove this field? This cannot be undone." + this)){

    let targetID   = '#' + $(this).attr('for'),
        targetAttr = $(targetID).attr('data-clone'),
        btnAddPair = '#' + $(this).attr('data-btn-add')

        // How many cloned input fields we currently have
        num        = $("[data-clone='" + targetAttr + "']").length - 1,
        $('#' + targetAttr + num).slideUp(function () {
            $(this).remove();
        });

        // If only one element remains, disable the "remove" button
        if (num === 1){
            $(this).attr('disabled', true);
        }

    // Enable the "add" button. IMPORTANT: only for forms using input type="button" (see older demo). DELETE if using button element.
    $(btnAddPair).attr('disabled', false).val("Add Employer [+]");
    }
    return false;
}

$(document).ready(function () {

    // // Add Buttons (Not for large sections right now)
    // $('.btnAdd').click(function () {
    //     let targetID   = $(this).attr('for'),
    //         targetAttr = $('#' + targetID).attr('data-clone'),

    //         // How many cloned fields exist
    //         num        = $("[data-clone='" + targetAttr + "']").length,
    //         newNum     = (num + 1),

    //         // Create the new element via clone(), and give it a new 'id'
    //         newElem    = $('#' + targetID).clone().attr('id', targetAttr + newNum).fadeIn('slow');

    //     // Clear input fields and insert the new element after the previous clone
    //     newElem.find('.' + targetAttr + 'Input').val('');
    //     $('#' + targetAttr + num).after(newElem);

    //     // Enable the "remove" button now that we have cloned an input field
    //     let btnDelID = $(this).attr('data-btn-del'); 
    //     $('#' + btnDelID).attr('disabled', false);

    //     // Limit the amount of input fields that can be added
    //     if (newNum === 5){
    //         $(this).attr('disabled', true).prop('value', "Max Reached");
    //     }
    // });

    // // Delete Buttons (Not for large sections right now)
    // $('.btnDel').click(function () {

    //     // Confirmation dialog box for deleting input field
    //     if (confirm("Are you sure you wish to remove this field? This cannot be undone.")){
    //         let targetID   = $(this).attr('for'),
    //             targetAttr = $('#' + targetID).attr('data-clone'),

    //             // How many cloned fields exist
    //             num        = $("[data-clone='" + targetAttr + "']").length;

    //         // SlideUp animation for the input field, then remove it
    //         $('#' + targetAttr + num).slideUp('slow', function () {
    //             $(this).remove();
    //         });

    //         // Disable the remove button if only one field left
    //         if (num -1 === 1){
    //             $(this).attr('disabled', true);
    //         }

    //         // Enable the add button.
    //         let btnAddID = $(this).attr('data-btn-add');
    //         $('#' + btnAddID).attr('disabled', false).prop('value', "Add Award");
    //     }
    // });

    // // Leadership and Extracurricular - Adding Button (**NEEDS UPDATE**)
    // $('#btnAdd_Activity').click(function () {

    //     // How many cloned fields exist
    //     let num     = $('.activityClone').length,
    //         newNum  = num + 1,
    //         chr     = String.fromCharCode(97 + newNum),

    //         // Create new element via clone(), and change it's id
    //         newElem = $('#activity0').clone().attr('id', 'activity' + newNum).fadeIn('slow');

    //     newElem.addClass("activityClone");
    //     newElem.removeClass("hidden");
    

    //     // Activity Heading
    //     newElem.find('.activity_heading').attr('id', 'ID' + newNum + '_heading').attr('name', 'ID' + newNum + '_heading').text('Activity #' + newNum);

    //     // Add/Remove Content buttons
    //     newElem.find('.clonedInput_5' ).attr('id'        , 'clone2Id'    + chr);
    //     newElem.find('.clonedInput_5' ).attr('data-clone', 'clone2Class' + chr);
    //     newElem.find('.btnClass'      ).attr('for'       , 'clone2Id'    + chr);
    //     newElem.find("[name='btnAdd']").attr('id'        , 'btn2AId'     + chr);
    //     newElem.find("[name='btnDel']").attr('id'        , 'btn2DId'     + chr);

    //     //  Insert the new element after the last cloned input field 
    //     $('#activity' + num).after(newElem);

    //     //  Enable the delete button
    //     $('#btnDel_Activity').attr('disabled', false);

    //     // Limit the max amount of fields
    //     if (newNum === 3){
    //         $('#btnAdd_Activity').attr('disabled', true).prop('value', "You've reached the limit");
    //     }

    //     // Add Activity Description Button
    //     $('#btn2AId' + chr).click(function () {
    //         let thisID   = this.getAttribute('id'),
    //             targetID = this.getAttribute('for'),
    //             targetCD = document.getElementById(targetID).getAttribute('data-clone'),

    //             // How many cloned input fields exist
    //             num      = $("[data-clone='" + targetCD + "']").length,
    //             newNum   = num + 1,

    //             // Create the new element via clone(), and change it's id
    //             newElem  = $('#' + targetID).clone().attr('id', targetID + newNum).fadeIn('slow');

    //     // Insert the new element after the last cloned input field
    //         newElem.find("[name='activityContent']").val('');
    //         if (num === 1){
    //             $('#' + targetID).after(newElem);
    //         } else {
    //             $('#' + targetID + num).after(newElem);
    //         }

    //     // Enable the remove button. This only shows once you have a cloned section.
    //         $('#btn2DId' + chr).attr('disabled', false);

    //         // Limit the max amount of fields
    //         if (newNum === 5){
    //             $('#' + thisID).attr('disabled', true).prop('value', "Max Reached"); // value here updates the text in the 'add' button when the limit is reached
    //         }
    //     });

    //     // Activity description delete button
    //     $('#btn2DId' + chr).click(function () {

    //         // Confirmation dialog box
    //         if (confirm("Are you sure you wish to remove this field? This cannot be undone.")){
    //             let thisID   = this.getAttribute('id'),
    //                 targetID = this.getAttribute('for'),
    //                 targetCD = document.getElementById(targetID).getAttribute('data-clone'),
    //                 num      = $("[data-clone='" + targetCD + "']").length; // Checks to see how many "duplicatable" input fields we currently have

    //             $('#' + targetID + num).slideUp('slow', function(){
    //                 $(this).remove();
    //                 // If only one element remains, disable the "remove" button
    //                 if (num -1 === 1){
    //                     $('#' + thisID).attr('disabled', true);
    //                     // Enable the add button
    //                     $('#btnAId' + chr).attr('disabled', false).prop('value', "Add Content");
    //                 }
    //             });
    //         }
    //         return false;
    //     });

    //     // Enable the add button
    //     $('#btn2AId' + chr).attr('disabled', false);

    //     // Disable the remove button
    //     $('#btn2DId' + chr).attr('disabled', true);
    // });

    // // Leadership and Extracurricular - Delete Button (**NEEDS UPDATE**)
    // $('#btnDel_Activity').click(function () {

    // // Confirmation dialog box.
    //     if (confirm("Are you sure you wish to remove this field? This cannot be undone.")){

    //         // How many cloned input fields we currently have
    //         let num     = $('.activityClone').length;
    //         $('#activity' + num).slideUp('slow', function () {
    //             $(this).remove();

    //             // If only one element remains, disable the "remove" button
    //             if (num -1 === 0){
    //                 $('#btnDel_Activity').attr('disabled', true);
    //             }

    //             // Enable the "add" button.
    //             $('#btnAdd_Activity').attr('disabled', false).prop('value', "Add Activity [+]");
    //         });
    //     }
    //     return false;
    // });

    // // Enable the "add" button
    // $('#btnAdd_Activity').attr('disabled', false);

    // // Disable the "remove" button
    // $('#btnDel_Activity').attr('disabled', true);


    // // Skills - Skill Category add button (**NEEDS UPDATE*)
    // $('#btnAdd_Skill').click(function () {

    //     // How many cloned input fields we currently have
    //     let num     = $('.skillClone').length,
    //         newNum  = num + 1,

    //         // Create the new element via clone(), and change it's id
    //         newElem = $('#skill0').clone().attr('id', 'skill' + newNum).fadeIn('slow');

    //     newElem.addClass("skillClone");
    //     newElem.removeClass("hidden");

    //     //  Insert the new element after the last "duplicatable" input field
    //     $('#skill' + num).after(newElem);

    //     $('#btnDel_Skill').attr('disabled', false);

    //     // Limit the max amount of fields
    //     if (newNum === 3){
    //         $('#btnAdd_Skill').attr('disabled', true).prop('value', "You've reached the limit");
    //     }
    // });

    // // Skills - Skill Category delete button (**NEEDS UPDATE*)
    // $('#btnDel_Skill').click(function () {

    // // Confirmation dialog box
    //     if (confirm("Are you sure you wish to remove this field? This cannot be undone.")){

    //         // How many "duplicatable" input fields we currently have
    //         let num = $('.skillClone').length;
    //         $('#skill' + num).slideUp('slow', function () {
    //             $(this).remove();

    //             // If only one element remains, disable the "remove" button
    //             if (num -1 === 0){
    //                 $('#btnDel_Skill').attr('disabled', true);
    //             }

    //             // Enable the "add" button
    //             $('#btnAdd_Skill').attr('disabled', false).prop('value', "Add Skill [+]");
    //         });
    //     }
    //     return false;
    // });
    // // Enable the "add" button
    // $('#btnAdd_Skill').attr('disabled', false);

    // // Disable the "remove" button
    // $('#btnDel_Skill').attr('disabled', true);







    // // Professional Experience - Employer add button (**NEEDS UPDATE**)
    // $('#btnAdd_Employer').click(function () {

    //     // How many cloned input fields we currently have
    //     let num     = $('.employerClone').length,
    //         newNum  = num + 1,
    //         chr     = String.fromCharCode(97 + newNum),

    //         // Create the new element via clone(), and change it's id
    //         newElem = $('#employer0').clone().attr('id', 'employer' + newNum).fadeIn('slow');
    //     newElem.addClass("employerClone");
    //     newElem.removeClass("hidden");

    //     // Employer Heading
    //     newElem.find('.employer_heading').attr('id', 'ID' + newNum + '_heading').attr('name', 'ID' + newNum + '_heading').text('Employer #' + newNum);

    //     // Add/Remove Content buttons
    //     newElem.find('.clonedInput_4' ).attr('id'        , 'cloneId'    + chr + 1);
    //     newElem.find('.clonedInput_4' ).attr('data-clone', 'cloneId'    + chr);
    //     newElem.find('.btnClass'      ).attr('for'       , 'cloneId'    + chr + 1);
    //     newElem.find("[name='btnAdd']").attr('id'        , 'btnAId'     + chr);
    //     newElem.find("[name='btnDel']").attr('id'        , 'btnDId'     + chr);


    //     // Insert the new element after the last cloned input field
    //     $('#employer' + num).after(newElem);
    //     $('#ID' + newNum + '_heading').focus();
    //     $('#btnDel_Employer').attr('disabled', false);
    //     if (newNum === 3){
    //         $('#btnAdd_Employer').attr('disabled', true).prop('value', "You've reached the limit");
    //     }

    //     // Job description add button
    //     $('#btnAId' + chr).click(function () {
    //         let thisID   = this.getAttribute('id'),
    //             targetID = this.getAttribute('for'),
    //             targetCD = document.getElementById(targetID).getAttribute('data-clone'),

    //             // Checks to see how many cloned input fields we currently have
    //             num      = $("[data-clone='" + targetCD + "']").length,
    //             newNum   = num + 1;

    //             // Create the new element via clone(), and change it's id
    //             console.log('#' + targetCD + num);
    //         let newElem  = $('#' + targetCD + num).clone().attr('id', targetCD + newNum).fadeIn('slow');

    //         // Reset input values
    //         newElem.find("[name='jobcontent']").val('');

    //         // Insert the new element after the last "duplicatable" input field
    //         if (num === 1){
    //             console.log('in here');
    //             $('#' + targetCD + num).after(newElem);
    //         } else {
    //             console.log('no, in here');
    //             $('#' + targetCD + num).after(newElem);
    //         }

    //         // Enable the "remove" button. This only shows once you have a cloned section.
    //         $('#btnDId' + chr).attr('disabled', false);

    //         // Limit the max amount of fields
    //         if (newNum === 5){
    //             $('#' + thisID).attr('disabled', true).prop('value', "You've reached the limit"); // value here updates the text in the 'add' button when the limit is reached
    //         }
    //     });


    //     // Job description delete button (**NEEDS UPDATE**)
    //     $('#btnDId' + chr).click(function () {
    //     // Confirmation dialog box
    //         if (confirm("Are you sure you wish to remove this field? This cannot be undone.")){
    //             let thisID   = this.getAttribute('id'),
    //                 targetID = this.getAttribute('for'),
    //                 targetCD = document.getElementById(targetID).getAttribute('data-clone'),

    //                 // How many "duplicatable" input fields we currently have
    //                 num      = $("[data-clone='" + targetCD + "']").length;

    //             $('#' + targetCD + num).slideUp('slow', function () {
    //                 $(this).remove();

    //                 // If only one element remains, disable the "remove" button
    //                 if (num -1 === 1){
    //                     $('#' + thisID).attr('disabled', true);
    //                 }

    //                 // Enable the "add" button
    //                 $('#btnAId' + chr).attr('disabled', false).prop('value', "Add Content");

    //             });
    //         }
    //         return false;
    //     });

    //     // Enable the "add" button
    //     $('#btnAId' + chr).attr('disabled', false);

    //     // Disable the "remove" button
    //     $('#btnDId' + chr).attr('disabled', true);

    // });

    // // Professional Experience - Employer delete button (**NEEDS UPDATE**)
    // $('#btnDel_Employer').click(function () {

    // // Confirmation dialog box
    //     if (confirm("Are you sure you wish to remove this field? This cannot be undone.")){

    //         // How many "duplicatable" input fields we currently have
    //         let num = $('.employerClone').length;
    //         $('#employer' + num).slideUp('slow', function () {
    //             $(this).remove();

    //             // If only one element remains, disable the "remove" button
    //             if (num -1 === 0){
    //                 $('#btnDel_Employer').attr('disabled', true);
    //             }

    //             // Enable the "add" button. IMPORTANT: only for forms using input type="button" (see older demo). DELETE if using button element.
    //             $('#btnAdd_Employer').attr('disabled', false).prop('value', "Add Employer [+]");
    //         });
    //     }
    //     return false;
    // });

    // // Enable the "add" button
    // $('#btnAdd_Employer').attr('disabled', false);
    
    // // Disable the "remove" button
    // $('#btnDel_Employer').attr('disabled', true);



    // Professional Experience - Employer add button (**NEEDS UPDATE**)
    $('.btnAdd_Segment').click(addClone());

    // Professional Experience - Employer delete button (**NEEDS UPDATE**)
    $('.btnDel_Segment').click(delClone());

    // Enable the "add" button
    $('.btnAdd_Segment').attr('disabled', false);
    
    // Disable the "remove" button
    $('.btnDel_Segment').attr('disabled', true);
});










































