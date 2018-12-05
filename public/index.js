function insertNewCard(text, answers) {
    var cardContext = {
        text: text,
        answers: answers
    };

    var cardHTML = Handlebars.templates.card(cardContext);

    var cardContainer = document.getElementById("cards-container");
    cardContainer.insertAdjacentHTML('beforeend', cardHTML);
};

$(document).on('click', '.btn-add', function() {
    var controlForm = document.getElementById("add-card-form"),
        currentEntry = $(this).parents('.entry:first'),
        newEntry = $(currentEntry.clone()).appendTo(controlForm);

    newEntry.find('input').val('');
    controlForm.find('.entry:not(:last) .btn-add')
        .removeClass('btn-add').addClass('btn-remove')
        .removeClass('btn-success').addClass('btn-danger')
        .html('<span class="glyphicon glyphicon-minus"></span>');
}).on('click', '.btn-remove', function(e) {
    $(this).parents('.entry:first').remove();

    return false;
});

var allPosts = [];

function handleModalAcceptClick() {

    var text = document.getElementById('post-prompt-input').value.trim();
    var answers = document.getElementById('post-answer-input').value.trim();

    if (!text || !answers) {
        alert("You must fill in all of the fields!");
    } else {

        allPosts.push({
            text: text,
            answers: answers
        });

        insertNewCard(text, answers);

    }
}


var modalAcceptButton = document.getElementById('modal_accept_btn');
console.log(modalAcceptButton);
if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', handleModalAcceptClick);
}
