'use strict';

let form=document.querySelector("#form_address_book");
let definedContact= true;

function onContactFormSubmit(event){

	event.preventDefault();
	let lastname=this.elements.contact_lastname.value;
	let firstname=this.elements.contact_firstname.value;
	let tel=this.elements.tel.value;
	let contact= {
		lastname:lastname,
		firstname:firstname,
		tel:tel
	};

	if(form.dataset.mode==="edition"){
		let contacts= loadContacts();
		let dataIndex= this.dataset.index;
		contacts[dataIndex]= contact;
		saveContact(contacts);
		displayContact();

	}
	else{
		if(contact.lastname !=="" && contact.firstname !=="" && contact.tel !=="" ){
			addContact(contact);
		}
		else if(contact.lastname ===""){
			let divNom= document.querySelector(".divNom");
			divNom.classList.remove("hide");
			divNom.innerHTML= "<p>Il manque le nom de famille</p> ";
		}

	}
}

function onContactClick(event){

	event.preventDefault();

	let allA = document.querySelectorAll("#address_book a");
	let dataIndex = this.dataset.index;
	let contacts = loadContacts();
	let contact = contacts[dataIndex];
	let section = document.querySelector("#address_book section");


	if (definedContact) {

		let lastname = document.querySelector("input[name=contact_lastname]");
		let firstname = document.querySelector("input[name=contact_firstname]");
		let tel = document.querySelector("input[name=tel]");
		//afficher sur la page les infos du contact
		section.innerHTML = "<p>Nom : " + contact.lastname + "</p><p>Prénom :" + contact.firstname + "</p><p>Tel : " + contact.tel + "</p>";
		/*intégrer les données du contact dans les input : */

		lastname.value = contact.lastname;
		firstname.value = contact.firstname;
		tel.value = contact.tel;
	}
		form.dataset.mode = "edition";
		form.dataset.index = dataIndex;
		let buttonEnvoi = document.querySelector("#envoi");
		buttonEnvoi.innerHTML = " Modifier ";

		/*Retirer la class active de tous les liens "a" sauf celui cliqué*/
		for (let i = 0; i < allA.length; i++) {

			allA[i].classList.remove("active");

		}
		this.classList.add("active");

}

function onNewContactClick(){

	form.dataset.mode="add";
	delete form.dataset.index;
	form.classList.remove("active");
	let buttonEnvoi= document.querySelector("#envoi");
	buttonEnvoi.innerHTML=" Ajouter ";

}
function contentNull() {
	let section= document.querySelector("#address_book section");
	let lastname=document.querySelector("input[name=contact_lastname]");
	let firstname=document.querySelector("input[name=contact_firstname]");
	let tel=document.querySelector("input[name=tel]");
	lastname.value= null;
	firstname.value= null;
	tel.value= null;
	section.innerHTML="";
}
function onDeleteAllClick(e){

	e.preventDefault();
	localStorage.clear();
	contentNull();
	displayContact();
}
function onIconeDeleteClick(e){

	e.preventDefault();
	definedContact= false;
	let dataIndex= this.parentElement.dataset.index;
	let contacts= loadContacts();
	contacts.splice(dataIndex, 1);
	saveContact(contacts);
	delete form.dataset.index;
	contentNull();
	displayContact();
}