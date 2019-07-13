<?php 
	namespace Bahamut0\Core;

	class Request
    {
        public $routes;
        public $url;
        private $auth;

        function __construct($routes)
        {
            $url = isset($_GET["url"]) ? $_GET["url"] : "";
            $this->setURL($url);
            $this->auth= new Auth();
            $this->routes= $routes;
            if (!empty($_POST) && (empty($_POST["csrf_token"]) || !hash_equals($_SESSION["csrf_token"], $_POST["csrf_token"])))
            {
                $this->redirectToRoute("home");
            }
        }

        function setURL($url)
        {
            $this->url = $url;
        }

        function getURL()
        {
            return $this->url;
        }
        function redirectToRoute($routeName){
            $path=$this->routes[$routeName]["path"];
            header("location:".BASE_URL."/".$path);
            exit();
        }
        function auth(){
            return $this->auth;
        }

        function alert($msg, $type= "success"){
            $_SESSION["alert"]=
                '<div class="'.$type.'">'.$msg.'</div>';
        }
    }
