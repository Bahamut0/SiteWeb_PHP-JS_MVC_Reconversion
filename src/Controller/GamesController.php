<?php

namespace Bahamut0\Reconversion\Controller;

use Bahamut0\Core\Controller;
use Bahamut0\Core\Request;
use Bahamut0\Reconversion\Model\Game;
use Bahamut0\Reconversion\Model\User;

class GamesController extends Controller
{
    /**
     * @var User
     */
    private $newUser;
    /**
     * @var Game
     */
    private $newGame;

    function __construct()
    {
        $this->newUser=new User();
        $this->newGame= new Game();
    }

    function saveDataGame(Request $req){

        $user= $req->auth()->user()["id"];
        $data_user= $this->newUser->dataUser($user);

        if(isset($_POST["inputHiddenGameData"]) && !empty($_POST["inputHiddenGameData"])) {

            $dataGame = json_decode($_POST["inputHiddenGameData"]);
            $game_result = $dataGame->game_result;
            $game_level = $dataGame->level;
            $armor = $dataGame->armor;
            $sword = $dataGame->sword;
            $game_id = $this->newGame->createGame($user, $game_result, $game_level, $armor, $sword);

        }
        $this->render("game", compact("data_user", "dataGame", "game_id", "game_level", "game_result", "armor", "sword"));
    }

}