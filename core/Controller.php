<?php 
	namespace Bahamut0\Core;
	class Controller{

		protected function render($view, $data=[]){
			extract($data);
			ob_start();
			include('../views/'.$view.'.phtml');
			$viewContent= ob_get_clean();
			include('../views/layout.phtml');
		}

        protected  function globalVariable($data=[]){
            extract($data);
        }
	}
