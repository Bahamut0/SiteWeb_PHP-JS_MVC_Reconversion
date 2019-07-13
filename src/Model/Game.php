<?php


namespace Bahamut0\Reconversion\Model;
use Bahamut0\Core\Database;


class Game
{
    /**
     * @var Database
     */
    private $db;

    function __construct()
    {
        $this->db = new Database();
    }

    function createGame($user_id, $game_result, $game_level, $armor, $sword){
        $insertInGames = $this->db->pdo->prepare('
        INSERT INTO games (user_id, game_date, game_result, game_level, armor, sword)    
        VALUES(:user_id, Now(), :game_result, :game_level, :armor, :sword)');

        $insertInGames->execute([

            'user_id' => $user_id,
            'game_result' => $game_result,
            'game_level'=> $game_level,
            'armor'=> $armor,
            'sword'=> $sword
        ]);
        return $this->db->pdo->lastInsertId();
    }

    function displayGamesUser($user_id){
        $display= $this->db->pdo->prepare('
        SELECT * FROM `games` WHERE user_id=:user_id order by game_date DESC ');

        $display->execute([
            "user_id" =>$user_id
        ]);
        return $display->fetchAll();
    }

}