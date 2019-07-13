'use strict';

let sub_nav= document.getElementsByClassName("sous-menu");
for (let i=0; i<sub_nav.length; i++){
    sub_nav[i].addEventListener("click", onClickSubNav);
}
function onClickSubNav (){
    if (window.innerWidth < 950) {
        if (this.classList.contains("is-active")) {
            this.classList.remove("is-active");
        }
    }
    else {
        this.classList.add("is-active");
    }
}

//addressbook
let form_address_book = document.querySelector(" #form_address_book");
let newContact= document.querySelector("#newContact");
let deleteAll= document.querySelector(".deleteAll");


if(form_address_book !=null) {
    form_address_book.addEventListener("submit", onContactFormSubmit);
}
if(newContact !=null) {
    newContact.addEventListener("click", onNewContactClick);
}
if(deleteAll !=null) {
    deleteAll.addEventListener("click", onDeleteAllClick);
}
