'use strict';

function addContact(nouveauContact){
		let contacts= loadContacts();
		contacts.push(nouveauContact);
		saveContact(contacts);
		displayContact();

}
function displayContact(){

	let navContact= document.querySelector(".navContact");
	navContact.innerHTML="";
	let contacts= loadContacts();
		contacts.forEach(function(contact, i){
		let a= document.createElement("a");
		a.setAttribute("data-index", i );
		a.setAttribute("href",  "#");
		a.innerHTML= contact.lastname+ " "+ contact.firstname +' <i class="fas fa-times-circle iconeDelete"></i>';
		if(a  && navContact !== null) {

			navContact.appendChild(a);
			a.addEventListener("click", onContactClick);

			let iconeDelete= document.getElementsByClassName("iconeDelete");
			if(iconeDelete !=null) {
				for(let i=0; i<iconeDelete.length; i++) {
					iconeDelete[i].addEventListener("click", onIconeDeleteClick);
				}
			}

		}

	});
}
function saveContact(contacts){
	localStorage.setItem('contacts', JSON.stringify(contacts));

}
function loadContacts(){

	let recuperation= JSON.parse(localStorage.getItem('contacts'));

			if (recuperation == null) {
				return [];
			}
			return recuperation;

}

