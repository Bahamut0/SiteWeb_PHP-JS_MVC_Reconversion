<?php
namespace Bahamut0\Reconversion\Controller;

use Bahamut0\Core\Controller;
use Bahamut0\Core\Request;
use Bahamut0\Reconversion\Model\User;
use Bahamut0\Reconversion\Model\Game;

class UsersController extends Controller{

    /**
     * @var User
     */
    private $newUser;
    /**
     * @var Game
     */
    private $newGame;

    function __construct(){
        $this->newUser=new User();
        $this->newGame= new Game();
    }

    function register(Request $req){

        if(isset($_POST["password"])){

            if($_POST["password"] != $_POST["password_confirm"]){
                echo "mots de passe différents";
            }
            else{
                $create=$this->newUser->create($_POST["email"], $_POST["password"]);

                if($create["success"]){
                    $req->redirectToRoute("home");
                }
                else{
                    echo $create["message"];
                }
            }
        }
        $this->render("register");
    }

    function login(Request $req){


        if( isset($_POST["email"])){
            $user= $this->newUser->getByEmail($_POST["email"]);

            if(!empty($user)){
                    $connexion=$req->auth()->connect($user, $_POST["password"]);
            }
            if(isset($connexion)&& $connexion){

                $req->alert("Bienvenue ", "success");
                $req->redirectToRoute("home");
            }
            else{
                echo "Identifiants incorrects !";
            }

        }

        $this->render("login");
    }
    function logoutUser(Request $req){

        $req->auth()->logout();
        $req->redirectToRoute("home");
    }
    function profile(Request $req){

        $user_id= $req->auth()->user()["id"];
        $data_user= $this->newUser->dataUser($user_id);
        $dataGame= $this->newGame->displayGamesUser($user_id);
        $this->render("profile", compact("data_user", "dataGame"));

    }
    function layoutData(Request $req){

        $user= $req->auth()->user()["id"];
        $data_user= $this->newUser->dataUser($user);
        $this->globalVariable("$data_user");
    }

    function editAccount(Request $req){
        //on cible l'utilisateur via son id
        $user= $req->auth()->user()["id"];
        $data_user=$this->newUser->dataUser($user);

        //on pose les conditions
        if (isset($_POST["email"])){

            $email= $_POST["email"];
            $first_name= $_POST["first_name"];
            $last_name= $_POST["last_name"];
            $phone= $_POST["phone"];
            $address= $_POST["address"];
            $fileName=$data_user["imageUrl"];
            $city= $_POST["city"];
            $postal_code=$_POST["postal_code"];
            $base = __DIR__ . "/../../public";


            if( !empty($_FILES["image"]) ) {

                $tempPath = $_FILES["image"]["tmp_name"];
                $imageInfo = getimagesize($tempPath);

                if ($imageInfo[2] == IMAGETYPE_PNG || $imageInfo[2] == IMAGETYPE_GIF || $imageInfo[2] == IMAGETYPE_JPEG) {
                    if(!empty($user["imageUrl"]) && file_exists($base.$fileName)) {

                        //supprimer le lien de cette ancienne image
                        unlink($base . $user["imageUrl"]);
                    }
                    //redéfinir la sauvegarde de la nouvelle image

                $extention = pathinfo($_FILES["image"]['name'], PATHINFO_EXTENSION);

                    //récupérer l'extension de l'image sélectionnée

                $fileName = "/img/" . uniqid() . "." . $extention;
                move_uploaded_file($tempPath, $base . $fileName);

            }
            else{
                echo "Veuillez sélectionner une image en format jpeg, png ou gif";
            }
        }
            $account = $this->newUser->updateAccount($user, $email, $last_name, $first_name, $phone, $address,
                $fileName, $city, $postal_code);

            if (!$account["success"]) {
                $req->alert($account["message"], "alert");
            }
            $req->redirectToRoute("profile");
        }

        $this->render("account",compact("account", "data_user","fileName","user"));

    }

    function changePassword(Request $req)
    {
        $id=$req->auth()->user()["id"];
        $password= $_POST["password"];

        if ( isset($password) )
        {
            if ($password!=$_POST["password_confirm"])
            {
                $req->alert("erreur mot de passe","alert");
            }
            else
            {
                $this->newUser->updatePassword($id, $password);
            }
        }
        $req->redirectToRoute("profile");
    }
    function deleteUser(Request $req){

        $id= $req->auth()->user()["id"];
        $data_user= $this->newUser->dataUser($id);

        if (isset($_POST["delete"])) {
            $this->newUser->delete($id);
            $req->redirectToRoute("pageHome");
        }

        $this->render("usersList", compact("data_user","id"));

    }
}
