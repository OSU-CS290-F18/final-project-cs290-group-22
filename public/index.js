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

var num_fields = 2;
function addField(){
	if (num_fields<4){
		num_fields++;
		var opinionFields = document.getElementById('opinion-input-fields');
		var addOptionButtonContainer = document.getElementById("add-option-btn-container");
		var newInput = document.createElement('input');

		newInput.type = 'text';
		newInput.id = 'post-answer-input-' + num_fields;
		newInput.classList.add('form-control');
		newInput.placeholder = 'Option ' + num_fields;
		newInput.setAttribute('aria-label', 'Answer ' + num_fields);
		newInput.setAttribute('aria-describedby', 'basic_addon' + num_fields);

		opinionFields.insertBefore(newInput, addOptionButtonContainer);
	} else {
		alert("you must have 2-4 answers per opinion!");
	}

	console.log(num_fields);
}

function removeField(){
	if (num_fields>2){
		var opinionFields = document.getElementById('opinion-input-fields');
		var inputToRemove = document.getElementById('post-answer-input-' +  num_fields);

		inputToRemove.remove();
		num_fields--;
	} else {
		alert("you must have 2-4 answers per opinion!");
	}
	console.log(num_fields);
}


var addOptionButton = document.getElementById('add-option-btn');
if (addOptionButton) {
	addOptionButton.addEventListener('click', addField);
}

var removeOptionButton = document.getElementById('remove-option-btn');
if (removeOptionButton) {
	removeOptionButton.addEventListener('click', removeField);
}




function handleModalAcceptClick() {
	var text = document.getElementById('post-prompt-input').value.trim();
	var answer1 = document.getElementById('post-answer-input-1').value.trim();
	var answer2 = document.getElementById('post-answer-input-2').value.trim();

	if (!text || !answer1 || !answer2) {
		alert("You must fill in all of the fields!");
	} else {
		var postRequest = new XMLHttpRequest();
		var requestURL = '/newpost';
		postRequest.open('POST', requestURL);
		var requestBody = JSON.stringify({
			text: text,
			answers: [
				{
					name: answer1,
					count: 0
                },
				{
					name: answer2,
					count: 0
                }
            ]
		});

		postRequest.addEventListener('load', function(event) {
			if (event.target.status === 200) {
				location.reload();
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
