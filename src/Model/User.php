<?php
namespace Bahamut0\Reconversion\Model;
use Bahamut0\Core\Database;

class User
{

    /**
     * @var Database
     */
    private $db;

    function __construct()
    {
        $this->db = new Database();

    }

    function create($email, $password){

        if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
            return [
                "success" => "false",
                "message" => "Email non valide"
            ];

        }
        else {
            $password = password_hash($password, PASSWORD_DEFAULT);
            $insertion = $this->db->pdo->prepare('INSERT INTO users (email, password) VALUES(:email, :password)');

            $exec = $insertion->execute([

                'email' => $email,
                'password' => $password

            ]);
            if ($insertion->errorInfo()[1] == 1062) {
                $message = "Email déjà utilisé";
            }
            else {
                $message = null;
            }
            return [
                "success" => $exec,
                "message" => $message
            ];

        }

    }

    function getByEmail($email)
    {
        $display = $this->db->pdo->prepare('SELECT *  FROM `users` WHERE email=:email');
        $display->execute([
            "email" => $email
        ]);
        return $display->fetch();

    }

    function updateAccount($id, $email, $last_name, $first_name, $phone, $address, $imageUrl, $city, $postal_code)
    {

        if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {

            return [
                "success" => false,
                "message" => "email non valide"];
        }

            $update = $this->db->pdo->prepare('
            update users
            set    email=:email,
                   last_name=:last_name,
                   first_name=:first_name,
                   phone=:phone,
                   address=:address,
                   imageUrl=:imageUrl, 
                   city=:city,
                   postal_code=:postal_code
            where  id=:id');
            $update->execute(
                [
                    "email" => $email,
                    "last_name" => $last_name,
                    "first_name" => $first_name,
                    "phone" => $phone,
                    "address" => $address,
                    "imageUrl" => $imageUrl,
                    "city" => $city,
                    "postal_code" => $postal_code,
                    "id" => $id
                ]
            );
            if ($update->errorInfo()[1]==1062){

                return [
                    "success"=>false,
                    "message"=>"email déjà utilisé"
                ];
                }
            else
            {
                return [
                    "success"=>true,
                    "message"=>null
                ];
            }

    }

    function updatePassword($id, $password)
    {
        $password = password_hash($password, PASSWORD_DEFAULT);

        $updatePass = $this->db->pdo->prepare('
        update users 
        set    password=:password
        where  id=:id
        ');
        $updatePass->execute([
            "id" => $id,
            "password" => $password
        ]);
    }

    function dataUser($id)
    {

        $display = $this->db->pdo->prepare('
        
        select *
        from   users
        where  id=:id');

        $display->execute([
            "id" => $id
        ]);
        return $display->fetch();

    }
    function delete($user_id){

        $delete=$this->db->pdo->prepare("DELETE FROM users WHERE id=:numeroID");
        $delete->execute([
            'numeroID'=>$user_id
        ]);

    }
}
