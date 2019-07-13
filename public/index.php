<?php

session_start();
if(empty($_SESSION["csrf_token"])) {

    try {
        $_SESSION["csrf_token"] = bin2hex(random_bytes(16));
    }
    catch (Exception $e) {
        echo "Erreur : Token";
    }
}

include ("../routes.php");
include("../autoload.php");
define("BASE_URL", "/reconversion/public");
$request= new Bahamut0\Core\Request($routes); //Il set et récupère l'url
$routeur= new Bahamut0\Core\Routeur($request,$routes); //il conduit l'url récupéré dans divers routes en fonction de celles définies dans le routeur.
require_once("../core/helpers.php");

$routeur->run();



	
