<?php
	namespace Bahamut0\Core;
	use PDO;
    use PDOException;

    /**
     * @property PDO pdo
     */
    class Database
	{

		function __construct()
		{
			try{
				$this->pdo=new PDO("mysql:host=localhost;dbname=reconversion;charset=utf8","root","");
				$this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	        }
			catch(PDOException $e){
				echo "Impossible de se connecter à la base de données. ";
				die();
	        }
		}
	}

