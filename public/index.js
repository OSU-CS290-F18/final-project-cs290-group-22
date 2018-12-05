function insertNewCard(text, answers){
    var photoCardContext = {
        text: text,
        answers: answers
    };

    var photoCardHTML = Handlebars.templates.photoCard(photoCardContext);

    var photoCardContainer = document.getElementById("posts");
    photoCardContainer.insertAdjacentHTML('beforeend',photoCardHTML);
};

var posts = [];
window.onload = function(){
    var content = document.getElementsByClassName('post');
    for(i =0; i < content.length; i++){
	       posts.push(content[i]);
	}
    get_all_posts();
}


function get_all_posts(){
	var result  = [];
	var content = document.getElementsByClassName('post');
	for(i =0; i < content.length; i++){
		result.push(content[i]);
	}
	return result;
}


function add_all_posts(){
	for(i = 0; i < posts.length; i++){
		document.getElementById("posts").appendChild(posts[i]);
	}
}


function remove_post(arr,index){
	document.getElementById("posts").removeChild(arr[index]);
	return true;
}



function apply_filter(text, min_price, max_price, city, checked_items){
	add_all_posts();
	set_text_filter(text, get_all_posts());
	set_price_filter(parseInt(min_price),parseInt(max_price), get_all_posts());
	set_city_filter(city, get_all_posts());
	set_condition_filter(checked_items,get_all_posts());

}

function input_is_empty(){
	var inputs = document.querySelectorAll('.modal-body input')
	for(i =0; i < 4; i++ ){
		if(inputs[i].value == ""){
			alert("You have entered an invalid input. Please try again.");
			return false;
		}
	}
	return true;
}


 var modal = document.getElementById('sell-something-modal');
 var modal_backdrop = document.getElementById('modal-backdrop');
 var modal_open_btn = document.getElementById('sell-something-button');
 var modal_close_btn = document.getElementById('modal-close');

 var modal_accept_btn = document.getElementById('modal-accept');
 var modal_cancel_btn = document.getElementById('modal-cancel');


 // Opens modal when user clicks the 'plus' button
modal_open_btn.addEventListener("click", function() {
    modal.style.display = "block";
    modal_backdrop.style.display = "block";
});


 // Closes modal when user clicks the 'x' button
 modal_close_btn.addEventListener("click", function() {
     modal.style.display = "none";
     modal_backdrop.style.display = "none";
 });

 // Closes modal when user clicks the cancel button
 modal_cancel_btn.addEventListener("click", function() {
     modal.style.display = "none";
     modal_backdrop.style.display = "none";
 });

 function set_city_filter(choice, arr){
 	city= null;
 	for(var i=0; i < arr.length; i++){
 		city = arr[i].getAttribute('data-city');
 		if(choice != "" && choice != city){
 			remove_post(arr,i);
 		}
 	}
 }


 function get_checked_box(fieldset){
 	var checked_value = [];
 	var input_elements = document.getElementsByName(fieldset);
 	for(var i=0; i<5; ++i){
 		  if(input_elements[i].checked == true){
 			   checked_value.push(input_elements[i].value);
 		  }
 	}
 	return checked_value;
 }

function get_condition(fieldset){
 	var checked_value = [];
 	var input_elements = document.getElementsByName(fieldset);
 	for(var i=0; i<5; ++i){
 		  if(input_elements[i].checked == true){
 			   checked_value.push(input_elements[i].value);
 		  }
 	}
 	return checked_value;
}

function set_price_filter(minPrice,maxPrice, arr){
	var price = null;
	for(var i=0; i < arr.length; i++){
		price = parseInt(arr[i].getAttribute('data-price'));
		if(!isNaN(maxPrice) && isNaN(minPrice)){
			if(price >  maxPrice){
				remove_post(arr,i);
			}
		}else if(!isNaN(minPrice) && isNaN(maxPrice)){
			if(price <  minPrice){
				remove_post(arr,i);
			}
		}else if(!isNaN(minPrice) && !isNaN(maxPrice)){
			if(price >  maxPrice || price <  minPrice){
				remove_post(arr,i);
			}
		}
	}
}

function set_condition_filter(filter, arr){
	condition= null;
	for(var i=0; i < arr.length; i++){
		condition = arr[i].getAttribute('data-condition');
		if(filter.length > 0 && !filter.includes(condition)){
			remove_post(arr,i);
		}
	}
}

function set_text_filter(input, arr){
	text = null;
	if(input.trim() != ""){
		input = input.toLowerCase().trim().split(" ");
		for(var i=0; i < arr.length; i++){
			text = arr[i].textContent.toLowerCase().trim().split(" ");
			for(var j=0; j < text.length; j++){//[h,r,t]
				if(input.includes(text[j])){
					break;

				}else if(j+1 == text.length && !input.includes(text[j]) ){
					remove_post(arr,i);
				}
			}
		}
	}
}


var post_container = document.getElementById("posts");

function insertNewPhotoCard() {
	var post = document.createElement('div');
	post.classList.add('post');

	var input = document.getElementById('post-text-input').value;
	var price = document.getElementById('post-price-input').value;
	var city = document.getElementById('post-city-input').value;
	var img_src = document.getElementById('post-photo-input').value;

    var contents = document.createElement('div');
    contents.classList.add('post-contents');

    // Creates the image container for the post
    var image_container = document.createElement('div');
    image_container.classList.add('post-image-container');

    var image = document.createElement('img');
    image.src = img_src;

    var post_info_container = document.createElement('div');
    post_info_container.classList.add('post-post_info_container');

    //sets the title of the post
    var post_title = document.createElement('a');
    post_title.classList.add('post-title');

    post_title.textContent = input;
    post_title.href = "#";

    // Sets price of post
    var post_price = document.createElement('span');
    post_price.classList.add('post-price');

    post_price.textContent = "$" + price;

    // Sets the city of the post
    var post_city = document.createElement('span');
    post_city.classList.add('post-city');

    post_city.textContent = "(" + city + ")";

    // Appends all values to the new post element
	post_container.appendChild(post);
    post.appendChild(contents);
    contents.appendChild(image_container);
    image_container.appendChild(image);
    contents.appendChild(post_info_container);

    post_info_container.appendChild(post_title);
    post_info_container.appendChild(post_price);
    post_info_container.appendChild(post_city);


    post.setAttribute("data-price", price);
    post.setAttribute("data-city", city);
    post.setAttribute("data-condition", get_checked_box('post-condition'));




	console.log('post:', post);

    posts.push(post);
}

modal_accept_btn.onclick = function() {
    if (input_is_empty()){
        insertNewPhotoCard();
        modal.style.display = "none";
        modal_backdrop.style.display = "none";
    }
}

var update = document.querySelector('.action-button');
update.addEventListener('click',
	function (event) {
		var filterText = document.getElementById("filter-text").value;
		var min = document.getElementById("filter-min-price").value;
		var max = document.getElementById("filter-max-price").value;
		var filterCity = document.getElementById("filter-city").value;
		apply_filter(filterText, min, max, filterCity,get_checked_box('filter-condition'));
	}
);
