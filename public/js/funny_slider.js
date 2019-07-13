'use strict';

let slides, slide, interval, alea;

let indexOfSlides=0;
let buttonLeft= document.querySelector(".buttonLeft");
let buttonRight= document.querySelector(".buttonRight");
let buttonPlay= document.querySelector(".buttonPlay");
let image= document.querySelector("#funny_slider img");
let title= document.querySelector("#funny_slider figcaption");
let buttonRandom= document.querySelector(".random");
let play= document.querySelector(".fa-play");
let pause= document.querySelector(".fa-pause");
let display= document.querySelector(".display");
let toggleHide= document.querySelector(".toggleHide");
let sliderApp= false;


slides= [
	{
		img: base_url+"/img/funny_slider/depressif.jpeg",
		titre: "J'ai toute ma tête !",
	},
	{
		img: base_url+"/img/funny_slider/drunkDog.jpeg",
		titre: "Après le boulot !",
	},

	{
		img: base_url+"/img/funny_slider/lostDog.jpeg",
		titre: "Il n'y a plus rien à faire pour ce chien !",
	},
	{
		img: base_url+"/img/funny_slider/surprisedDog.jpeg",
		titre: "Question: Qu'a vu ce chien ?",
	}

];


//function
function refreshSlider(){

	sliderApp=true;
	slide= slides[indexOfSlides];
	image.src=slide.img;
	title.innerHTML=slide.titre;

}

function nextSlide(){

	if(indexOfSlides===slides.length-1){
		indexOfSlides=0;
	}
	else{
		indexOfSlides++;
	}	
	refreshSlider();

}
function previousSlide(){

	if(indexOfSlides===0){
		indexOfSlides=slides.length-1;
	}
	else{
		indexOfSlides--;
	}
	refreshSlider();
	
}

function randomSlide(){
	 do{
		Math.floor(Math.random()*(indexOfSlides.length));
	}
	while(alea===indexOfSlides);
	 	refreshSlider();
}

function slider(){

	play.classList.toggle("fa-play");
	play.classList.toggle("fa-pause");
	if(interval){
		interval=clearInterval(interval);
	}
	else{
		interval=setInterval(nextSlide, 1500);
	}

}

function displayButton(){

	sliderApp= true;
	let toggleButton= document.querySelector('#toggleButton');
	if(toggleButton.classList.contains("afficher")){
		toggleButton.innerHTML= "Cacher";
		toggleButton.classList.remove("afficher");
	}
	else{
		toggleButton.innerHTML="Afficher";
		toggleButton.classList.add('afficher');
	}
	toggleHide.classList.toggle("toggleHide");
}
function onKeyDownSlider(event){

	//event.preventDefault();
	switch(event.which){
		case 39: //flèche de gauche
		nextSlide();
		break;

		case 37:
		previousSlide(); //flèche de droite
		break;

		case 32:  //Espace
		slider();
		break;

		case 13:
		displayButton(); // Enter
		break;

		default:
	}
}
// Event

if(buttonLeft !=null) {
	buttonLeft.addEventListener("click", previousSlide);
}
if(buttonRight != null) {
	buttonRight.addEventListener("click", nextSlide);
}
if(buttonRandom != null) {
	buttonRandom.addEventListener("click", randomSlide);
}
if(buttonPlay != null) {
	buttonPlay.addEventListener("click", slider);
}
if(display != null) {
	display.addEventListener("click", displayButton);
}

if( sliderApp && window.addEventListener ) {
	window.addEventListener("keydown", onKeyDownSlider);
}

