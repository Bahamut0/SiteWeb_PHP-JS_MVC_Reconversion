<?php 
	namespace Bahamut0\Reconversion\Controller;
	use \Bahamut0\Core\Request;
	use \Bahamut0\Core\Controller;
    use Bahamut0\Reconversion\Model\User;


    class PagesController extends Controller{
        /**
         * @var User
         */
        private $newUser;

        function __construct()
        {
            $this->newUser=new User();

        }

        function home(Request $req){

            $user= $req->auth()->user()["id"];
            $data_user= $this->newUser->dataUser($user);
            $this->render("home", compact("data_user"));
        }
        function preparation(Request $req){

            $user= $req->auth()->user()["id"];
            $data_user= $this->newUser->dataUser($user);
            $this->render("preparation", compact( "data_user"));
        }
        function teachers(Request $req){

            $user= $req->auth()->user()["id"];
            $data_user= $this->newUser->dataUser($user);
            $this->render("enseignement", compact( "data_user"));
    }
        function ide(Request $req){

            $user= $req->auth()->user()["id"];
            $data_user= $this->newUser->dataUser($user);
            $this->render("ide-edt", compact( "data_user"));
        }
        function languages(Request $req){

            $user= $req->auth()->user()["id"];
            $data_user= $this->newUser->dataUser($user);
            $this->render("langages-et-frameworks", compact( "data_user"));
        }
        function software(Request $req){

            $user= $req->auth()->user()["id"];
            $data_user= $this->newUser->dataUser($user);
            $this->render("logiciels", compact( "data_user"));
        }
        function portefolio(Request $req){

            $user= $req->auth()->user()["id"];
            $data_user= $this->newUser->dataUser($user);
            $this->render("portefolio", compact( "data_user"));
        }

    }


