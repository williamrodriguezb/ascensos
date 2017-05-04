<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\User\User;

class DefaultController extends Controller
{
    // /**
    //  * @Route("/", name="homepage")
    //  */
    // public function indexAction(Request $request)
    // {
    //     // replace this example code with whatever you need
    //     return $this->render('default/index.html.twig', [
    //         'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
    //     ]);
    // }



    /**
     * @Route("/", name="inicio")
     */
    public function inicio()

    {
          
            if (is_object($this->getUser() )) {

            $user = $this->getUser();
            $username =  $this->getUser()->getUsername();
            $password = $this->getUser()->getPassword();
            $enable = $this->getUser()->isEnabled();
            $expired = $this->getUser()->isAccountNonExpired();
            $credentials = $this->getUser()->isCredentialsNonExpired();
            $locked = $this->getUser()->isAccountNonLocked();
            $roles = $this->getUser()->getRoles();

            $provider = $this->get('security.token_storage')->getToken()->getProviderKey();
            $user2 = new User($username, $password,  $roles = array('ROLE_ADMIN'), $enabled = true, $userNonExpired = true, $credentialsNonExpired = true, $userNonLocked = true);
           $token =  new UsernamePasswordToken($user2, $password, $provider,array('ROLE_ADMIN'));



            $securityContext = $this->container->get('security.token_storage'); // do it your way
            //  
            // $securityContext->getToken()->getUser($user2);
            // $securityContext->getToken()->setUser($user2);
            $securityContext->setToken($token);
            // $securityContext->getToken()->getAttribute('ROLE');

            // var_dump($this->getUser() );
            // die();


            // $session = $request->getSession();
            // $session ->set('roles','ROLE_ADMIN');
            // $user = $this->getUser()->getUsername();
                       $correo = $user.'@armada.mil.co';
            $em = $this->getDoctrine()->getManager();
            $login_repo= $em->getRepository("loginBundle:login");
            $usuario = $login_repo->getSessionUser($correo);

               $this->redirectToRoute('inicio');
           }else{}



        
        // replace this example code with whatever you need
        return $this->render('default/inicio.html.twig', array(
                
            )
        );
    }
}