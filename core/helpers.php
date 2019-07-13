<?php
function route($routeName){
    global $routeur;
    return BASE_URL."/".$routeur->routes[$routeName]["path"];
}
function user (){
    global $request;
    return $request->auth()->user();
}
function auth(){
    global $request;
    return $request->auth();
}
function csrf_token(){

    echo '<input type="hidden" name="csrf_token" value="'.$_SESSION["csrf_token"].'">';
}