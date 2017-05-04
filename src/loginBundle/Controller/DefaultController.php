<?php

namespace loginBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\User;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;



class DefaultController extends Controller
{
  
    public function loginAction(){

            //       $securityContext = $this->container->get('security.token_storage'); // do it your way
            // $securityContext->setToken($token);
            //     var_dump($securityContext->getToken($token));
            //     die();
        if (is_object($this->getUser() )) {

            $user = $this->getUser();
            $username =  $this->getUser()->getUsername();
            $password = $this->getUser()->getPassword();
            // $enable = $this->getUser()->isEnabled();
            // $expired = $this->getUser()->isAccountNonExpired();
            // $credentials = $this->getUser()->isCredentialsNonExpired();
            // $locked = $this->getUser()->isAccountNonLocked();
            // $roles = $this->getUser()->getRoles();

            $provider = $this->get('security.token_storage')->getToken()->getProviderKey();
            // $user2 = new User($username,$password,array('ROLE_ADMIN'),$enable,$expired,$credentials,$locked);
           $token =  new UsernamePasswordToken($username, $password, $provider,array('ROLE_ADMIN'));

            $securityContext = $this->container->get('security.token_storage'); // do it your way
            $securityContext->setToken($token);
            // $session = $request->getSession();
            // $session ->set('roles','ROLE_ADMIN');
            // $user = $this->getUser()->getUsername();
            //            $correo = $user.'@armada.mil.co';
            // $em = $this->getDoctrine()->getManager();
            // $login_repo= $em->getRepository("loginBundle:login");
            // $usuario = $login_repo->getSessionUser($correo);

               $this->redirectToRoute('inicio');

        
            // $token = new UsernamePasswordToken($user,null);

           
            // var_dump($usuario['DEPENDENCIA']);
            
            
            
            
            
            // var_dump($usuario);
            // die();
            // return $this->redirectToRoute('inicio');
        }
        $autenticationUtils = $this->get('security.authentication_utils');
        $error = $autenticationUtils->getLastAuthenticationError();
        $lastUser = $autenticationUtils->getLastUsername();

        return $this->render('loginBundle:default:login.html.twig',array(
                'last_username' => $lastUser,
                'error'=> $error,
            ));
	}

    public function pruebaAction()
{


    // the above is a shortcut for this
    // $this->get('security.token_storage')->getToken()->setUser();



    // $token = new UsernamePasswordToken($username, $user->getPassword(), $firewallName, $user->getRoles());

    
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
