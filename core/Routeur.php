<?php 
	namespace Bahamut0\Core; 
	use Bahamut0\Reconversion\Controller\ErrorController;

    class Routeur{

        /**
         * @var array
         */
        public $routes;
        /**
         * @var bool
         */
        private $routefound= false;
        /**
         * @var Request
         */
        public $req;
        public $url;

        /**
         * Routeur constructor.
         * @param Request $req
         * @param array $routes
         */
        function __construct(Request $req, $routes=[]){
		$this->req=$req;
		$this->url=$req->getURL();
        $this->routes= $routes;

	}
        public function run(){

            foreach ($this->routes as $value) {
                if ($this->url == $value["path"]) {

                    if(isset ($value["isLogged"]) && $this->req->auth()->isLogged() != $value["isLogged"]){
                        $this->req->redirectToRoute($this->req->auth()->isLogged()? "home": "login");

                    }
                    else if(isset($value["isAdmin"]) && $this->req->auth()->isAdmin() !=$value["isAdmin"]){
                        $this->req->redirectToRoute("home");
                    }

                    $routeParts = explode("@", $value["exec"]);
                    $methodeChemin = $routeParts[1];
                    $className = "Bahamut0\Reconversion\Controller\\" . $routeParts[0];
                    $controller = new $className();
                    $controller->$methodeChemin($this->req);
                    $this->routefound = true;
                    break;
                }
            }
                if(!$this->routefound){
                        $error404= new ErrorController();
                        $error404->error();
                }
            }
        }
