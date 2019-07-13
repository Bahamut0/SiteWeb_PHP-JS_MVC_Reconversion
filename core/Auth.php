<?php
namespace Bahamut0\Core;
class Auth{

    /**
     * @param $user
     * @param $password
     * @return bool
     */
    function connect($user, $password)
    {
        if (password_verify($password, $user["password"])) {
            //
            $_SESSION["user"]=$user;
            echo "Vous êtes connecté";

            return true;
        }
        return false;
    }
    function user(){

        return isset($_SESSION["user"]) ? $_SESSION["user"]: null;
    }
    function logout(){
        unset($_SESSION["user"]);
    }
    function isLogged(){
        return ($this->user()!==null);
    }
    function isAdmin(){
        return ($this->isLogged() && $this->user()["rank"]==2);

    }
}