<?php

namespace AppBundle\Services;

use \Firebase\JWT\JWT;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Ldap\LdapClient;

/**
* Descripcion of JwtAuth
*
* @autor Usuario
*/
class jwt_auth{

	public $user;
	public $manager;
	public $provider;
	public $key;
	public $securityContext;
	public $hash;

	public function _constructor($manager){
		$this->$key = 'Clave';
		$this->$em=$manager;
	}
	public function crearToken($username,$password,$em,$securityContext,$hash){

		$ldap = new LdapClient('172.24.10.43', 389, 3, false, false);
    	try{
    		$bind= $ldap->bind('uid='.$username.',ou=people,dc=armada,dc=mil,dc=co', $password);

    	}catch(\Exception $e){
    		return new JsonResponse(array('status'=>'login incorrecto'));
    	}
    	$user =  $ldap->find('ou=people,dc=armada,dc=mil,dc=co','(uid='.$username.')');

	    $displayname = $user[0]['displayname'][0];
	    $cedula = $user[0]['postalcode'][0];
	    $mail = $user[0]['mail'][0];
	    $login_repo = $em->getRepository('loginBundle:login');
	    $usuario_s = $login_repo->getSessionUser($mail);
        $key = 'Clave';
        if($usuario_s['DEPENDENCIA'] == 'DIVISION HOJAS DE VIDA' && $usuario_s['IDENTIFICACION'] == '1032451583'){
			$role = 'administrador';
        }elseif($usuario_s['IDENTIFICACION'] == '80159513'){
			$role = 'jucla';
        }
        $token_jwt = array(
                "sub" 				=> $displayname,
                "email" 			=> $mail,
                'role'				=> $role,
                'apellidos'			=>	$usuario_s['APELLIDOS'],
                'nombres' 			=> $usuario_s['NOMBRES'],
                'identificacion'	=> $usuario_s['IDENTIFICACION'],
                'tipo_id' 			=> $usuario_s['TIPO_IDENTIFICACION'],
                'dependencia'		=> $usuario_s['DEPENDENCIA'],
                "iat" => time(),
                "exp" => time() + (7 * 24 * 60 *60 ),
            );

        		$jwt = JWT::encode($token_jwt, $key, 'HS256');
            	$decode = JWT::decode($jwt,$key,array('HS256'));
   
		 	if($hash == 'true' || $hash==null){
        		return new JsonResponse($jwt) ;
        	}

    		if($hash=='false'){
    			return new JsonResponse($decode);
    		}
            	
	}

	public function checkToken($jwt, $getIdentity = false){

		$key = 'Clave';
		$auth = false;

		try{
			$decoded =  JWT::dedode($jwt,$key,array('HS256'));
		}catch(\UnexpectedValueException $e){
			$auth = false;

		}catch(\DomainException $e){
			$auth = false;
		}

		if ( isset($decode->sub) ) {
			$auth = true;
		}else{
			$auth = false;
		}

		if($getIdentity = true){
			return $decode;
		}else{
			return $auth;
		}

	}


}