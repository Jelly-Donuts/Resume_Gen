// Clone a hidden element to add a field/section
function addClone(item){

    /* Use the clicked button's attributes to identify the object being cloned 
       and the corresponding delete button */
    let targetID   = '#' + $(item).attr('for');
    let targetAttr = $(targetID).attr('data-clone');
    let btnDelPair = '#' + $(item).attr('data-btn-del');

        // How many cloned input fields we currently have
    let num        = $("[data-clone='" + targetAttr + "']").length - 1;
    let newNum     = num + 1;
    let newID = targetAttr + newNum;

        // Create the new element via clone(), and change it's id
    let newElem = $(targetID).clone().attr('id', newID).fadeIn();

    newElem.removeClass("hidden");

    // Heading
    newElem.find('.' + targetAttr + '_heading').text(targetAttr + '#' + newNum);

    // Insert the new element after the last cloned input field
    $('#' + targetAttr + num).after(newElem);
    newElem.find('input:first').focus();

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
        $('#' + newBtnAddID).on("click", function(){addClone(this)});

        // Bind delClone function to delete button
        $('#' + newBtnDelID).on("click", function(){delClone(this)});

    };

    // Enable the delete button
    $(btnDelPair).attr('disabled', false);

    // Limit maximum amount of cloned fields
    if (newNum === 5){
        $(item).attr('disabled', true).val("Max Reached");
    }
}

function delClone(item) {

    // Confirmation dialog box
    if (confirm("Are you sure you wish to remove this field? This cannot be undone.")){

    let targetID   = '#' + $(item).attr('for'),
        targetAttr = $(targetID).attr('data-clone'),
        btnAddPair = '#' + $(item).attr('data-btn-add')

        // How many cloned input fields we currently have
        num        = $("[data-clone='" + targetAttr + "']").length - 1,
        $('#' + targetAttr + num).slideUp(function () {
            $(this).remove();
        });

        // If only one element remains, disable the "remove" button
        if (num === 1){
            $(item).attr('disabled', true);
        }

    // Enable the "add" button.
    let text = $(btnAddPair).attr('data-field');
    $(btnAddPair).attr('disabled', false).val(text);
    }
    return false;
}

$(document).ready(function () {

    // Bind addClone() to all add buttons
    $('.btnAdd').click(function() {addClone(this)});

    // Bind delClone() to all delete buttons
    $('.btnDel').click(function() {delClone(this)});

    // Enable add buttons
    $('.btnAdd').attr('disabled', false);
    
    // Disable delete buttons
    $('.btnDel').attr('disabled', true);
});










































