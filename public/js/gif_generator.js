'use strict';

//variables

let display_gif= document.querySelector("#gif");
let gif_button= document.querySelector("#gif_button");
let inputWord= document.getElementById("word");
let chosenWord="";

//Fonctions

//Ajax
function apiGiphy(){

    let key= "yRjQ2HNxGoo1pFY2xbUjoBTcasNr8pun";
    chosenWord= inputWord.value;

    fetch("http://api.giphy.com/v1/gifs/search?api_key="+key+"&q="+chosenWord)

        .then(function(response) {
            return response.json();
        })
        .then(function(response) {

            for (let i = 0; i < 10; i++) {
                display_gif.innerHTML += '<img src="' + response.data[i].images.downsized.url + '" alt="En cours" class="gif_img">';
            }
        });
}


//Event

if(gif_button !== null) {
    gif_button.addEventListener("click", apiGiphy);
}



