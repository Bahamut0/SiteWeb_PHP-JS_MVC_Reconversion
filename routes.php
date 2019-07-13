<?php
$routes=[
    "home"=>[
        "path"=>"home",
        "exec"=>"PagesController@home"
    ],
    "preparation"=>[
        "path"=>"preparation",
        "exec"=>"PagesController@preparation"
    ],
    "teachers"=>[
        "path"=>"enseignement",
        "exec"=>"PagesController@teachers"
    ],
    "ide"=>[
        "path"=>"ide-edt",
        "exec"=>"PagesController@ide"
    ],
    "languages"=>[
        "path"=>"langages-et-frameworks",
        "exec"=>"PagesController@languages"
    ],
    "software"=>[
        "path"=>"logiciels",
        "exec"=>"PagesController@software",

    ],
    "portefolio"=>[
        "path"=>"portefolio",
        "exec"=>"PagesController@portefolio",

    ],
    "registration"=>[
        "path"=>"inscription",
        "exec"=>"UsersController@register"
    ],
    "login"=>[
        "path"=>"connexion",
        "exec"=>"UsersController@login"
    ],
    "logout"=>[
        "path"=>"déconnexion",
        "isLogged"=>true,
        "exec"=>"UsersController@logoutUser"
    ],
    "profile"=>[
        "path"=>"profil",
        "isLogged"=>true,
        "exec"=>"UsersController@profile"
    ],
    "password"=>[
        "path" =>"password",
        "exec" => "UsersController@changePassword",
        "isLogged" => true
    ],
    "account"=>[
        "path"=>"compte",
        "isLogged"=>true,
        "exec"=>"UsersController@editAccount"
    ],
    "game"=>[
        "path"=> "jeu",
        "exec"=> "GamesController@saveDataGame",

    ]

];