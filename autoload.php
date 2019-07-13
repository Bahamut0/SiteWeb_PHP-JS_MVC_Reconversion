<?php 

	spl_autoload_register(function($className){
		$base_dir=__DIR__."/src/";
		$prefix="Bahamut0\\Reconversion\\";
		$prefixlen=strlen($prefix);
		if(strncmp($prefix, $className, $prefixlen)!==0){
			return;
		}
		$className= substr($className, $prefixlen);
		$file=$base_dir.str_replace("\\", "/", $className).".php";

		if(file_exists($file)){
			require $file;
		}
	});

	spl_autoload_register(function($className){
		$base_dir=__DIR__."/core/";
		$prefix="Bahamut0\\Core\\";
		$prefixlen=strlen($prefix);
		if(strncmp($prefix, $className, $prefixlen)!==0){
			return;
		}
		$className= substr($className, $prefixlen);
		$file=$base_dir.str_replace("\\", "/", $className).".php";

		if(file_exists($file)){
			require $file;
		}
	});

