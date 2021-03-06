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
	var errorText = document.getElementById('post-error-text');

	if (num_fields<4){
		errorText.style.visibility = 'hidden';

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
		errorText.style.visibility = 'visible';
	}

	console.log(num_fields);
}

function removeField(){
	var errorText = document.getElementById('post-error-text');

	if (num_fields>2){
		errorText.style.visibility = 'hidden';

		var opinionFields = document.getElementById('opinion-input-fields');
		var inputToRemove = document.getElementById('post-answer-input-' +  num_fields);
		inputToRemove.remove();
		num_fields--;
	} else {
		errorText.style.visibility = 'visible';
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
	while(num_fields<2){
		removeField();
		num_fields--;
	}
	var text = document.getElementById('post-prompt-input').value.trim();
	var answer1 = document.getElementById('post-answer-input-1').value.trim();
	var answer2 = document.getElementById('post-answer-input-2').value.trim();
	var answer3 = document.getElementById('post-answer-input-3');
	var answer4 = document.getElementById('post-answer-input-4');


	if (!text || !answer1 || !answer2) {
		alert("You must fill in all of the fields!");
	} else {
		var postRequest = new XMLHttpRequest();
		var requestURL = '/newpost';
		postRequest.open('POST', requestURL);
		var requestBody = {
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
		};

		if(answer3){
			requestBody.answers.push({
				name: answer3.value.trim(),
				count:0
			});
		}

		if (answer4){
			requestBody.answers.push({
				name: answer4.value.trim(),
				count:0
			});
		}
		console.log(requestBody);

		requestBody = JSON.stringify(requestBody);

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

var modalAcceptButton = document.getElementById('modal-accept-btn');
if (modalAcceptButton) {
	modalAcceptButton.addEventListener('click', handleModalAcceptClick);
}

var searchButton = document.getElementById('search-button');
if (searchButton) {
	searchButton.addEventListener('click', function(){
		var query = document.getElementById('search-input').value.trim();
		query = query.replace(' ', '+');
		console.log(query);
		window.location = "/search/" + query;
	});
}
