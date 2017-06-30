// Remove a field/section that has been added
function delClone(item) {

    /* Use clicked button's attributes to identify removal target and 
       corresponding add button */
    let targetID   = '#' + $(item).attr('for'),
        targetAttr = $(targetID).attr('data-clone'),
        btnAddPair = '#' + $(item).attr('data-btn-add'),

        // How many cloned input fields we currently have
        num        = $("[data-clone='" + targetAttr + "']").length - 1;

        // Remove the field/section (after slideUp animation is complete)
        $('#' + targetAttr + num).slideUp(function () {
            $(this).remove();
        });

        // If only one element remains, disable the "remove" button
        if (num === 1) {
            $(item).attr('disabled', true);
        }

    // Enable the add button and change it's text to original value
    let text = $(btnAddPair).attr('data-field');
    $(btnAddPair).attr('disabled', false).val(text);
    
    // Scroll section title to top when deleting first item.
    if ( num === 1 ){
        let scrollTo = $( '#' + targetAttr ).offset().top - 50,
            delta    = Math.abs( scrollTo - $(document).scrollTop() );

        $('html,body').animate({ scrollTop: scrollTo }, delta * 1.75);
    }

    return false;
}

// Clone a hidden element to add a field/section
function addClone(item) {

    /* Use the clicked button's attributes to identify the object being cloned 
       and the corresponding delete button */
    let targetID   = '#' + $(item).attr('for'),
        targetAttr = $(targetID).attr('data-clone'),
        btnDelPair = '#' + $(item).attr('data-btn-del'),

        // How many cloned input fields we currently have
        num        = $("[data-clone='" + targetAttr + "']").length - 1,
        newNum     = num + 1,
        newID      = targetAttr + newNum,

        // Create the new element via clone(), and change it's id
        newElem = $(targetID).clone().attr('id', newID).fadeIn();

    newElem.removeClass("hidden");

    // Change the heading text
    newElem.find('.' + targetAttr + '_heading').text(targetAttr + ' #' + newNum);

    // Reset value of first input (for buttons that clone a non-hidden field)
    newElem.find('input:first').val('');
    newElem.find('.required').each(function(){
        $(this).prop('required', true);
    })

    // Insert the new element after the last cloned input field
    $('#' + targetAttr + num).after(newElem);
    newElem.find('input:first').focus();

    // Activate any add and remove buttons cloned
    for (let i = 0; i < newElem.find('.btnAdd').length; i++) {

        /* From the attributes of the add button, identify the clone target and
           the corresponding delete button */
        let btnAddID    = targetID + 'btnAdd' + i,
            newBtnAddID = newID + 'btnAdd' + i,
            btnDelID    = '#' + newElem.find(btnAddID).attr('data-btn-del'),
            newBtnDelID = newID + 'btnDel' + i,
            inputID     = '#' + newElem.find(btnAddID).attr('for'),
            inputType   = newElem.find(inputID).attr('data-field'),
            newInputID  = newID + inputType + 0;

        // Change the attributes of the clone target
        newElem.find(inputID).attr('data-clone', newID + inputType);
        newElem.find(inputID).attr('id', newInputID);

        // Change the attributes of the delete button
        newElem.find(btnDelID).attr('for'         , newInputID);
        newElem.find(btnDelID).attr('data-btn-add', newBtnAddID);
        newElem.find(btnDelID).attr('disabled'    , true);
        newElem.find(btnDelID).attr('id'          , newBtnDelID);

        // Change the attributes of the add button
        newElem.find(btnAddID).attr('for'         , newInputID);
        newElem.find(btnAddID).attr('data-btn-del', newBtnDelID);
        newElem.find(btnAddID).attr('disabled'    , false);
        newElem.find(btnAddID).attr('id'          , newBtnAddID);

        // Bind addClone function to add button
        $('#' + newBtnAddID).on('click', function(){addClone(this);});

        // Bind delClone function to delete button
        $('#' + newBtnDelID).on('click', function(){delClone(this);});

    }

    // Enable the delete button after field/section has been added.
    $(btnDelPair).attr('disabled', false);

    // Limit maximum amount of added fields.
    if (newNum === 5) {
        $(item).attr('disabled', true).val("Max Reached");
    }

    // Scroll section title to top when adding first item.
    if ( num === 0 ){
        let scrollTo = $( '#' + targetAttr ).offset().top - 50,
            delta    = Math.abs( scrollTo - $(document).scrollTop() );

        $('html,body').animate({ scrollTop: scrollTo }, delta * 1.75);
    }
}

$(document).ready(function () {

    // Bind addClone() to all add buttons
    $('.btnAdd').click(function() {addClone(this);});

    // Bind delClone() to all delete buttons
    $('.btnDel').click(function() {delClone(this);});

    // Enable add buttons
    $('.btnAdd').attr('disabled', false);
    
    // Disable delete buttons
    $('.btnDel').attr('disabled', true);

    $('#btnSecret').click(function() {addClone(document.getElementById('activity0btnAdd0'));});
});