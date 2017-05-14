<?php

namespace loginBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\Session;

use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\User\User;


class DefaultController extends Controller
{
  
    public function loginAction(){


        $jwt_auth = $this->get('app.jwt_auth');
        $user = $this->getUser();
        $em = $this->getDoctrine()->getManager();
       
          if (is_object($this->getUser())) {
            $provider = $this->get('security.token_storage')->getToken()->getProviderKey();
            $securityContext = $this->container->get('security.token_storage');

            // return $this->redirect('http://localhost:4200');


            // return $jwt_auth->crearToken($user,$em,$provider,$securityContext,true);

        
           //  $em = $this->getDoctrine()->getManager();
           //  
           //  
              return  $this->redirectToRoute('inicio');

        //    //     
       
        //    //     
        //    //     $jwt = JWT::encode($token_jwt, $key, 'HS256');
        //    //     $decode = JWT::decode($jwt,$key,array('HS256'));

        //        // return new jsonResponse($decode) ;

        //        // return new JsonResponse($jwt);
        //        // die();
        //         // return $this->json($datos);
                
           }else{
                $autenticationUtils = $this->get('security.authentication_utils');
                 $error = $autenticationUtils->getLastAuthenticationError();
                $lastUser = $autenticationUtils->getLastUsername();
                 return $this->render('loginBundle:default:login.html.twig',array(
                'last_username' => $lastUser,
                'error'=> $error,
            ));
       
           }
	}

  public function ldapAction(Request $request){

    $username = $request->get('username');
    $password= $request->get('password');
    $hash = $request->get('hash');
    $em = $this->getDoctrine()->getEntityManager();

    $securityContext = $this->container->get('security.token_storage');


    $jwt_auth = $this->get('app.jwt_auth');
    return $jwt_auth->crearToken($username,$password,$em,$securityContext,$hash);

  }

    public function  perfilAction(){
        $user = $this->getUser()->getUsername();
        $correo = $user.'@armada.mil.co';
        $em = $this->getDoctrine()->getManager();
        $login_repo= $em->getRepository("loginBundle:login");
        $usuario = $login_repo->getSessionUser($correo);


        return $this->render('loginBundle:default:perfil.html.twig',array(
            'usuario' =>$usuario,
        ));
    }
    
}
