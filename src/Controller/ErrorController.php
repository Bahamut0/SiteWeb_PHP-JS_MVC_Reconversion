<?php 
	namespace Bahamut0\Reconversion\Controller;
	use \Bahamut0\Core\Controller;

	class ErrorController extends Controller{
		function error(){
				$this->render("error404");
			}
	}
