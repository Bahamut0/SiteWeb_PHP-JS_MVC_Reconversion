"use strict";

//init
let game, damagePoint, hpDragon;
let hpDrago= document.querySelector(".hpDragon");
let hpXena= document.querySelector(".hpXena");
let level=document.querySelector(".level");
let levelDescription=document.querySelector(".levelDescription");
let sword=document.querySelector(".sword");
let armor=document.querySelector(".armor");
let swordDescription=document.querySelector(".swordDescription");
let armorDescription=document.querySelector(".armorDescription");


// buttons for EventListener
let activationButton=document.getElementById("activationButton");
let roundButton=document.getElementById("roundButton");
let refreshButton=document.getElementById('refreshButton');
let saveButton=document.getElementById('saveButton');

//Looping && results
let winny=document.querySelector(".winny");
let damageP=document.querySelector(".damageP");
let gameWinner=document.querySelector(".gameWinner");
let paraIni=document.querySelector(".paraIni");
let paraLooping=document.querySelector(".paraLooping");
let game_container= document.querySelector("#dragon");
let paraToBePushed= document.querySelector("#paraToBePushed");
let containerGifDragon= document.createElement("p");
containerGifDragon.innerHTML="";

// results for dataBase
let gameData; //l'objet qui contient mes résultats de jeu et que j'enverrai dans l'inputhiddengamedata
let inputHiddenGameData= document.getElementById("inputHiddenGameData");
let getLocalStorageData= localStorage.getItem('gameData');
let dragon_form=document.getElementById('dragon_form');




/*initialisation*/
function initializeGame(){

    loadLocalStorage();
    game={
        level:requestInteger("Choisissez un niveau de difficulté entre 1 et 3",1,3),
        armor: requestInteger("Choisissez le niveau de votre armure entre 1 et 3",1,3),
        sword: requestInteger("Choisissez le niveau de votre épée entre 1 et 3",1,3),

    };

    switch(game.level){
        case 1:
            game.levelName= "facile";
            game.levelDescription= "  Quel lâche !";
            game.hpPlayer=getRandomInteger(200,250);
            game.hpDragon=getRandomInteger(150,200);
            levelDescription.innerHTML=game.levelDescription;
            level.innerHTML=game.levelName;
            hpXena.innerHTML=game.hpPlayer;
            hpDrago.innerHTML=game.hpDragon;
            break;

        case 2:
            game.levelName= "normal";
            game.levelDescription= " Comme les gens ennuyeux !";
            game.hpPlayer=getRandomInteger(200,250);
            game.hpDragon=getRandomInteger(200,250);
            levelDescription.innerHTML=game.levelDescription;
            level.innerHTML=game.levelName;
            hpXena.innerHTML=game.hpPlayer;
            hpDrago.innerHTML=game.hpDragon;
            break;

        case 3:
            game.levelName="difficile";
            game.levelDescription= " Quel m'as-tu vu !";
            game.hpPlayer=getRandomInteger(150,200);
            game.hpDragon=getRandomInteger(200,250);
            levelDescription.innerHTML=game.levelDescription;
            level.innerHTML=game.levelName;
            hpXena.innerHTML=game.hpPlayer;
            hpDrago.innerHTML=game.hpDragon;
            break;

        default:

    }

    switch(game.sword){
        case 1:
            game.swordName= "une épée en bois";
            game.swordRatio=0.5;
            game.swordDescription= " Vos attaques seront donc divisées par 2 : Cela risque de vous prendre un certain temps !";
            sword.innerHTML=game.swordName;
            swordDescription.innerHTML=game.swordDescription;

            break;
        case 2:
            game.swordName="une épée de cuivre";
            game.swordRatio=1;
            game.swordDescription= " Vos attaques seront classiques. C'est d'un banal !";
            sword.innerHTML=game.swordName;
            swordDescription.innerHTML=game.swordDescription;
            break;
        case 3:
            game.swordName= "Excalibur";
            game.swordRatio=1.5;
            game.swordDescription= " Vos attaques seront multipliées par 150% . N'oubliez pas de rendre Excalibur, ceci est un prêt!";
            sword.innerHTML=game.swordName;
            swordDescription.innerHTML=game.swordDescription;

            break;
        default:
    }

    switch(game.armor){
        case 1:
            game.armorName= "armure de cuivre";
            game.armorRatio=1;
            game.armorDescription= " J'aimerai vous dire qu'elle vous protégera, mais en réalité: la porter ou non ne changera rien !";
            armor.innerHTML=game.armorName;
            armorDescription.innerHTML=game.armorDescription;
            break;
        case 2:
            game.armorName= "armure de fer";
            game.armorRatio=1.5;
            game.armorDescription= " Les dégâts subis sont divisés par 150%. C'est bien, mais je n'ai jamais testé cela contre les crocs d'un dragon !";
            armor.innerHTML=game.armorName;
            armorDescription.innerHTML=game.armorDescription;
            break;
        case 3:
            game.armorName= "armure magique";
            game.armorRatio=2;
            game.armorDescription= " Les dégâts subis sont divisés par 2. Shame on you, si vous perdez quand même !";
            armor.innerHTML=game.armorName;
            armorDescription.innerHTML=game.armorDescription;
            break;
        default:

    }
    paraIni.classList.remove("paraIni");
    roundButton.classList.remove("display_none");
    activationButton.classList.add("display_none");
}

function computeDragonDamage(){

    switch(game.level){
        case 1:
            damagePoint= (getRandomInteger(10, 15))/game.armorRatio;
            break;
        case 2:
            damagePoint= (getRandomInteger(15,25))/game.armorRatio;
            break;
        case 3:
            damagePoint= (getRandomInteger(20,30))/game.armorRatio;
            break;

    }

    return damagePoint;
}

function computePlayerDamage(){
    switch(game.level){
        case 1:
            damagePoint= (getRandomInteger(15, 20))*game.swordRatio;
            break;

        case 2:
            damagePoint= (getRandomInteger(10,15))*game.swordRatio;
            break;

        case 3:
            damagePoint= (getRandomInteger(5,10))*game.swordRatio;
            break;

    }

    return damagePoint;
}

function gameloop() {

    let dragonSpeed, playerSpeed, damagePoint, winner;
    paraLooping.insertBefore(containerGifDragon, paraToBePushed);

    hpXena.innerHTML = game.hpPlayer.toFixed(2);
    hpDrago.innerHTML = game.hpDragon.toFixed(2);
    paraIni.classList.add("paraIni");
    paraLooping.classList.remove("paraLooping");

    if (game.hpPlayer > 0 && game.hpDragon > 0) {

        dragonSpeed = getRandomInteger(0, 100);
        playerSpeed = getRandomInteger(0, 100);


        if (dragonSpeed > playerSpeed) {

            damagePoint = computeDragonDamage();
            winner = "Le dragon";
            winny.innerHTML = winner;
            game.hpPlayer -= damagePoint.toFixed(2);
            damageP.innerHTML = damagePoint.toFixed(2);
            containerGifDragon.innerHTML = 'Le dragon vous carbonise ! <br><img src="' + base_url + '/img/dragon_slayer/fire-dragon.gif" alt="gif du vainqueur" class="gif_winny">';

        }
        if (dragonSpeed < playerSpeed) {

            damagePoint = computePlayerDamage();
            winner = "Xéna";
            winny.innerHTML = winner;
            game.hpDragon -= damagePoint.toFixed(2);
            damageP.innerHTML = damagePoint.toFixed(2);
            containerGifDragon.innerHTML = 'Vous avez fait saigner le dragon ! <br><img src="' + base_url + '/img/dragon_slayer/sword-blood.gif" alt="gif du vainqueur" class="gif_winny">';

        }
    }

    else{
        refreshButton.classList.remove('display_none');

        (function () {

            roundButton.classList.add("display_none");
            containerGifDragon.innerHTML = "<p></p>";
            paraLooping.classList.add("display_none");


            if (game.hpPlayer <= 0) {
                game.hpPlayer = 0;
                if(dragon_form){
                    gameData = {
                        game_result: "défaite",
                        level: game.levelName,
                        armor: game.armorName,
                        sword: game.swordName
                    };
                    saveButton.classList.remove('display_none');
                    save();
                    saveButton.addEventListener("click", sendData);
                }
                winner = " Javawan the Bug a gagné, vous avez été carbonisé ! Le prince fainéant restera son captif pour les 1000 ans à venir. Quelque part, c'est merrité !";
                gameWinner.innerHTML = winner;
                game_container.style.backgroundImage = "url('" + base_url + "/img/dragon_slayer/fire_dragon2.gif')";
            }
            if (game.hpDragon <= 0) {
                game.hpDragon = 0;
                if(dragon_form) {
                    gameData = {
                        game_result: "victoire",
                        level: game.levelName,
                        armor: game.armorName,
                        sword: game.swordName
                    };
                    saveButton.classList.remove('display_none');
                    save();
                    saveButton.addEventListener("click", sendData);
                }

                winner = "Vous avez terrassé le terrible ***Voledemort*** et délivré le prince captif !";
                gameWinner.innerHTML = winner;
                game_container.style.backgroundImage = "url('" + base_url + "/img/dragon_slayer/sword-move.gif')";

            }
            refreshButton.addEventListener('click', refresh);

        })();
    }
}

function refresh() {
    location.reload();
}

function save(){


    //event.preventDefault();
    let gameJson=JSON.stringify(gameData);
    localStorage.setItem("gameData", gameJson);
    inputHiddenGameData.value=gameJson;
    console.log(gameJson);
    console.log(inputHiddenGameData.value);
    //localStorage.removeItem("gameData");
    //saveButton.classList.add("display_none");

}
function sendData(){
    alert("Vos données ont bien été enregistrées.");
    localStorage.removeItem("gameData");
}
//events
if (activationButton !== null) {
    activationButton.addEventListener("click", initializeGame);
}
if (roundButton !== null) {
    roundButton.addEventListener("click", gameloop);
}



//h2-rotate
let TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 6) || 100;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    let that = this;
    let delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    let elements = document.getElementsByClassName('txt-rotate');
    for (let i=0; i<elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-rotate');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // CSS
    let css = document.createElement("style");
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid indigo }";
    document.body.appendChild(css);
};