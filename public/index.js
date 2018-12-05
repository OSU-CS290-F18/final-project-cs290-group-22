function insertNewCard(text, answers) {
	var cardContext = {
		text: text,
		answers: [
			{
				name: answers,
				count: 0
            }
        ]
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

function handleModalAcceptClick() {
	var text = document.getElementById('post-prompt-input').value.trim();
	var answer = document.getElementById('post-answer-input').value.trim();

	if (!text || !answer) {
		alert("You must fill in all of the fields!");
	} else {
		var postRequest = new XMLHttpRequest();
		var requestURL = '/newpost';
		postRequest.open('POST', requestURL);
		var requestBody = JSON.stringify({
			text: text,
			answers: [
				{
					name: answer,
					count: 0
                }
            ]
		});

		postRequest.addEventListener('load', function(event) {
			if (event.target.status === 200) {
				insertNewCard(text, answer);
			} else {
				alert("Error storing photo: " + event.target.response);
			}
		});

		postRequest.setRequestHeader('Content-Type', 'application/json');
		postRequest.send(requestBody);
        $('#post-opinion-modal').modal('hide');
        clearModalInputs();
	}
}

function clearModalInputs() {
	var modalInputElements = document.querySelectorAll('#post-opinion-modal input')
	for (var i = 0; i < modalInputElements.length; i++) {
		modalInputElements[i].value = '';
	}
}

var modalAcceptButton = document.getElementById('modal_accept_btn');
if (modalAcceptButton) {
	modalAcceptButton.addEventListener('click', handleModalAcceptClick);
}
