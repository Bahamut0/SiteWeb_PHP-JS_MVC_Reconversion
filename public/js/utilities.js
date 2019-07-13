'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* *********************************** FONCTIONS UTILITAIRES *********************************** */
/*************************************************************************************************/

function getRandomInteger(min, max){
	return Math.floor(Math.random()*(max+1-min)+min);
}

function requestInteger(message, min, max){
	let level;
	do{
	level= prompt(message);
	}
	while (level>max || level<min || isNaN(level));
	return parseInt(level);
}
function loadLocalStorage() {

	if(typeof localStorage!='undefined') {

		if (getLocalStorageData !== null) {

			gameData = JSON.parse(getLocalStorageData);

		}
		else {
			gameData = {};
		}

	}
}

